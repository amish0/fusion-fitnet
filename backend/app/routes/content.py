from flask import Blueprint, jsonify, request
from app.database import db
import json
import os

content_bp = Blueprint('content', __name__, url_prefix='/api')

def read_json_file(filename):
    """Read JSON file from data directory."""
    try:
        filepath = os.path.join('public/data', filename)
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []
    except Exception as e:
        print(f"Error reading {filename}: {e}")
        return []

@content_bp.route('/visitors', methods=['GET'])
def get_visitors():
    """Get visitor count."""
    try:
        visitor_file = 'public/data/visitor_count_test.txt'
        if os.path.exists(visitor_file):
            with open(visitor_file, 'r') as f:
                count = int(f.read().strip()) if f.read().strip() else 0
        else:
            count = 0
        
        return jsonify({'count': count}), 200
    except Exception as e:
        return jsonify({'count': 0}), 200

@content_bp.route('/gallery', methods=['GET'])
def get_gallery():
    """Get gallery images."""
    gallery_data = read_json_file('gallery.json')
    return jsonify(gallery_data), 200

@content_bp.route('/events', methods=['GET'])
def get_events():
    """Get events list."""
    events_data = read_json_file('event.json')
    return jsonify(events_data), 200

@content_bp.route('/team', methods=['GET'])
def get_team():
    """Get team members."""
    team_data = read_json_file('team.json')
    return jsonify(team_data), 200

@content_bp.route('/blog', methods=['GET'])
def get_blog():
    """Get blog posts."""
    blog_data = read_json_file('blog.json')
    return jsonify(blog_data), 200

@content_bp.route('/gallery/<int:id>', methods=['GET'])
def get_gallery_item(id):
    """Get single gallery item."""
    gallery_data = read_json_file('gallery.json')
    item = next((item for item in gallery_data if item.get('id') == id), None)
    
    if not item:
        return jsonify({'message': 'Gallery item not found'}), 404
    
    return jsonify(item), 200

@content_bp.route('/events/<int:id>', methods=['GET'])
def get_event(id):
    """Get single event."""
    events_data = read_json_file('event.json')
    event = next((evt for evt in events_data if evt.get('id') == id), None)
    
    if not event:
        return jsonify({'message': 'Event not found'}), 404
    
    return jsonify(event), 200

@content_bp.route('/team/<int:id>', methods=['GET'])
def get_team_member(id):
    """Get single team member."""
    team_data = read_json_file('team.json')
    member = next((m for m in team_data if m.get('id') == id), None)
    
    if not member:
        return jsonify({'message': 'Team member not found'}), 404
    
    return jsonify(member), 200
