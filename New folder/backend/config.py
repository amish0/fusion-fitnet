import mysql.connector

# Database configuration
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="DB_USERNAME",
        password="DB_PASSWORD",
        database="DB_NAME"
    )