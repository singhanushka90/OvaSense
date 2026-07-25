import os
import sys
import pandas as pd
from src.entity.config_entity import DataValidationConfig
from src.utils.logger import logger
from src.utils.exception import CustomException
from src.utils.common import read_yaml

class DataValidation:
    def __init__(self,config:DataValidationConfig):
        self.config=config

    def initiate_data_validation(self):
        try:
            logger.info("Starting Data Validation")
            validation_status=True
            df=pd.read_excel(self.config.local_data_file,sheet_name=self.config.sheet_name)
            logger.info("Dataset loaded successfully")
            schema=read_yaml(self.config.schema_file_path)
            schemas_columns=list(schema.COLUMNS.keys())
            dataset_columns=list(df.columns)
            for column in schemas_columns:
                if column not in dataset_columns:
                    validation_status=False
            logger.error(f"Missing column:{column}")


            with open(self.config.STATUS_FILE,"w") as f:
                f.write(f"Validation Status:{validation_status}")
            logger.info(f"validation status : {validation_status}")

            return validation_status
        except Exception as e:
            raise CustomException(e,sys)
