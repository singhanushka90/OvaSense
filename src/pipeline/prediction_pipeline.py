import pandas as pd
from src.utils.common import load_bin
from src.utils.logger import logger
from src.utils.exception import CustomException
from pathlib import Path
from src.config.configuration import ConfigurationManager
import sys

class PredictionPipeline:
    def __init__(self):
        try:
            logger.info("Loading trained model")
            config=ConfigurationManager()
            model_config=config.get_model_trainer_config()
            self.model=load_bin(Path(model_config.model_path))
            logger.info("Model loaded successfully")
        except Exception as e:
            raise CustomException(e,sys)

    def predict(self,input_df):
        try:
            logger.info("Making Prediction")
            input_df=pd.DataFrame([input_df])
            prediction=self.model.predict(input_df)
            logger.info("Prediction completed")
            return prediction[0]

        except Exception as e:
            raise CustomException(e,sys)