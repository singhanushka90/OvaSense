from fastapi import APIRouter,Depends
from app.services.history_service import HistoryService
from app.auth.dependencies import get_current_user
from app.schemas.history_schema import PredictionHistoryResponse

router=APIRouter(prefix="/predictions",tags=["Prediction History"])

@router.get("/",response_model=list[PredictionHistoryResponse])
def get_history(current_user=Depends(get_current_user)):
    return HistoryService.get_prediction_history(current_user["user_id"])
    