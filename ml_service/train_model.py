"""
AgroPrice AI — Phase 6: Multi-Crop & Multi-Mandi Model Training Pipeline
Trains XGBoost & Random Forest regressors on real historical time-series datasets from MongoDB.
Evaluates MAE, RMSE, R² score, and MAPE using Walk-Forward Time-Series Cross-Validation.
Exports trained model weights & metadata.
"""

import os
import pickle
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, root_mean_squared_error, r2_score, mean_absolute_percentage_error
from sklearn.model_selection import TimeSeriesSplit
from pymongo import MongoClient
from dotenv import load_dotenv

from data_cleaner import MandiDataCleaner
from feature_engineering import FeatureEngineer
from agmarknet_fetcher import AgmarknetDataFetcher

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'backend', '.env'))
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/agroprice")

try:
    from xgboost import XGBRegressor
    XGBOOST_AVAILABLE = True
except ImportError:
    XGBOOST_AVAILABLE = False

MODEL_DIR = os.path.join(os.path.dirname(__file__), 'models')
os.makedirs(MODEL_DIR, exist_ok=True)

class PriceModelTrainer:
    def __init__(self):
        self.cleaner = MandiDataCleaner()
        self.engineer = FeatureEngineer()
        self.features = [
            'crop_code', 'mandi_code',
            'price_lag_1', 'price_lag_2', 'price_lag_3', 'price_lag_7',
            'sma_7d', 'sma_14d', 'sma_30d', 'volatility_7d',
            'arrival_qty', 'arrival_ratio', 'price_spread',
            'day_of_week', 'month', 'day_of_year'
        ]

    def _load_data_from_mongo(self) -> pd.DataFrame:
        """Loads historical price records from MongoDB. Fallback to synthetic if empty."""
        try:
            client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
            db = client.get_database()
            collection = db['ml_historical_prices']
            
            cursor = collection.find({}, {'_id': 0})
            df = pd.DataFrame(list(cursor))
            
            if df.empty:
                raise ValueError("[CRITICAL] MongoDB 'ml_historical_prices' is empty. You MUST run agmarknet_fetcher.py first to seed the database.")
            
            print(f"[SUCCESS] Loaded {len(df)} historical price records from MongoDB.")
            return df
        except Exception as e:
            print(f"[ERROR] Failed to connect to MongoDB: {e}")
            raise e

    def train_and_evaluate(self):
        print("[Step 1] Loading Multi-Commodity Historical Time-Series Dataset...")
        df_raw = self._load_data_from_mongo()
        
        # Sort by reported_date is CRITICAL for time-series feature engineering and CV
        if 'reported_date' in df_raw.columns:
            df_raw['reported_date'] = pd.to_datetime(df_raw['reported_date'])
            df_raw = df_raw.sort_values(by=['mandi_name', 'crop_name', 'reported_date'])

        df_clean = self.cleaner.clean_dataset(df_raw)

        print("[Step 2] Engineering Lag & Volatility Features across Commodities...")
        df_featured = self.engineer.create_features(df_clean)

        # Create target: next day modal price grouped per (mandi_name, crop_name)
        df_featured['target_tomorrow_price'] = df_featured.groupby(['mandi_name', 'crop_name'])['modal_price'].shift(-1)
        df_dataset = df_featured.dropna().reset_index(drop=True)
        
        # Sort entirely by date for global TimeSeriesSplit
        df_dataset = df_dataset.sort_values('reported_date').reset_index(drop=True)

        X = df_dataset[self.features]
        y = df_dataset['target_tomorrow_price']

        print(f"[Dataset] Total Rows = {len(X)}")

        print("[Step 3] Walk-Forward Time-Series Cross-Validation...")
        
        if XGBOOST_AVAILABLE:
            model = XGBRegressor(n_estimators=150, max_depth=6, learning_rate=0.03, random_state=42)
            model_type = "Multi-Crop XGBoost Regressor"
        else:
            model = RandomForestRegressor(n_estimators=120, max_depth=10, random_state=42)
            model_type = "Multi-Crop RandomForest Regressor"

        tscv = TimeSeriesSplit(n_splits=5)
        
        fold_metrics = {'mae': [], 'rmse': [], 'r2': [], 'mape': []}
        
        for fold, (train_index, test_index) in enumerate(tscv.split(X)):
            X_train, X_test = X.iloc[train_index], X.iloc[test_index]
            y_train, y_test = y.iloc[train_index], y.iloc[test_index]
            
            model.fit(X_train, y_train)
            predictions = model.predict(X_test)
            
            mae = mean_absolute_error(y_test, predictions)
            rmse = root_mean_squared_error(y_test, predictions)
            r2 = r2_score(y_test, predictions)
            mape = mean_absolute_percentage_error(y_test, predictions) * 100
            
            fold_metrics['mae'].append(mae)
            fold_metrics['rmse'].append(rmse)
            fold_metrics['r2'].append(r2)
            fold_metrics['mape'].append(mape)
            
            print(f"  Fold {fold+1}: MAE={mae:.2f}, MAPE={mape:.2f}%, R2={r2:.4f}")

        avg_mae = np.mean(fold_metrics['mae'])
        avg_rmse = np.mean(fold_metrics['rmse'])
        avg_r2 = np.mean(fold_metrics['r2'])
        avg_mape = np.mean(fold_metrics['mape'])

        print(f"\n[Step 4] Final {model_type} Performance (Avg across Walk-Forward Folds):")
        print(f"   * MAE: Rs. {avg_mae:.2f} / quintal")
        print(f"   * RMSE: Rs. {avg_rmse:.2f}")
        print(f"   * MAPE: {avg_mape:.2f}%")
        print(f"   * R2 Accuracy Score: {avg_r2 * 100:.2f}%")

        # Refit model on ENTIRE dataset for production inference
        print("\n[Step 5] Refitting model on full dataset for production...")
        model.fit(X, y)

        model_path = os.path.join(MODEL_DIR, 'xgboost_price_model.pkl')
        with open(model_path, 'wb') as f:
            pickle.dump({
                'model': model,
                'features': self.features,
                'metrics': {'mae': avg_mae, 'rmse': avg_rmse, 'r2': avg_r2, 'mape': avg_mape},
                # history_store is removed, inference engine will fetch from Mongo directly
            }, f)

        print(f"Saved Multi-Crop Model Artifact to: {model_path}")
        return model_path, avg_r2, avg_mae

if __name__ == '__main__':
    trainer = PriceModelTrainer()
    trainer.train_and_evaluate()
