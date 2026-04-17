import pandas as pd
import numpy as np
import random

# A rough base price in INR (per quintal or per unit typical for the crop)
crops = {
    'wheat': 2275, 'rice': 2600, 'corn': 2100, 'soybean': 4600,
    'mustard': 5450, 'cotton': 7020, 'sugarcane': 315, 'tomato': 1500,
    'onion': 2000, 'potato': 1200, 'chili': 8500, 'turmeric': 7200,
    'garlic': 6500, 'ginger': 4500, 'chickpea': 5335, 'lentil': 6000,
    'moongdal': 8558, 'groundnut': 5850, 'sunflower': 6400, 'jowar': 3180,
    'bajra': 2500, 'barley': 1850, 'cauliflower': 1800, 'brinjal': 2200
}

data = []
for crop, base_price in crops.items():
    # Generate data for 1 to 30 days into the future
    for day in range(1, 31):
        # Adding a bit of trend and noise
        trend = day * (base_price * 0.005) # 0.5% increase per day
        noise = random.uniform(-base_price * 0.02, base_price * 0.02) # +/- 2% noise
        price = max(base_price * 0.5, base_price + trend + noise)
        data.append({'crop': crop, 'days': day, 'price': round(price, 2)})

df = pd.DataFrame(data)
df.to_csv('synthetic_crop_data.csv', index=False)
print("synthetic_crop_data.csv generated successfully.")
