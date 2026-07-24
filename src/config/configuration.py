from src.constants import CONFIG_FILE_PATH,PARAMS_FILE_PATH,SCHEMA_FILE_PATH
from src.utils.common import read_yaml,create_directories
from src.entity.config_entity import DataIngestionConfig,DataValidationConfig


class ConfigurationManager:
    def __init__(
            self,
            config_filepath=CONFIG_FILE_PATH,
            params_filepath=PARAMS_FILE_PATH,
    ):
        self.config=read_yaml(config_filepath)
        self.params=read_yaml(params_filepath)
        create_directories([self.config.artifacts_root])


def get_data_ingestion_config(self)->DataIngestionConfig:
    config=self.config.data_ingestion
    create_directories([config.root_dir])
    data_ingestion_config=DataIngestionConfig(root_dir=config.root_dir,
                                              local_data_file=config.local_data_file,
                                              train_data_path=config.train_data_path,
                                              test_data_path=config.test_data_path,
                                              sheet_name=config.sheet_name)
    return data_ingestion_config



def get_data_validation_config(self)->DataValidationConfig:
    config=self.config.data_validation
    create_directories([config.root_dir])
    data_validation_config=DataValidationConfig(root_dir=config.root_dir,
                                                STATUS_FILE=config.STATUS_FILE,
                                              local_data_file=self.config.data_ingestion.local_data_file,
                                              sheet_name=self.config.sheet_name,
                                              schema_file_path=SCHEMA_FILE_PATH
                                            )
    return data_validation_config



def get_feature_engineering_config(self)->FeatureEngineeringConfig:
    config=self.config.feature_engineering
    create_directories([config.root_dir])
    feature_engineering_config=FeatureEngineeringConfig(root_dir=config.root_dir,
                                                processed_data_path=config.processed_data_path,
                                              local_data_file=self.config.data_ingestion.local_data_file,
                                              sheet_name=self.config.sheet_name
                                            )
    return feature_engineering_config