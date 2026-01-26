from flask import Blueprint, request, jsonify
from app.database import db

user_bp = Blueprint('user', __name__, url_prefix='/api/user')

@user_bp.route('/profile', methods=['GET'])
def get_profile():
    """Get user profile."""
    try:
        # Get user_id from request headers or query params
        user_id = request.args.get('user_id')
        
        if not user_id:
            return jsonify({'message': 'User ID is required'}), 400
        
        user = db.fetch_one('SELECT id, name, email FROM users WHERE id = %s', (user_id,))
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        return jsonify({
            'user_id': user['id'],
            'name': user['name'],
            'email': user['email']
        }), 200
    
    except Exception as e:
        return jsonify({'message': f'Error fetching profile: {str(e)}'}), 500

@user_bp.route('/update', methods=['PUT'])
def update_profile():
    """Update user profile."""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        name = data.get('name')
        email = data.get('email')
        
        if not user_id:
            return jsonify({'message': 'User ID is required'}), 400
        
        # Check if user exists
        user = db.fetch_one('SELECT id FROM users WHERE id = %s', (user_id,))
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        # Update user
        if name:
            db.execute_query('UPDATE users SET name = %s WHERE id = %s', (name, user_id))
        
        if email:
            # Check if email is already taken
            existing_user = db.fetch_one('SELECT id FROM users WHERE email = %s AND id != %s', (email, user_id))
            if existing_user:
                return jsonify({'message': 'Email already in use'}), 409
            db.execute_query('UPDATE users SET email = %s WHERE id = %s', (email, user_id))
        
        return jsonify({'message': 'Profile updated successfully'}), 200
    
    except Exception as e:
        return jsonify({'message': f'Error updating profile: {str(e)}'}), 500
