import os
import sys
import joblib
import pandas as pd

from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier

from sklearn.metrics import accuracy_score

from src.entity.config_entity import ModelTrainingConfig
from src.utils.logger import logger
from src.utils.exception import CustomException


class ModelTrainer:

    def __init__(self, config: ModelTrainingConfig):
        self.config = config


    def load_data(self):
        try:
            logger.info("Loading train and test datasets")
            X_train = pd.read_csv(self.config.train_features_path)
            X_test = pd.read_csv(self.config.test_features_path)

            y_train = pd.read_csv(self.config.train_target_path).squeeze("columns")
            y_test = pd.read_csv(self.config.test_target_path).squeeze("columns")

            logger.info("Train and test datasets loaded successfully")

            return X_train, X_test, y_train, y_test

        except Exception as e:
            raise CustomException(e, sys)


    def initialize_models(self):
        try:
            logger.info("Initializing machine learning models")
            models = {"Decision Tree": DecisionTreeClassifier(
                    random_state=self.config.random_state
                ),
                "Random Forest": RandomForestClassifier(
                    n_estimators=self.config.n_estimators,
                    max_depth=self.config.max_depth,
                    random_state=self.config.random_state
                ),
                "XGBoost": XGBClassifier(
                    random_state=self.config.random_state,
                    use_label_encoder=False,
                    eval_metric="logloss"
                )
            }
            logger.info("Models initialized successfully")
            return models
        except Exception as e:
            raise CustomException(e, sys)

    def train_and_select_best_model(self,models,X_train,X_test,y_train,y_test):
        try:
            logger.info("Training machine learning models")

            best_model = None
            best_model_name = None
            best_accuracy = 0

            model_scores = []

            for name, model in models.items():
                logger.info(f"Training {name}")

                model.fit(X_train, y_train)

                y_pred = model.predict(X_test)

                accuracy = accuracy_score(y_test, y_pred)
                model_scores.append({
                    "Model": name,
                    "Accuracy": accuracy})
                logger.info(f"{name} Accuracy : {accuracy}")
            if accuracy > best_accuracy:
                best_accuracy = accuracy
                best_model = model
                best_model_name = name
                scores_df = pd.DataFrame(model_scores)
                logger.info(f"Best Model : {best_model_name}")
                logger.info(f"Best Accuracy : {best_accuracy}")
                return best_model, best_model_name, best_accuracy, scores_df
        except Exception as e:
            raise CustomException(e, sys)



    def save_model(self,model,scores_df):
        try:
            logger.info("Saving trained model")
            os.makedirs(self.config.root_dir,exist_ok=True)
            joblib.dump(model,self.config.model_path)
            scores_df.to_csv(os.path.join(self.config.root_dir,"model_scores.csv"),index=False)
            logger.info("Model saved successfully")

        except Exception as e:

            raise CustomException(e,sys)



    def initiate_model_trainer(self):
        try:
            X_train, X_test, y_train, y_test = self.load_data()

            models = self.initialize_models()
            (best_model,best_model_name,best_accuracy,scores_df) = self.train_and_select_best_model(models,X_train,X_test,y_train,y_test)
            self.save_model(best_model,scores_df)
            logger.info(f"Best Model : {best_model_name}")
            logger.info(f"Accuracy : {best_accuracy}")

            return best_accuracy

        except Exception as e:
            raise CustomException(e,sys)


