"""
AgroPrice AI — Phase 6: FastAPI Prediction Server
Exposes /api/v1/predict endpoint for Tomorrow Price Predictions & ML 7-Day Forecasts.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from prediction_engine import PredictionEngine

app = FastAPI(
    title="AgroPrice AI — Machine Learning Prediction Microservice",
    description="Delivers Tomorrow Price Predictions and 7-Day Mandi Price Forecasts using XGBoost & Scikit-learn.",
    version="1.0.0"
)

# Enable CORS for Express Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = PredictionEngine()

class PredictionRequest(BaseModel):
    cropName: str = "Wheat"
    mandiName: str = "Indore Central Mandi"
    currentPrice: float = 2480.0
    arrivalQty: Optional[float] = 1200.0

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "AgroPrice AI ML Microservice",
        "version": "1.0.0",
        "model": "XGBoost Price Regressor"
    }

@app.post("/api/v1/predict")
def predict_price(req: PredictionRequest):
    try:
        result = engine.predict_tomorrow_price(
            crop_name=req.cropName,
            mandi_name=req.mandiName,
            current_price=req.currentPrice,
            arrival_qty=req.arrivalQty or 1200.0
        )
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
