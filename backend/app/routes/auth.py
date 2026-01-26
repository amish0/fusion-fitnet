from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.database import db
import re

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

def is_valid_email(email):
    """Validate email format."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    """User signup endpoint."""
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        # Validation
        if not all([name, email, password]):
            return jsonify({'message': 'All fields are required'}), 400
        
        if not is_valid_email(email):
            return jsonify({'message': 'Invalid email format'}), 400
        
        if len(password) < 6:
            return jsonify({'message': 'Password must be at least 6 characters'}), 400
        
        # Check if email already exists
        existing_user = db.fetch_one('SELECT id FROM users WHERE email = %s', (email,))
        if existing_user:
            return jsonify({'message': 'Email already registered'}), 409
        
        # Hash password
        hashed_password = generate_password_hash(password)
        
        # Insert user
        query = 'INSERT INTO users (name, email, password) VALUES (%s, %s, %s)'
        db.execute_query(query, (name, email, hashed_password))
        
        # Fetch the created user
        user = db.fetch_one('SELECT id, name, email, is_admin FROM users WHERE email = %s', (email,))
        
        if not user:
            return jsonify({'message': 'User created but failed to retrieve user data'}), 500
        
        return jsonify({
            'message': 'User created successfully',
            'user_id': user['id'],
            'name': user['name'],
            'email': user['email'],
            'is_admin': user['is_admin']
        }), 201
    
    except Exception as e:
        return jsonify({'message': f'Signup error: {str(e)}'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """User login endpoint."""
    try:
        data = request.get_json()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({'message': 'Email and password are required'}), 400
        
        # Fetch user
        user = db.fetch_one('SELECT id, name, email, password, is_admin FROM users WHERE email = %s', (email,))
        
        if not user or not check_password_hash(user['password'], password):
            return jsonify({'message': 'Invalid email or password'}), 401
        
        return jsonify({
            'message': 'Login successful',
            'user_id': user['id'],
            'name': user['name'],
            'email': user['email'],
            'is_admin': user['is_admin']
        }), 200
    
    except Exception as e:
        return jsonify({'message': f'Login error: {str(e)}'}), 500

@auth_bp.route('/logout', methods=['POST'])
def logout():
    """User logout endpoint."""
    return jsonify({'message': 'Logged out successfully'}), 200
