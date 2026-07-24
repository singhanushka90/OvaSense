import os
import sys
import pandas as pd
from src.entity.config_entity import FeatureEngineeringConfig
from src.utils.logger import logger
from src.utils.exception import CustomException

class FeatureEngineering:
    def __init__(self,config:FeatureEngineeringConfig):
        self.config=config

    def load_data(self):
        try:
            logger.info("Loading dataset")
            df=pd.read_excel(self.config.local_data_file,sheet_name=self.config.sheet_name)
            logger.info("Dataset loaded successfully")
            return df 
        except Exception as e:
            raise CustomException (e,sys)

    def clean_column_name(self,df):
        try:
            logger.info("Cleaning column names")
            df.columns=df.columns.str.strip()
            if "Unnamed: 44" in df.columns:
                df.drop(columns["Unnamed: 44"], inplace=True)
                logger.info("Removed column")
            logger.info("Column names cleaned successfully")
            return df 
        except Exception as e:
            raise CustomException(e,sys)