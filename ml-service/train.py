import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestRegressor
import joblib

print("Loading dataset...")
df = pd.read_csv("synthetic_crop_data.csv")

X = df[['crop', 'days']]
y = df['price']

# Create a preprocessing step to one-hot encode the categorical 'crop' feature
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), ['crop'])
    ],
    remainder='passthrough' # leave 'days' as is
)

# Create a pipeline with preprocessor and the regressor model
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

print("Training model...")
model.fit(X, y)

# Save the trained model
model_filename = 'crop_price_model.pkl'
joblib.dump(model, model_filename)

print(f"Model trained and saved to {model_filename}")
