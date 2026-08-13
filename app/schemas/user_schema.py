from pydantic import BaseModel , EmailStr

class UserResponse(BaseModel):
    username : str
    email : EmailStr

class UserProfileResponse(BaseModel):
    id:str
    username:str
    email:EmailStr


