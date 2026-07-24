import os
import yaml
from pathlib import Path
from box import ConfigBox
from box.exceptions import BoxValueError
from ensure import ensure_annotations
from src.utils.logger import logger
from src.utils.exception import CustomException
import json
import joblib
import sys

@ensure_annotations
def read_yaml(path_to_yaml:Path)->ConfigBox:
    try:
        with open(path_to_yaml) as yaml_file:
            content=yaml.safe_load(yaml_file)
            logger.info(f"YAML file: {path_to_yaml} loaded successfully")
            return ConfigBox(content)
    except BoxValueError:
        raise ValueError("YAML file is empty")
    except Exception as e:
        raise CustomException(e,sys)




@ensure_annotations
def create_directories(path_to_directories:list,verbose=True):
    for path in path_to_directories:
        os.makedirs(path,exist_ok=True)
        if verbose:
            logger.info(f"Created directory at : {path}")


@ensure_annotations
def save_json(path:Path,data:dict):
    try:
        logger.info(f"Saving JSON file at : {path}")
        path.parent.mkdir(parents=True,exist_ok=True)
        with open(path,'w') as f:
            json.dump(data,f,indent=4)
        logger.info("JSON file saved successfully")
    except Exception as e:
        raise CustomException(e,sys)


@ensure_annotations
def load_json(path:Path)->ConfigBox:
    try:
        logger.info(f"Loading JSON file from : {path}")
        with open(path,'r') as f:
            content=json.load(f)
        logger.info("JSON file loaded successfully")
        return ConfigBox(content)
    except Exception as e:
        raise CustomException(e,sys)


@ensure_annotations
def save_bin(data,path:Path):
    try:
        logger.info(f"Saving binary file at : {path}")
        path.parent.mkdir(parents=True,exist_ok=True)
        joblib.dump(value=data,filename=path)
        logger.info("Binary file saved successfully")
    except Exception as e:
        raise CustomException(e,sys)


@ensure_annotations
def load_bin(path:Path):
    try:
        logger.info(f"Loading binary file from : {path}")
        data=joblib.load(path)
        logger.info("Binary file loaded succesfully")
        return from dvclive.catalyst import DVCLiveCallback
    except Exception as e:
        raise CustomException (e,sys)



