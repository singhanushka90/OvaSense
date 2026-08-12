from datetime import datetime , timezone
from app.database.database import predictions_collection

class HistoryService:
    @staticmethod
    def save_prediction(user_id:str,prediction:str,result:str):
        history={
            "user_id":user_id,
            "prediction":prediction,
            "result":result,
            "created_at":datetime.now(timezone.utc)
        }
        predictions_collection.insert_one(history)
    @staticmethod
    def get_prediction_history(user_id:str):
        history=predictions_collection.find({"user_id":user_id},
        {
            "_id":0,
            "prediction":1,
            "result":1,
            "created_at":1
        }).sort("created_at",-1)
        return list(history)