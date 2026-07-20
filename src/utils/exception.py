import sys
from src.utils.logger import logger

def error_message_detail(error,error_detail):
    _, _, exc_tb=error_detail.exc_info()
    file_name=exc_tb.tb_frame.f_code.co_filename
    line_number=exc_tb.tb_lineno
    
    error_message=(
        f"Error occured in Python script [{file_name}]"
        f"at line_number [{line_number}]"
        f"Error message :{str(error)}"
    )
    return error_message

class CustomException(Exception):
    def __init__(self,error_message,error_detail):
        super().__init__(error_message)
        self.error_message=error_message_detail(error_message,error_detail)
    def __str__(self):
        return self.error_message