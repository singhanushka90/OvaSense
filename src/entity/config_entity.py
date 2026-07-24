from dataclasses import dataclass
from pathlib import Path

@dataclass(frozen=True)
class DataIngestionConfig:
    root_dir:Path
    local_data_file:Path
    train_data_path:Path
    test_data_path:Path
    sheet_name:str


@dataclass(frozen=True)
class DataValidationConfig:
    root_dir:Path
    STATUS_FILE:str
    local_data_file:Path
    sheet_name:str
    schema_file_path:Path

@dataclass(frozen=True)
class FeatureEngineeringConfig:
    root_dir:Path
    processed_daat_path:Path
    local_data_file:Path
    sheet_name:str
