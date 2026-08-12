from pymongo import MongoClient
from app.core.config import MONGODB_URI , DATABASE_NAME

client=MongoClient(MONGODB_URI)
database=client[DATABASE_NAME]
predictions_collection=database["predict"]