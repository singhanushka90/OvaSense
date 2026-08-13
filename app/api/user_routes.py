from fastapi import APIRouter,Depends,HTTPException,status
from app.services.user_service import UserService
from app.auth.dependencies import get_current_user
from app.schemas.user_schema import UserProfileResponse


router=APIRouter(prefix="/users",tags=["Users"])
@router.get("/me",response_model=UserProfileResponse)
def get_my_profile(current_user=Depends(get_current_user)):
    user=UserService.get_user_by_id(current_user["user_id"])
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
    return user