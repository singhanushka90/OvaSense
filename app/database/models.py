from app.database.database import database

users_collection=database["users_db"]
prediction_collection=database["predictions"]
audit_logs_collection=database["audit_logs"]