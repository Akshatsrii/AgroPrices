from flask import Flask, request, jsonify
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

# Dummy training data (later real use karna)
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2000, 2100, 2200, 2300, 2400])

model = LinearRegression()
model.fit(X, y)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    days = data.get("days", 6)

    prediction = model.predict([[days]])
    return jsonify({
        "predicted_price": float(prediction[0])
    })

if __name__ == '__main__':
    app.run(port=5000)