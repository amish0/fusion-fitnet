import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    def __init__(self):
        self.connection = None
        self.cursor = None
    
    def connect(self):
        """Establish database connection."""
        try:
            self.connection = mysql.connector.connect(
                host=os.getenv('DB_HOST', 'localhost'),
                user=os.getenv('DB_USER', 'fusisktz_admin'),
                password=os.getenv('DB_PASSWORD', 'BamSF1+2K4*X'),
                database=os.getenv('DB_NAME', 'fusisktz_fusion_fitnet'),
                port=int(os.getenv('DB_PORT', 3306))
            )
            self.cursor = self.connection.cursor(dictionary=True)
            print("✅ Database connected successfully")
            return True
        except Error as e:
            print(f"❌ Database connection failed: {e}")
            return False
    
    def close(self):
        """Close database connection."""
        if self.connection and self.connection.is_connected():
            self.cursor.close()
            self.connection.close()
    
    def execute_query(self, query, params=None):
        """Execute a query and return results."""
        try:
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            self.connection.commit()
            return True
        except Error as e:
            print(f"❌ Query execution error: {e}")
            return False
    
    def fetch_one(self, query, params=None):
        """Fetch a single record."""
        try:
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            return self.cursor.fetchone()
        except Error as e:
            print(f"❌ Query execution error: {e}")
            return None
    
    def fetch_all(self, query, params=None):
        """Fetch all records."""
        try:
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            return self.cursor.fetchall()
        except Error as e:
            print(f"❌ Query execution error: {e}")
            return None

# Global database instance
db = Database()
