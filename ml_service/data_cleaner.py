"""
AgroPrice AI — Phase 6: Data Cleaning & Preprocessing Module
Cleans raw Mandi arrival & price datasets, imputes missing values, and removes price outliers.
"""

import pandas as pd
import numpy as np

class MandiDataCleaner:
    def __init__(self, iqr_factor: float = 1.5):
        self.iqr_factor = iqr_factor

    def clean_dataset(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Full data cleaning pipeline:
        1. Renames columns to standardized lowercase names
        2. Converts reported_date to datetime and sorts chronologically
        3. Imputes missing min/max/modal prices
        4. Removes price outliers using Interquartile Range (IQR) filtering
        """
        df = df.copy()

        # 1. Column standardization
        column_mapping = {
            'Market': 'mandi_name',
            'Commodity': 'crop_name',
            'Modal_Price': 'modal_price',
            'Min_Price': 'min_price',
            'Max_Price': 'max_price',
            'Arrival_Qty': 'arrival_qty',
            'Arrival_Date': 'reported_date'
        }
        df.rename(columns={k: v for k, v in column_mapping.items() if k in df.columns}, inplace=True)

        # Ensure required columns exist
        for col in ['modal_price', 'min_price', 'max_price', 'arrival_qty']:
            if col not in df.columns:
                df[col] = np.nan

        # 2. Convert data types
        df['modal_price'] = pd.to_numeric(df['modal_price'], errors='coerce')
        df['min_price'] = pd.to_numeric(df['min_price'], errors='coerce')
        df['max_price'] = pd.to_numeric(df['max_price'], errors='coerce')
        df['arrival_qty'] = pd.to_numeric(df['arrival_qty'], errors='coerce')

        if 'reported_date' in df.columns:
            df['reported_date'] = pd.to_datetime(df['reported_date'], errors='coerce')
            df.sort_values(by='reported_date', inplace=True)

        # 3. Handle missing values
        df['modal_price'] = df['modal_price'].ffill().bfill()
        df['min_price'] = df['min_price'].fillna(df['modal_price'] * 0.95)
        df['max_price'] = df['max_price'].fillna(df['modal_price'] * 1.05)
        df['arrival_qty'] = df['arrival_qty'].fillna(df['arrival_qty'].median() if not df['arrival_qty'].isna().all() else 1000.0)

        # 4. Outlier removal using IQR
        df = self._remove_outliers_iqr(df, 'modal_price')

        return df.reset_index(drop=True)

    def _remove_outliers_iqr(self, df: pd.DataFrame, column_name: str) -> pd.DataFrame:
        """Removes rows where column_name lies outside Q1 - 1.5*IQR and Q3 + 1.5*IQR bounds."""
        q1 = df[column_name].quantile(0.25)
        q3 = df[column_name].quantile(0.75)
        iqr = q3 - q1

        lower_bound = max(0, q1 - (self.iqr_factor * iqr))
        upper_bound = q3 + (self.iqr_factor * iqr)

        filtered_df = df[(df[column_name] >= lower_bound) & (df[column_name] <= upper_bound)]
        return filtered_df

if __name__ == '__main__':
    cleaner = MandiDataCleaner()
    sample_data = pd.DataFrame({
        'Commodity': ['Wheat', 'Wheat', 'Wheat'],
        'Modal_Price': [2400, 2450, 99999], # 99999 is outlier
        'Arrival_Qty': [1500, 1200, 1400],
        'Arrival_Date': ['2026-07-21', '2026-07-22', '2026-07-23']
    })
    cleaned = cleaner.clean_dataset(sample_data)
    print("Cleaned Dataset Shape:", cleaned.shape)
    print(cleaned)
