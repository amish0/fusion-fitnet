from flask import Blueprint, request, jsonify
from functools import wraps
from app.database import db

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

def require_admin(f):
    """Decorator to check if user is admin."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Get user_id from request headers or session
        user_id = request.headers.get('X-User-ID')
        
        if not user_id:
            return jsonify({'message': 'Unauthorized - No user ID provided'}), 401
        
        # Check if user is admin
        user = db.fetch_one('SELECT is_admin FROM users WHERE id = %s', (user_id,))
        
        if not user or not user.get('is_admin'):
            return jsonify({'message': 'Forbidden - Admin access required'}), 403
        
        return f(*args, **kwargs)
    return decorated_function

# ============ GALLERY MANAGEMENT ============

@admin_bp.route('/gallery', methods=['POST'])
@require_admin
def create_gallery_item():
    """Create a new gallery item."""
    try:
        data = request.get_json()
        title = data.get('title', '').strip()
        image_url = data.get('image_url', '').strip()
        description = data.get('description', '').strip()
        category = data.get('category', '').strip()
        
        if not all([title, image_url]):
            return jsonify({'message': 'Title and image URL are required'}), 400
        
        query = """INSERT INTO gallery (title, image_url, description, category) 
                   VALUES (%s, %s, %s, %s)"""
        db.execute_query(query, (title, image_url, description, category))
        
        return jsonify({'message': 'Gallery item created successfully'}), 201
    except Exception as e:
        return jsonify({'message': f'Error creating gallery item: {str(e)}'}), 500

@admin_bp.route('/gallery/<int:gallery_id>', methods=['PUT'])
@require_admin
def update_gallery_item(gallery_id):
    """Update a gallery item."""
    try:
        data = request.get_json()
        title = data.get('title', '').strip()
        image_url = data.get('image_url', '').strip()
        description = data.get('description', '').strip()
        category = data.get('category', '').strip()
        
        if not all([title, image_url]):
            return jsonify({'message': 'Title and image URL are required'}), 400
        
        query = """UPDATE gallery 
                   SET title = %s, image_url = %s, description = %s, category = %s 
                   WHERE id = %s"""
        db.execute_query(query, (title, image_url, description, category, gallery_id))
        
        return jsonify({'message': 'Gallery item updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error updating gallery item: {str(e)}'}), 500

@admin_bp.route('/gallery/<int:gallery_id>', methods=['DELETE'])
@require_admin
def delete_gallery_item(gallery_id):
    """Delete a gallery item."""
    try:
        query = "DELETE FROM gallery WHERE id = %s"
        db.execute_query(query, (gallery_id,))
        
        return jsonify({'message': 'Gallery item deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error deleting gallery item: {str(e)}'}), 500

# ============ EVENT MANAGEMENT ============

@admin_bp.route('/events', methods=['POST'])
@require_admin
def create_event():
    """Create a new event."""
    try:
        data = request.get_json()
        title = data.get('title', '').strip()
        description = data.get('description', '').strip()
        date = data.get('date', '').strip()
        time = data.get('time', '')
        location = data.get('location', '').strip()
        image_url = data.get('image_url', '').strip()
        
        if not all([title, description, date]):
            return jsonify({'message': 'Title, description, and date are required'}), 400
        
        query = """INSERT INTO events (title, description, date, time, location, image_url) 
                   VALUES (%s, %s, %s, %s, %s, %s)"""
        db.execute_query(query, (title, description, date, time, location, image_url))
        
        return jsonify({'message': 'Event created successfully'}), 201
    except Exception as e:
        return jsonify({'message': f'Error creating event: {str(e)}'}), 500

@admin_bp.route('/events/<int:event_id>', methods=['PUT'])
@require_admin
def update_event(event_id):
    """Update an event."""
    try:
        data = request.get_json()
        title = data.get('title', '').strip()
        description = data.get('description', '').strip()
        date = data.get('date', '').strip()
        time = data.get('time', '')
        location = data.get('location', '').strip()
        image_url = data.get('image_url', '').strip()
        
        if not all([title, description, date]):
            return jsonify({'message': 'Title, description, and date are required'}), 400
        
        query = """UPDATE events 
                   SET title = %s, description = %s, date = %s, time = %s, location = %s, image_url = %s 
                   WHERE id = %s"""
        db.execute_query(query, (title, description, date, time, location, image_url, event_id))
        
        return jsonify({'message': 'Event updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error updating event: {str(e)}'}), 500

@admin_bp.route('/events/<int:event_id>', methods=['DELETE'])
@require_admin
def delete_event(event_id):
    """Delete an event."""
    try:
        query = "DELETE FROM events WHERE id = %s"
        db.execute_query(query, (event_id,))
        
        return jsonify({'message': 'Event deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error deleting event: {str(e)}'}), 500

# ============ TEAM MANAGEMENT ============

@admin_bp.route('/team', methods=['POST'])
@require_admin
def create_team_member():
    """Create a new team member."""
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        role = data.get('role', '').strip()
        bio = data.get('bio', '').strip()
        image_url = data.get('image_url', '').strip()
        email = data.get('email', '').strip()
        phone = data.get('phone', '')
        social_facebook = data.get('social_facebook', '')
        social_instagram = data.get('social_instagram', '')
        social_twitter = data.get('social_twitter', '')
        
        if not all([name, role]):
            return jsonify({'message': 'Name and role are required'}), 400
        
        query = """INSERT INTO team (name, role, bio, image_url, email, phone, social_facebook, social_instagram, social_twitter) 
                   VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        db.execute_query(query, (name, role, bio, image_url, email, phone, social_facebook, social_instagram, social_twitter))
        
        return jsonify({'message': 'Team member created successfully'}), 201
    except Exception as e:
        return jsonify({'message': f'Error creating team member: {str(e)}'}), 500

