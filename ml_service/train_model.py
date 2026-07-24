"""
AgroPrice AI — Phase 6: Model Training & Evaluation Pipeline
Trains Random Forest & XGBoost regressors on historical Mandi arrival & price data.
Evaluates MAE, RMSE, R² score, and exports trained model weights.
"""

import os
import pickle
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, root_mean_squared_error, r2_score
from data_cleaner import MandiDataCleaner
from feature_engineering import FeatureEngineer

try:
    from xgboost import XGBRegressor
    XGBOOST_AVAILABLE = True
except ImportError:
    XGBOOST_AVAILABLE = False

MODEL_DIR = os.path.join(os.path.dirname(__file__), 'models')
os.makedirs(MODEL_DIR, exist_ok=True)

def generate_synthetic_agmarknet_data(num_days: int = 180) -> pd.DataFrame:
    """Generates realistic synthetic 180-day AGMARKNET daily price time-series for model training."""
    dates = pd.date_range(end='2026-07-24', periods=num_days, freq='D')
    base_price = 2200.0
    prices = []
    arrivals = []

    np.random.seed(42)
    current = base_price

    for i in range(num_days):
        trend = 1.5 * np.sin(i / 15.0)
        noise = np.random.normal(0, 12.0)
        current = max(1800.0, current + trend + noise)
        prices.append(round(current, 2))
        
        arrival = 1500 - (current - 2200) * 0.8 + np.random.normal(0, 50)
        arrivals.append(max(400, round(arrival)))

    df = pd.DataFrame({
        'reported_date': dates,
        'modal_price': prices,
        'min_price': [p * 0.95 for p in prices],
        'max_price': [p * 1.05 for p in prices],
        'arrival_qty': arrivals,
        'mandi_name': 'Indore Central Mandi',
        'crop_name': 'Wheat'
    })
    return df

class PriceModelTrainer:
    def __init__(self):
        self.cleaner = MandiDataCleaner()
        self.engineer = FeatureEngineer()
        self.features = [
            'price_lag_1', 'price_lag_2', 'price_lag_3', 'price_lag_7',
            'sma_7d', 'sma_14d', 'sma_30d', 'volatility_7d',
            'arrival_qty', 'arrival_ratio', 'price_spread',
            'day_of_week', 'month', 'day_of_year'
        ]

    def train_and_evaluate(self):
        print("[Step 1] Loading & Cleaning AGMARKNET Dataset...")
        df_raw = generate_synthetic_agmarknet_data(num_days=180)
        df_clean = self.cleaner.clean_dataset(df_raw)

        print("[Step 2] Feature Engineering & Lag Transformations...")
        df_featured = self.engineer.create_features(df_clean)

        df_featured['target_tomorrow_price'] = df_featured['modal_price'].shift(-1)
        df_dataset = df_featured.dropna().reset_index(drop=True)

        X = df_dataset[self.features]
        y = df_dataset['target_tomorrow_price']

        split_idx = int(len(X) * 0.8)
        X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
        y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]

        print(f"[Dataset Split] Train Rows={len(X_train)}, Test Rows={len(X_test)}")

        print("[Step 3] Training Price Prediction Regressor Model...")
        if XGBOOST_AVAILABLE:
            model = XGBRegressor(n_estimators=100, max_depth=5, learning_rate=0.05, random_state=42)
            model_type = "XGBoost Regressor"
        else:
            model = RandomForestRegressor(n_estimators=100, max_depth=8, random_state=42)
            model_type = "RandomForest Regressor"

        model.fit(X_train, y_train)

        print(f"[Step 4] Evaluating {model_type} Performance...")
        predictions = model.predict(X_test)
        mae = mean_absolute_error(y_test, predictions)
        rmse = root_mean_squared_error(y_test, predictions)
        r2 = r2_score(y_test, predictions)

        print(f"Model Performance Results:")
        print(f"   * Model Architecture: {model_type}")
        print(f"   * Mean Absolute Error (MAE): Rs. {mae:.2f} / quintal")
        print(f"   * Root Mean Squared Error (RMSE): Rs. {rmse:.2f}")
        print(f"   * R2 Accuracy Score: {r2 * 100:.2f}%")

        model_path = os.path.join(MODEL_DIR, 'xgboost_price_model.pkl')
        with open(model_path, 'wb') as f:
            pickle.dump({'model': model, 'features': self.features, 'metrics': {'mae': mae, 'r2': r2}}, f)

        print(f"Saved Model Artifact to: {model_path}")
        return model_path, r2, mae

if __name__ == '__main__':
    trainer = PriceModelTrainer()
    trainer.train_and_evaluate()
