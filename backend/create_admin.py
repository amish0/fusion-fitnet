"""
Create admin user script.
Run this to create an admin user: python create_admin.py
"""

import sys
import os
sys.path.insert(0, os.path.abspath('.'))

from app.database import db
from werkzeug.security import generate_password_hash

def create_admin_user():
    """Create an admin user in the database."""
    
    # Connect to database
    db.connect()
    
    print("=" * 50)
    print("CREATE ADMIN USER")
    print("=" * 50)
    
    # Get admin details
    name = input("Enter admin name: ").strip()
    email = input("Enter admin email: ").strip().lower()
    password = input("Enter admin password (min 6 characters): ").strip()
    
    if not all([name, email, password]):
        print("❌ All fields are required!")
        return
    
    if len(password) < 6:
        print("❌ Password must be at least 6 characters!")
        return
    
    try:
        # Check if email already exists
        existing_user = db.fetch_one('SELECT id FROM users WHERE email = %s', (email,))
        if existing_user:
            print("❌ Email already exists!")
            return
        
        # Hash password
        hashed_password = generate_password_hash(password)
        
        # Insert admin user
        query = 'INSERT INTO users (name, email, password, is_admin) VALUES (%s, %s, %s, %s)'
        db.execute_query(query, (name, email, hashed_password, True))
        
        print("\n✅ Admin user created successfully!")
        print(f"   Email: {email}")
        print(f"   Name: {name}")
        print("\n🔐 You can now login with these credentials.")
        
    except Exception as e:
        print(f"❌ Error creating admin user: {e}")
    finally:
        db.close()

if __name__ == '__main__':
    create_admin_user()
