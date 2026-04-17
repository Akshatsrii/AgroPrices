from flask import Flask, request, jsonify
import pandas as pd
import joblib
import os

app = Flask(__name__)

# Load the trained model
MODEL_PATH = "crop_price_model.pkl"

if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully.")
else:
    model = None
    print("Warning: Model not found. Run train.py first.")

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not trained yet."}), 500

    data = request.json
    crop = data.get("crop", "wheat") # default to wheat if not provided
    days = data.get("days", 1)       # default to 1 day

    try:
        # Create a DataFrame for the single prediction so the transformer works
        input_data = pd.DataFrame([{ "crop": crop, "days": int(days) }])
        
        prediction = model.predict(input_data)
        
        return jsonify({
            "predicted_price": float(prediction[0])
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000)