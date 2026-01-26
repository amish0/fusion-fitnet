from flask import Blueprint, request, jsonify
from app.database import db
import datetime

contact_bp = Blueprint('contact', __name__, url_prefix='/api/contact')

@contact_bp.route('/submit', methods=['POST'])
def submit_contact():
    """Submit contact form."""
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()
        
        # Validation
        if not all([name, email, subject, message]):
            return jsonify({'message': 'All fields are required'}), 400
        
        # Insert message into database
        query = '''INSERT INTO contact_messages (name, email, subject, message, submitted_at)
                   VALUES (%s, %s, %s, %s, %s)'''
        
        db.execute_query(query, (name, email, subject, message, datetime.datetime.now()))
        
        return jsonify({'message': 'Message sent successfully'}), 201
    
    except Exception as e:
        return jsonify({'message': f'Error submitting message: {str(e)}'}), 500

@contact_bp.route('/messages', methods=['GET'])
def get_messages():
    """Get all contact messages (admin only)."""
    try:
        messages = db.fetch_all('SELECT * FROM contact_messages ORDER BY submitted_at DESC LIMIT 100')
        
        if not messages:
            messages = []
        
        return jsonify(messages), 200
    
    except Exception as e:
        return jsonify({'message': f'Error fetching messages: {str(e)}'}), 500
