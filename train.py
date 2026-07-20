#logger.py test
"""from src.utils.logger import logger
logger.info("Training pipeline started.")"""

#exception.py test
import sys
from src.utils.exception import CustomException
from src.utils.logger import logger

try:
    a=10/0
except Exception as e:
    logger.error(CustomException(e,sys))

