from pydantic import BaseModel
from typing import List
from datetime import datetime

class PredictionHistoryResponse(BaseModel):

    id:str
    prediction:int
    result:str
    created_at:datetime