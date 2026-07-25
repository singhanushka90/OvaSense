import os
import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from src.entity.config_entity import DataTransformationConfig
from src.utils.logger import logger
from src.utils.exception import CustomException

class DataTransformation:
    def __init__(self,config:DataTransformationConfig):
        self.config=config

    def load_data(self):
        try:
            logger.info("Loading processed dataset")
            df=pd.read_csv(self.config.processed_data_path)
            logger.info("Processed adta loaded successfully")
            return df

        except Exception as e:
            raise CustomException(e,sys)

    def split_data(slef,df,target_column,test_size,random_state):
        try:
            logger.info("Splitting dataset")
            X=df.drop(columns=[target_column])
            y=df[target_column]
            X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=test_size,random_state=random_state,stratify=y,shuffle=True)
            logger.info("Dataset split completed")
            return X_train,X_test,y_train,y_test
        except Exception as e:
            raise CustomException(e,sys)

    def save_data(self,X_train,X_test,y_train,y_test):
        try:
            os.makedirs(self.config.root_dir,exist_ok=True)
            X_train.to_csv(self.config.train_features_path,index=False)
            X_test.to_csv(self.config.test_features_path,index=False)
            y_train.to_csv(self.config.train_target_path,index=False)
            y_test.to_csv(self.config.test_target_path,index=False)
            logger.info("Train and Test files saved successfully")
        except Exception as e:
                    raise CustomException(e,sys)


    def initiate_data_transformation(self,target_column,test_size,random_state):
        try:
            df=self.load_data()
            X_train,X_test,y_train,y_test=self.split_data(df,target_column,test_size,random_state)
            self.save_data(X_train,X_test,y_train,y_test)
            logger.info("Data transformation completed")
        except Exception as e:
                    raise CustomException(e,sys)