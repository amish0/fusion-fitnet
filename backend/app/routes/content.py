from flask import Blueprint, jsonify, request
from app.database import db
from datetime import date, time, datetime

content_bp = Blueprint('content', __name__, url_prefix='/api')

@content_bp.route('/visitors', methods=['GET'])
def get_visitors():
    """Get visitor count from database."""
    try:
        result = db.fetch_one('SELECT COUNT(*) as count FROM visitors')
        count = result['count'] if result else 0
        return jsonify({'count': count}), 200
    except Exception as e:
        print(f"Error fetching visitor count: {e}")
        return jsonify({'count': 0}), 200

@content_bp.route('/gallery', methods=['GET'])
def get_gallery():
    """Get all gallery images from database."""
    try:
        gallery_data = db.fetch_all('SELECT * FROM gallery ORDER BY created_at DESC')
        return jsonify(gallery_data or []), 200
    except Exception as e:
        print(f"Error fetching gallery: {e}")
        return jsonify({'message': f'Error fetching gallery: {str(e)}'}), 500

@content_bp.route('/gallery/<int:id>', methods=['GET'])
def get_gallery_item(id):
    """Get single gallery item from database."""
    try:
        item = db.fetch_one('SELECT * FROM gallery WHERE id = %s', (id,))
        if not item:
            return jsonify({'message': 'Gallery item not found'}), 404
        return jsonify(item), 200
    except Exception as e:
        print(f"Error fetching gallery item: {e}")
        return jsonify({'message': f'Error fetching gallery item: {str(e)}'}), 500

@content_bp.route('/events', methods=['GET'])
def get_events():
    """Get all events from database."""
    try:
        events_data = db.fetch_all('SELECT * FROM events WHERE date >= CURRENT_DATE ORDER BY date ASC')
        safe_events = []
        if events_data:
            for row in events_data:
                r = dict(row)
                for k, v in r.items():
                    if isinstance(v, (date, datetime)):
                        r[k] = v.isoformat()
                    elif isinstance(v, time):
                        r[k] = v.strftime('%H:%M:%S')
                safe_events.append(r)
        return jsonify(safe_events or []), 200
    except Exception as e:
        print(f"Error fetching events: {e}")
        return jsonify({'message': f'Error fetching events: {str(e)}'}), 500

@content_bp.route('/events/<int:id>', methods=['GET'])
def get_event(id):
    """Get single event from database."""
    try:
        event = db.fetch_one('SELECT * FROM events WHERE id = %s', (id,))
        if not event:
            return jsonify({'message': 'Event not found'}), 404
        r = dict(event)
        for k, v in r.items():
            if isinstance(v, (date, datetime)):
                r[k] = v.isoformat()
            elif isinstance(v, time):
                r[k] = v.strftime('%H:%M:%S')
        return jsonify(r), 200
    except Exception as e:
        print(f"Error fetching event: {e}")
        return jsonify({'message': f'Error fetching event: {str(e)}'}), 500

@content_bp.route('/team', methods=['GET'])
def get_team():
    """Get all team members from database."""
    try:
        team_data = db.fetch_all('SELECT * FROM team ORDER BY name ASC')
        return jsonify(team_data or []), 200
    except Exception as e:
        print(f"Error fetching team: {e}")
        return jsonify({'message': f'Error fetching team: {str(e)}'}), 500

@content_bp.route('/team/<int:id>', methods=['GET'])
def get_team_member(id):
    """Get single team member from database."""
    try:
        member = db.fetch_one('SELECT * FROM team WHERE id = %s', (id,))
        if not member:
            return jsonify({'message': 'Team member not found'}), 404
        return jsonify(member), 200
    except Exception as e:
        print(f"Error fetching team member: {e}")
        return jsonify({'message': f'Error fetching team member: {str(e)}'}), 500

@content_bp.route('/blog', methods=['GET'])
def get_blog():
    """Get all blog posts from database."""
    try:
        blog_data = db.fetch_all('SELECT * FROM blog_posts WHERE published = TRUE ORDER BY published_date DESC LIMIT 10')
        return jsonify(blog_data or []), 200
    except Exception as e:
        print(f"Error fetching blog posts: {e}")
        return jsonify({'message': f'Error fetching blog posts: {str(e)}'}), 500

@content_bp.route('/blog/<int:id>', methods=['GET'])
def get_blog_post(id):
    """Get single blog post from database."""
    try:
        post = db.fetch_one('SELECT * FROM blog_posts WHERE id = %s AND published = TRUE', (id,))
        if not post:
            return jsonify({'message': 'Blog post not found'}), 404
        return jsonify(post), 200
    except Exception as e:
        print(f"Error fetching blog post: {e}")
        return jsonify({'message': f'Error fetching blog post: {str(e)}'}), 500
