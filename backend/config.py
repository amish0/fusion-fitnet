import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration."""
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    
    # Database
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_USER = os.getenv('DB_USER', 'fusisktz_admin')
    DB_PASSWORD = os.getenv('DB_PASSWORD', 'BamSF1+2K4*X')
    DB_NAME = os.getenv('DB_NAME', 'fusisktz_fusion_fitnet')
    DB_PORT = int(os.getenv('DB_PORT', 3306))

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
