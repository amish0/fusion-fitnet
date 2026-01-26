import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from app.database import db
import json

load_dotenv()

def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    app.config['JSON_SORT_KEYS'] = False
    
    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://localhost:3001"]}})
    
    # Initialize database connection
    db.connect()
    
    # Create tables if they don't exist
    db.init_tables()
    
    # Register blueprints
    from app.routes import auth_bp, user_bp, content_bp, cart_bp, contact_bp, admin_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(content_bp)
    app.register_blueprint(cart_bp)
    app.register_blueprint(contact_bp)
    app.register_blueprint(admin_bp)
    
    # Global error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'message': 'Resource not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'message': 'Internal server error'}), 500
    
    @app.route('/health', methods=['GET'])
    def health_check():
        """Health check endpoint."""
        return jsonify({'status': 'ok', 'message': 'Flask API is running'})
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
