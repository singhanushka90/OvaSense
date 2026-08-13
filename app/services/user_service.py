from app.database.database import users_collection
from bson import ObjectId

class UserService:
    @staticmethod
    def get_user_by_id(user_id:str):
        print("JWT",user_id)
        print("Type",type(user_id))
        user=users_collection.find_one({"_id":ObjectId(user_id)},{"_id":1,"username":1,"email":1})
        print("Found user",user)
        if not user:
            return None
        return {"id":str(user["_id"]),"username":user["username"],"email":user["email"]}