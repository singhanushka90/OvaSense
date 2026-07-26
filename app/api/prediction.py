from fastapi import APIRouter
from app.schemas.prediction_schema import PredictionRequest , PredictionResponse
from app.services.prediction_service import PredictionService
from src.utils.logger import logger
from fastapi import Depends
from app.auth.dependencies import get_current_user
from src.utils.exception import CustomException
import sys

router=APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)
prediction_service=PredictionService()
@router.post("/",response_model=PredictionResponse)
def predict(request:PredictionRequest,current_user=Depends(get_current_user)):
    try:
        return prediction_service.predict(request)
    except Exception as e:
        raise CustomException(e,sys)