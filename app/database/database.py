from pymongo import MongoClient
from app.core.config import MONGODB_URI , DATABASE_NAME

client=MongoClient(MONGODB_URI)
database=client[DATABASE_NAME]
users_collection=database["users_db"]
predictions_collection=database["predict"]