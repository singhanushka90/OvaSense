from fastapi import APIRouter
from app.schemas.prediction_schema import PredictionRequest , PredictionResponse
from app.services.prediction_service import PredictionService
from src.utils.logger import logger
from fastapi import Depends
from app.services.history_service import HistoryService
from app.auth.dependencies import get_current_user
from src.utils.exception import CustomException
import sys

router=APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)
@router.post("/")
def predict(data:PredictionRequest,current_user=Depends(get_current_user)):
    response=PredictionService().predict(data)
    prediction=response["prediction"]
    result=response["result"]
    HistoryService.save_prediction(user_id=current_user["user_id"],prediction=prediction,result=result)
    return {"prediction":prediction,"result":result}