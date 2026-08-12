from pydantic import BaseModel
from typing import List
from datetime import datetime

class PredictionHistoryResponse(BaseModel):
    prediction:int
    result:str
    created_at:datetime