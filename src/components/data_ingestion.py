import os
import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from src.entity.config_entity import DataIngestionConfig
from src.utils.logger import logger
from src.utils.exception import CustomException


class DataIngestion:
    def __init__(self,config:DataIngestionConfig):
        self.config=config
    def initiate_data_ingestion(self):
        logger.info("Entered the data ingestion component")
        try:
            df=pd.read_excel(self.config.local_data_file,sheet_name=self.config.sheet_name)
            logger.info("Dataset loaded successfully as Dataframe")
            os.makedirs(self.config.root_dir,exist_ok=True)
            logger.info("Started train-test-split")
            train_set,test_set=train_test_split(df,test_size=0.2,random_state=42)
            train_set.to_csv(self.config.train_data_path,index=False,header=True)
            test_set.to_csv(self.config.test_data_path,index=False,header=True)
            logger.info("Train and Test datasets saved successfully")
            return(self.config.train_data_path,self.config.test_data_path)
        except Exception as e:
            raise CustomException(e,sys)