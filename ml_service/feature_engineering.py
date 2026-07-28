"""
AgroPrice AI — Phase 6: Feature Engineering Module
Generates multi-crop & multi-mandi time-series lag features, rolling moving averages, volatility indexes, and seasonal indicators.
"""

import pandas as pd
import numpy as np

CROP_MAPPING = {
    'wheat': 1, 'paddy': 2, 'rice': 2, 'mustard': 3, 'soybean': 4,
    'potato': 5, 'tomato': 6, 'onion': 7, 'gram': 8, 'chana': 8
}

MANDI_MAPPING = {
    'indore central mandi': 1, 'indore apmc mandi': 1, 'indore': 1,
    'sehore apmc mandi': 2, 'sehore': 2,
    'karond mandi bhopal': 3, 'bhopal': 3,
    'kota apmc mandi': 4, 'kota': 4,
    'khanna apmc mandi': 5, 'khanna': 5,
    'nashik red onion market': 6, 'nashik': 6,
    'lucknow apmc mandi': 7, 'lucknow': 7,
    'azadpur fruits & veg mandi': 8, 'azadpur': 8
}

class FeatureEngineer:
    def create_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Creates multi-crop time-series features for price forecasting:
        - Crop & Mandi categorical codes
        - Price Lag 1, Lag 2, Lag 3, Lag 7
        - Rolling Moving Averages (7-day, 14-day, 30-day)
        - Price Volatility (7-day standard deviation)
        - Arrival Volume Ratio vs 7-day average arrival
        - Date features: Day of week, Month, Day of Year
        """
        df = df.copy()

        # Crop and Mandi Categorical Encodings
        if 'crop_name' in df.columns:
            df['crop_code'] = df['crop_name'].astype(str).str.lower().map(
                lambda x: next((v for k, v in CROP_MAPPING.items() if k in x), 1)
            )
        else:
            df['crop_code'] = 1

        if 'mandi_name' in df.columns:
            df['mandi_code'] = df['mandi_name'].astype(str).str.lower().map(
                lambda x: next((v for k, v in MANDI_MAPPING.items() if k in x), 1)
            )
        else:
            df['mandi_code'] = 1

        # Sort chronologically
        if 'reported_date' in df.columns:
            df['reported_date'] = pd.to_datetime(df['reported_date'])
            df.sort_values(by='reported_date', inplace=True)
            df['day_of_week'] = df['reported_date'].dt.dayofweek
            df['month'] = df['reported_date'].dt.month
            df['day_of_year'] = df['reported_date'].dt.dayofyear
        else:
            df['day_of_week'] = 2
            df['month'] = 7
            df['day_of_year'] = 205

        # 1. Price Lags (Computed per Group if grouped, or overall series)
        if 'crop_name' in df.columns and len(df['crop_name'].unique()) > 1:
            # Multi-series grouping
            df['price_lag_1'] = df.groupby('crop_name')['modal_price'].shift(1)
            df['price_lag_2'] = df.groupby('crop_name')['modal_price'].shift(2)
            df['price_lag_3'] = df.groupby('crop_name')['modal_price'].shift(3)
            df['price_lag_7'] = df.groupby('crop_name')['modal_price'].shift(7)

            df['sma_7d'] = df.groupby('crop_name')['modal_price'].transform(lambda x: x.rolling(7, min_periods=1).mean())
            df['sma_14d'] = df.groupby('crop_name')['modal_price'].transform(lambda x: x.rolling(14, min_periods=1).mean())
            df['sma_30d'] = df.groupby('crop_name')['modal_price'].transform(lambda x: x.rolling(30, min_periods=1).mean())
            df['volatility_7d'] = df.groupby('crop_name')['modal_price'].transform(lambda x: x.rolling(7, min_periods=1).std()).fillna(0.0)

            df['arrival_sma_7d'] = df.groupby('crop_name')['arrival_qty'].transform(lambda x: x.rolling(7, min_periods=1).mean())
        else:
            df['price_lag_1'] = df['modal_price'].shift(1)
            df['price_lag_2'] = df['modal_price'].shift(2)
            df['price_lag_3'] = df['modal_price'].shift(3)
            df['price_lag_7'] = df['modal_price'].shift(7)

            df['sma_7d'] = df['modal_price'].rolling(window=7, min_periods=1).mean()
            df['sma_14d'] = df['modal_price'].rolling(window=14, min_periods=1).mean()
            df['sma_30d'] = df['modal_price'].rolling(window=30, min_periods=1).mean()
            df['volatility_7d'] = df['modal_price'].rolling(window=7, min_periods=1).std().fillna(0.0)

            df['arrival_sma_7d'] = df['arrival_qty'].rolling(window=7, min_periods=1).mean()

        # Arrival Ratio
        df['arrival_ratio'] = np.where(
            df['arrival_sma_7d'] > 0,
            df['arrival_qty'] / df['arrival_sma_7d'],
            1.0
        )

        # Price Spread
        df['price_spread'] = df['max_price'] - df['min_price']

        # Impute initial NaNs caused by lagging
        df['price_lag_1'] = df['price_lag_1'].fillna(df['modal_price'])
        df['price_lag_2'] = df['price_lag_2'].fillna(df['modal_price'])
        df['price_lag_3'] = df['price_lag_3'].fillna(df['modal_price'])
        df['price_lag_7'] = df['price_lag_7'].fillna(df['modal_price'])

        return df

if __name__ == '__main__':
    fe = FeatureEngineer()
    dates = pd.date_range(start='2026-07-01', periods=10, freq='D')
    sample_df = pd.DataFrame({
        'reported_date': dates,
        'modal_price': [2400, 2410, 2425, 2420, 2440, 2450, 2465, 2480, 2490, 2500],
        'min_price': [2350]*10,
        'max_price': [2450]*10,
        'arrival_qty': [1200]*10,
        'crop_name': ['Wheat']*10,
        'mandi_name': ['Indore Central Mandi']*10
    })
    featured = fe.create_features(sample_df)
    print("Features Created:")
    print(featured[['reported_date', 'crop_code', 'mandi_code', 'modal_price', 'price_lag_1', 'sma_7d', 'volatility_7d']].tail())
