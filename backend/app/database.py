import psycopg2
from psycopg2 import sql, Error
from psycopg2.extras import RealDictCursor
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
            self.connection = psycopg2.connect(
                host=os.getenv('DB_HOST', 'localhost'),
                user=os.getenv('DB_USER', 'postgres'),
                password=os.getenv('DB_PASSWORD', 'postgres'),
                database=os.getenv('DB_NAME', 'fusisktz_fusion_fitnet'),
                port=int(os.getenv('DB_PORT', 5432))
            )
            # Set autocommit mode to avoid transaction blocking
            self.connection.autocommit = True
            # Use RealDictCursor for dictionary-like results
            self.cursor = self.connection.cursor(cursor_factory=RealDictCursor)
            print("✅ PostgreSQL database connected successfully")
            return True
        except Error as e:
            print(f"❌ Database connection failed: {e}")
            return False
    
    def close(self):
        """Close database connection."""
        if self.connection:
            if self.cursor:
                self.cursor.close()
            self.connection.close()
            print("✅ Database connection closed")
    
    def execute_query(self, query, params=None):
        """Execute a query (INSERT, UPDATE, DELETE)."""
        try:
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
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
    
    def init_tables(self):
        """Initialize all tables if they don't exist."""
        # Check if connection is valid
        if not self.connection or not self.cursor:
            print("❌ Database not connected. Cannot initialize tables.")
            return False
        
        tables = [
            # Users table
            """CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                is_admin BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )""",
            
            # Products table
            """CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                image_url VARCHAR(500),
                category VARCHAR(100),
                stock INT DEFAULT 0,
                is_featured BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )""",
            
            # Cart items table
            """CREATE TABLE IF NOT EXISTS cart_items (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (product_id) REFERENCES products(id)
            )""",
            
            # Contact messages table
            """CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                subject VARCHAR(200) NOT NULL,
                message TEXT NOT NULL,
                submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )""",
            
            # Gallery table
            """CREATE TABLE IF NOT EXISTS gallery (
                id SERIAL PRIMARY KEY,
                title VARCHAR(200) NOT NULL,
                image_url VARCHAR(500) NOT NULL,
                description TEXT,
                category VARCHAR(50),
                is_featured BOOLEAN DEFAULT FALSE,
                homepage_order INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )""",
            
            # Events table
            """CREATE TABLE IF NOT EXISTS events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(200) NOT NULL,
                description TEXT NOT NULL,
                date DATE NOT NULL,
                time TIME,
                location VARCHAR(300),
                image_url VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )""",
            
            # Team table
            """CREATE TABLE IF NOT EXISTS team (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                role VARCHAR(100) NOT NULL,
                bio TEXT,
                image_url VARCHAR(500),
                email VARCHAR(100),
                phone VARCHAR(20),
                social_facebook VARCHAR(500),
                social_instagram VARCHAR(500),
                social_twitter VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )""",
            
            # Blog posts table
            """CREATE TABLE IF NOT EXISTS blog_posts (
                id SERIAL PRIMARY KEY,
                title VARCHAR(300) NOT NULL,
                content TEXT NOT NULL,
                excerpt VARCHAR(500),
                author_id INT,
                published BOOLEAN DEFAULT FALSE,
                published_date TIMESTAMP,
                image_url VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )""",
            
            # Product images table (for multiple images per product)
            """CREATE TABLE IF NOT EXISTS product_images (
                id SERIAL PRIMARY KEY,
                product_id INT NOT NULL,
                image_url VARCHAR(500) NOT NULL,
                display_order INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
            )""",
            
            # Visitors table
            """CREATE TABLE IF NOT EXISTS visitors (
                id SERIAL PRIMARY KEY,
                visit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                ip_address VARCHAR(50),
                user_agent TEXT
            )"""
        ]
        
        try:
            for table_sql in tables:
                self.cursor.execute(table_sql)
            print("✅ All tables initialized successfully")
            return True
        except Error as e:
            print(f"❌ Error initializing tables: {e}")
            return False

# Global database instance
db = Database()

if __name__ == '__main__':
    db.connect()
    db.init_tables()
    db.close()

