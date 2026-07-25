import os
import sys
import json
import joblib
import pandas as pd
from sklearn.metrics import accuracy_score,precision_score,recall_score,f1_score,roc_auc_score
from src.entity.config_entity import ModelEvaluationConfig
from src.utils.logger import logger
from src.utils.exception import CustomException


class ModelEvaluation:
    def __init__(self,config:ModelEvaluationConfig):
        self.config=config



    def load_model(self):
        try:
            logger.info("Loading trained model")
            model=joblib.load(self.config.model_path)
            logger.info("Model loaded successfully")
            return model
        except Exception as e:
            raise CustomException(e,sys)


    def load_test_data(self):
        try:
            logger.info("Loading test datasets")
            X_test=pd.read_csv(self.config.test_features_path)
            y_test=pd.read_csv(self.config.test_target_path).squeeze("columns")
            logger.info("Test datasets loaded successfully")
            return X_test , y_test
        except Exception as e:
            raise CustomException(e,sys)

    def evaluate_model(self,model,X_test,y_test):
        try:
            logger.info("Evaluating trained model")
            y_pred=model.predict(X_test)
            y_prob=model.predict_proba(X_test)[:,1]
            metrics={"accuracy":accuracy_score(y_test,y_pred),
                     "recall":recall_score(y_test,y_pred),
                     "f1_score":f1_score(y_test,y_pred),
                     "roc_auc":roc_auc_score(y_test,y_prob)}
            logger.info("Model evaluated successfully")
            return metrics
        except Exception as e:
            raise CustomException(e,sys)


    def save_metrics(self,metrics):
        try:
            logger.info("Saving evaluation metrics")
            os.makedirs(self.config.root_dir,exist_ok=True)
            with open(self.config.metrics_file_path,"w") as f:
                json.dump(metrics,f,indent=4)
            logger.info("Evaluation metrics saved successfully")
        except Exception as e:
            raise CustomException(e,sys)    



    def initiate_model_evaluation(self):
        try:
            model=self.load_model()
            X_test,y_test=self.load_test_data()
            metrics=self.evaluate_model(model,X_test,y_test)
            self.save_metrics(metrics)
            logger.info("Model evaluaion completed successfully")
            return metrics
        except Exception as e:
            raise CustomException(e,sys)
