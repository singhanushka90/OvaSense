from fastapi import APIRouter,Depends,Query,HTTPException
from app.services.history_service import HistoryService
from app.auth.dependencies import get_current_user
from app.schemas.history_schema import PredictionHistoryResponse

router=APIRouter(prefix="/predictions",tags=["Prediction History"])

@router.get("/",response_model=list[PredictionHistoryResponse])
def get_history(page: int =Query(1,ge=1),limit: int =Query(10,ge=1,le=100),current_user=Depends(get_current_user)):
    skip=(page-1)*limit

    return HistoryService.get_prediction_history(user_id=current_user["user_id"],skip=skip,limit=limit)
    

@router.delete("/{prediction_id}")
def delete_prediction(prediction_id:str,current_user=Depends(get_current_user)):
    deleted=HistoryService.delete_prediction(user_id=current_user["user_id"],prediction_id=prediction_id)
    if not deleted:
        raise HTTPException(status_code=404,detail="Prediction not found")
    return {"message":"Prediction deleted successfully"}