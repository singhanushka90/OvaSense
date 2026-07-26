from src.pipeline.prediction_pipeline import PredictionPipeline
from app.schemas.prediction_schema import PredictionRequest
from src.utils.logger import logger
from src.utils.exception import CustomException
import sys

class PredictionService:
    def __init__(self):
        self.pipeline=PredictionPipeline()
    def predict(self,request:PredictionRequest):
        try:
            logger.info("Preparing input data for prediction")
            input_df={
                "Follicle No. (R)":request.follicle_no_r,
                "Follicle No. (L)":request.follicle_no_l,
                "Skin darkening (Y/N)":request.skin_darkening,
                "hair growth(Y/N)":request.hair_growth,
                "Weight gain(Y/N)":request.weight_gain,
                "Cycle(R/I)":request.cycle,
                "Fast food (Y/N)":request.fast_food,
                "Pimples(Y/N)":request.pimples,
                "Weight (Kg)":request.weight,
                "BMI_Update":request.bmi_update
            }
            prediction=self.pipeline.predict(input_df)
            result=("PCOS Detected" if prediction==1 else "No PCOS Detected")
            return{"prediction":int(prediction),
            "result":result}
        except Exception as e:
            raise CustomException(e,sys)
        