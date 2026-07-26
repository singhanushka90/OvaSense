from fastapi import FastAPI
from app.api.prediction import router as prediction_router
from app.auth.auth_routes import router as auth_router

app=FastAPI(title="PCOS Detection API",
description="Machine Learning API for PCOS Prediction",
version="1.0.0")

app.include_router(prediction_router)
app.include_router(auth_router)

@app.get("/")
def home():
    return {
        "message":"Welcome to PCOS Detection API"
    }

