"""
AgroPrice AI — Phase 6: Multi-Crop & Multi-Mandi Model Training Pipeline
Trains XGBoost & Random Forest regressors on 365-day multi-commodity time-series datasets.
Evaluates MAE, RMSE, R² score, and exports trained model weights & metadata.
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

COMMODITY_CONFIGS = [
    {'crop': 'Wheat', 'base_price': 2450.0, 'volatility': 14.0, 'base_arrival': 1500},
    {'crop': 'Paddy', 'base_price': 3800.0, 'volatility': 22.0, 'base_arrival': 2100},
    {'crop': 'Mustard', 'base_price': 5450.0, 'volatility': 35.0, 'base_arrival': 900},
    {'crop': 'Potato', 'base_price': 1500.0, 'volatility': 18.0, 'base_arrival': 3200},
    {'crop': 'Onion', 'base_price': 1700.0, 'volatility': 25.0, 'base_arrival': 4500},
    {'crop': 'Soybean', 'base_price': 4600.0, 'volatility': 28.0, 'base_arrival': 1100},
    {'crop': 'Gram', 'base_price': 5100.0, 'volatility': 20.0, 'base_arrival': 800},
    {'crop': 'Tomato', 'base_price': 2000.0, 'volatility': 45.0, 'base_arrival': 2800},
]

MANDI_LIST = [
    'Indore Central Mandi',
    'Sehore APMC Mandi',
    'Karond Mandi Bhopal',
    'Kota APMC Mandi',
    'Khanna APMC Mandi',
    'Nashik Red Onion Market',
    'Lucknow APMC Mandi',
    'Azadpur Fruits & Veg Mandi'
]

def generate_multi_crop_agmarknet_dataset(num_days: int = 365) -> pd.DataFrame:
    """Generates multi-crop, multi-mandi daily AGMARKNET price time-series dataset for robust ML training."""
    dates = pd.date_range(end='2026-07-28', periods=num_days, freq='D')
    records = []

    np.random.seed(42)

    for mandi_idx, mandi_name in enumerate(MANDI_LIST):
        mandi_multiplier = 0.96 + (mandi_idx * 0.015)
        for c_idx, cfg in enumerate(COMMODITY_CONFIGS):
            crop_name = cfg['crop']
            base_p = cfg['base_price'] * mandi_multiplier
            vol = cfg['volatility']
            base_arr = cfg['base_arrival']

            current_p = base_p
            for d_idx, date_val in enumerate(dates):
                # Seasonal sine trend + random walk
                seasonal_trend = (vol * 0.4) * np.sin((d_idx + c_idx * 20) / 25.0)
                noise = np.random.normal(0, vol * 0.3)
                current_p = max(base_p * 0.7, current_p + seasonal_trend + noise)
                
                # Inverse arrival elasticity: higher arrivals -> lower price
                arrival = max(100, int(base_arr - (current_p - base_p) * 0.6 + np.random.normal(0, 80)))

                min_p = round(current_p * 0.96, 2)
                max_p = round(current_p * 1.04, 2)
                modal_p = round(current_p, 2)

                records.append({
                    'reported_date': date_val,
                    'mandi_name': mandi_name,
                    'crop_name': crop_name,
                    'modal_price': modal_p,
                    'min_price': min_p,
                    'max_price': max_p,
                    'arrival_qty': float(arrival)
                })

    df = pd.DataFrame(records)
    print(f"Generated Multi-Crop Multi-Mandi Dataset: {len(df)} rows across {len(COMMODITY_CONFIGS)} crops & {len(MANDI_LIST)} mandis.")
    return df

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

    def train_and_evaluate(self):
        print("[Step 1] Loading Multi-Commodity AGMARKNET Time-Series Dataset...")
        df_raw = generate_multi_crop_agmarknet_dataset(num_days=365)
        df_clean = self.cleaner.clean_dataset(df_raw)

        print("[Step 2] Engineering Lag & Volatility Features across Commodities...")
        df_featured = self.engineer.create_features(df_clean)

        # Create target: next day modal price grouped per (mandi_name, crop_name)
        df_featured['target_tomorrow_price'] = df_featured.groupby(['mandi_name', 'crop_name'])['modal_price'].shift(-1)
        df_dataset = df_featured.dropna().reset_index(drop=True)

        X = df_dataset[self.features]
        y = df_dataset['target_tomorrow_price']

        # Chronological split
        split_idx = int(len(X) * 0.8)
        X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
        y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]

        print(f"[Dataset Split] Train Rows={len(X_train)}, Test Rows={len(X_test)}")

        print("[Step 3] Fitting Multi-Crop Price Regressor Model...")
        if XGBOOST_AVAILABLE:
            model = XGBRegressor(n_estimators=150, max_depth=6, learning_rate=0.03, random_state=42)
            model_type = "Multi-Crop XGBoost Regressor"
        else:
            model = RandomForestRegressor(n_estimators=120, max_depth=10, random_state=42)
            model_type = "Multi-Crop RandomForest Regressor"

        model.fit(X_train, y_train)

        print(f"[Step 4] Evaluating {model_type} Performance...")
        predictions = model.predict(X_test)
        mae = float(mean_absolute_error(y_test, predictions))
        rmse = float(root_mean_squared_error(y_test, predictions))
        r2 = float(r2_score(y_test, predictions))

        print(f"Model Performance Results:")
        print(f"   * Architecture: {model_type}")
        print(f"   * MAE: Rs. {mae:.2f} / quintal")
        print(f"   * RMSE: Rs. {rmse:.2f}")
        print(f"   * R2 Accuracy Score: {r2 * 100:.2f}%")

        # Also store historical price baseline per (mandi, crop) for inference
        history_store = {}
        for (m_name, c_name), group_df in df_featured.groupby(['mandi_name', 'crop_name']):
            key = f"{m_name.lower()}___{c_name.lower()}"
            tail_records = group_df[['reported_date', 'modal_price', 'min_price', 'max_price', 'arrival_qty', 'mandi_name', 'crop_name']].tail(35).to_dict(orient='records')
            history_store[key] = tail_records

        model_path = os.path.join(MODEL_DIR, 'xgboost_price_model.pkl')
        with open(model_path, 'wb') as f:
            pickle.dump({
                'model': model,
                'features': self.features,
                'metrics': {'mae': mae, 'rmse': rmse, 'r2': r2},
                'history_store': history_store
            }, f)

        print(f"Saved Multi-Crop Model Artifact to: {model_path}")
        return model_path, r2, mae

if __name__ == '__main__':
    trainer = PriceModelTrainer()
    trainer.train_and_evaluate()
