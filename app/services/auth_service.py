from app.database.models import users_collection
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.register_schema import RegisterRequest
from app.schemas.login_schema import LoginRequest
from fastapi import Depends

from app.auth.password import (
    hash_password,
    verify_password
)

from app.auth.jwt_handler import create_access_token

from src.utils.logger import logger
from src.utils.exception import CustomException

import sys

class AuthService:

    def __init__(self):
        pass
    def register_user(self, request: RegisterRequest):
        try:
            logger.info("Registering new user")

            existing_user = users_collection.find_one({"email": request.email})
            if existing_user:
                return {"message": "User already exists" }

            hashed_password = hash_password(request.password)
            user = {"username": request.username,"email": request.email,"password": hashed_password}
            users_collection.insert_one(user)
            logger.info("User registered successfully")
            return {
                "message": "Registration Successful"}

        except Exception as e:
            raise CustomException(e, sys)


    def login_user(self, form_data:OAuth2PasswordRequestForm=Depends()):
        try:
            logger.info("User Login")
            user = users_collection.find_one({"email": form_data.username})
            if not user:
                return {"message": "Invalid Email"}
            if not verify_password(form_data.password,user["password"]):
                return {"message": "Invalid Password"}
            token = create_access_token({"email": user["email"]})
            logger.info("Login Successful")
            return {
                "access_token": token,"token_type": "bearer" 
                }
        except Exception as e:
            raise CustomException(e, sys)