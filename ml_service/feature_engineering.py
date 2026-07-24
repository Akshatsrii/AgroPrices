"""
AgroPrice AI — Phase 6: Feature Engineering Module
Generates time-series lag features, rolling moving averages, volatility indexes, and seasonal indicators.
"""

import pandas as pd
import numpy as np

class FeatureEngineer:
    def create_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Creates time-series features for price forecasting:
        - Price Lag 1, Lag 2, Lag 3, Lag 7
        - Rolling Moving Averages (7-day, 14-day, 30-day)
        - Price Volatility (7-day standard deviation)
        - Arrival Volume Ratio vs 7-day average arrival
        - Date features: Day of week, Month, Day of Year
        """
        df = df.copy()

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

        # 1. Price Lags
        df['price_lag_1'] = df['modal_price'].shift(1)
        df['price_lag_2'] = df['modal_price'].shift(2)
        df['price_lag_3'] = df['modal_price'].shift(3)
        df['price_lag_7'] = df['modal_price'].shift(7)

        # 2. Rolling Moving Averages (SMA)
        df['sma_7d'] = df['modal_price'].rolling(window=7, min_periods=1).mean()
        df['sma_14d'] = df['modal_price'].rolling(window=14, min_periods=1).mean()
        df['sma_30d'] = df['modal_price'].rolling(window=30, min_periods=1).mean()

        # 3. Price Volatility (Standard Deviation)
        df['volatility_7d'] = df['modal_price'].rolling(window=7, min_periods=1).std().fillna(0.0)

        # 4. Arrival Volume Dynamics
        df['arrival_sma_7d'] = df['arrival_qty'].rolling(window=7, min_periods=1).mean()
        df['arrival_ratio'] = np.where(
            df['arrival_sma_7d'] > 0,
            df['arrival_qty'] / df['arrival_sma_7d'],
            1.0
        )

        # 5. Price Spread (Max - Min)
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
        'arrival_qty': [1200]*10
    })
    featured = fe.create_features(sample_df)
    print("Features Created:")
    print(featured[['reported_date', 'modal_price', 'price_lag_1', 'sma_7d', 'volatility_7d']].tail())
