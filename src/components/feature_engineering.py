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
                df.drop(columns=["Unnamed: 44"], inplace=True)
                logger.info("Removed column")
            logger.info("Column names cleaned successfully")
            return df 
        except Exception as e:
            raise CustomException(e,sys)

    def create_bmi(self,df):
        try:
            logger.info("Create BMI_Update feature")
            df["BMI_Update"]=(df["Weight (kg)"]/((df["Height(Cm)"]/100)**2))
            logger.info("BMI_UPDATE feature created")
            return df
        except Exception as e:
            raise CustomException(e,sys)

    def fil_numeric(self,df):
        try:
            logger.info("fill numeric columns")
            num_cols=df.select_dtypes(include="number").columns
            df[num_cols]=df[num_cols].fillna(df[num_cols].median())
            logger.info("fill columns successfully")
            return df
        except Exception as e:
            raise CustomException(e,sys)


    def selected_features(self,df,selected_features):
        try:
            logger.info("Selecting required features")
            df=df[selected_features]
            logger.info("Feature selection completed")
            return df
        except Exception as e:
            raise CustomException(e,sys)

    def saved_processed_data(self,df):
        try:
            logger.info("Saving processed dataset")
            os.makedirs(self.config.root_dir,exist_ok=True)
            df.tocsv(self.config.processed_data_path,index=False)
            logger.info("Processed dataset saved successfully")
        except Exception as e:
            raise CustomException(e,sys)


    def initiate_feature_engineering(self,selected_features):
        try:
            df=self.load_data()
            df=self.clean_column_name(df)
            df=self.create_bmi(df)
            df=self.fill_numeric(df)
            df=self.selected_features(df,selected_features)
            self.saved_processed_data(df)
            logger.info("Feature Engineering completed successfully")
            return df
        except Exception as e:
            raise CustomException(e,sys)
