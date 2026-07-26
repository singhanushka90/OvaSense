from fastapi import APIRouter,Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.register_schema import RegisterRequest
from app.schemas.login_schema import LoginRequest

from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

auth_service = AuthService()


@router.post("/register")
def register(request: RegisterRequest):

    return auth_service.register_user(request)


@router.post("/login")
def login(form_data:OAuth2PasswordRequestForm=Depends()):

    return auth_service.login_user(form_data)