@admin_bp.route('/team/<int:team_id>', methods=['PUT'])
@require_admin
def update_team_member(team_id):
    """Update a team member."""
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        role = data.get('role', '').strip()
        bio = data.get('bio', '').strip()
        image_url = data.get('image_url', '').strip()
        email = data.get('email', '').strip()
        phone = data.get('phone', '')
        social_facebook = data.get('social_facebook', '')
        social_instagram = data.get('social_instagram', '')
        social_twitter = data.get('social_twitter', '')
        
        if not all([name, role]):
            return jsonify({'message': 'Name and role are required'}), 400
        
        query = """UPDATE team 
                   SET name = %s, role = %s, bio = %s, image_url = %s, email = %s, phone = %s, 
                       social_facebook = %s, social_instagram = %s, social_twitter = %s 
                   WHERE id = %s"""
        db.execute_query(query, (name, role, bio, image_url, email, phone, social_facebook, social_instagram, social_twitter, team_id))
        
        return jsonify({'message': 'Team member updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error updating team member: {str(e)}'}), 500

@admin_bp.route('/team/<int:team_id>', methods=['DELETE'])
@require_admin
def delete_team_member(team_id):
    """Delete a team member."""
    try:
        query = "DELETE FROM team WHERE id = %s"
        db.execute_query(query, (team_id,))
        
        return jsonify({'message': 'Team member deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error deleting team member: {str(e)}'}), 500

# ============ DASHBOARD DATA ============

@admin_bp.route('/dashboard/stats', methods=['GET'])
@require_admin
def get_dashboard_stats():
    """Get dashboard statistics."""
    try:
        gallery_count = db.fetch_one('SELECT COUNT(*) as count FROM gallery')
        events_count = db.fetch_one('SELECT COUNT(*) as count FROM events')
        team_count = db.fetch_one('SELECT COUNT(*) as count FROM team')
        users_count = db.fetch_one('SELECT COUNT(*) as count FROM users')
        
        return jsonify({
            'gallery': gallery_count['count'] if gallery_count else 0,
            'events': events_count['count'] if events_count else 0,
            'team': team_count['count'] if team_count else 0,
            'users': users_count['count'] if users_count else 0
        }), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching stats: {str(e)}'}), 500
