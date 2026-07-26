from pydantic import BaseModel , Field
class PredictionRequest(BaseModel):
    follicle_no_r : int =Field(...,gt=0)
    follicle_no_l : int =Field(...,gt=0)
    skin_darkening : int =Field(...,ge=0,le=1)
    hair_growth : int =Field(...,ge=0,le=1)
    weight_gain : int =Field(...,ge=0,le=1)
    cycle : int =Field(...,gt=0)
    fast_food : int =Field(...,ge=0,le=1)
    pimples : int =Field(...,ge=0,le=1)
    weight : float =Field(...,gt=0)
    bmi_update : float =Field(...,gt=0)

class PredictionResponse(BaseModel):
    prediction : int
    result :str