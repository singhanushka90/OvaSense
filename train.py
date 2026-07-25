#logger.py test
"""from src.utils.logger import logger
logger.info("Training pipeline started.")"""

#exception.py test
"""import sys
from src.utils.exception import CustomException
from src.utils.logger import logger

try:
    a=10/0
except Exception as e:
    logger.error(CustomException(e,sys))"""


from src.pipeline.training_pipeline import TrainingPipeline
from src.utils.logger import logger
from src.utils.exception import CustomException
import sys

if __name__=="__main__":
    try:
        logger.info("Training Application Started")
        pipeline=TrainingPipeline()
        pipeline.run_pipeline()
        logger.info("Training Application Completed Successfully")
    except Exception as e:
        logger.exception(e)
        raise CustomException(e,sys)

