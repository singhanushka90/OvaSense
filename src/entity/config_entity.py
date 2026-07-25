from dataclasses import dataclass
from pathlib import Path

@dataclass(frozen=True)
class DataIngestionConfig:
    root_dir:str
    local_data_file:str
    train_data_path:str
    test_data_path:str
    sheet_name:str


@dataclass(frozen=True)
class DataValidationConfig:
    root_dir:str
    STATUS_FILE:str
    local_data_file:str
    sheet_name:str
    schema_file_path:str

@dataclass(frozen=True)
class FeatureEngineeringConfig:
    root_dir:str
    processed_daat_path:str
    local_data_file:str
    sheet_name:str

@dataclass(frozen=True)
class DataTransformationConfig:
    root_dir: str
    processed_data_path: str
    train_features_path: str
    test_features_path: str
    train_target_path: str
    test_target_path: str


@dataclass(frozen=True)
class ModelTrainingConfig:
    root_dir: str
    trained_model_path: str
