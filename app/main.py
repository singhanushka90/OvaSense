from fastapi import FastAPI
from app.api.prediction import router as prediction_router
from app.auth.auth_routes import router as auth_router
from app.api.history_routes import router as history_router
from app.api.user_routes import router as user_router

app=FastAPI(title="PCOS Detection API",
description="Machine Learning API for PCOS Prediction",
version="1.0.0")

app.include_router(prediction_router)
app.include_router(history_router)
app.include_router(auth_router)
app.include_router(user_router)
@app.get("/")
def home():
    return {
        "message":"Welcome to PCOS Detection API"
    }

