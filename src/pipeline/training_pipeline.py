from src.components.data_ingestion import DataIngestion
from src.components.data_validation import DataValidation
from src.components.feature_engineering import FeatureEngineering
from src.components.data_transformation import DataTransformation
from src.components.model_trainer import ModelTrainer
from src.components.model_evaluation import ModelEvaluation
from src.config.configuration import ConfigurationManager
from src.utils.logger import logger
from src.utils.exception import CustomException
import sys


class TrainingPipeline:
    def __init__(self):
        pass

    def run_pipeline(self):
        try:
            logger.info("Training Pipeline Started")
            config=ConfigurationManager()
            logger.info("Starting Data Ingestion")
            data_ingestion=DataIngestion(config.get_data_ingestion_config())
            data_ingestion.initiate_data_ingestion()
            logger.info("Data_ingestion Completed")

            logger.info("Starting Data Validation")
            data_validation=DataValidation(config.get_data_validation_config())
            data_validation.initiate_data_validation()
            logger.info("Data validation Completed")


            logger.info("Starting feature engineering")
            feature_engineering=FeatureEngineering(config.get_feature_engineering_config())
            feature_engineering.initiate_feature_engineering()
            logger.info("Feature engineering Completed")


            logger.info("Starting data transformation")
            data_transformation=DataTransformation(config.get_data_transformation_config())
            data_transformation.initiate_data_transformation()
            logger.info("Data transformation Completed")

            logger.info("Starting Model Trainer")
            model_trainer=ModelTrainer(config.get_model_trainer_config())
            model_trainer.initiate_model_trainer()
            logger.info("Model Trainer Completed")

            logger.info("Starting model evaluation")
            model_evaluation=ModelEvaluation(config.get_model_evaluation_config())
            model_evaluation.initiate_model_evaluation()
            logger.info("Model  Evaluation Completed")

            logger.info("********************Training Pipeline Completed************************")
        except Exception as e:
            raise CustomException(e,sys)
                        
            