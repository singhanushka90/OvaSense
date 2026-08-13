from datetime import datetime , timezone
from app.database.database import predictions_collection
from bson import ObjectId

class HistoryService:
    @staticmethod
    def save_prediction(user_id:str,prediction:int,result:str):
        history={
            "user_id":user_id,
            "prediction":int(prediction),
            "result":result,
            "created_at":datetime.now(timezone.utc)
        }
        predictions_collection.insert_one(history)
    @staticmethod
    def get_prediction_history(user_id:str,skip:int=0,limit:int=10):
        history=predictions_collection.find({"user_id":user_id},
        {
            "_id":1,
            "prediction":1,
            "result":1,
            "created_at":1
        }).sort("created_at",-1).skip(skip).limit(limit)
        history=list(history)
        for item in history:
            item["id"]=str(item["_id"])
            del item["_id"]
        return history
    @staticmethod
    def delete_prediction(user_id:str,prediction_id:str):
        result=predictions_collection.delete_one({"_id":ObjectId(prediction_id),"user_id":user_id})
        return result.deleted_count>0