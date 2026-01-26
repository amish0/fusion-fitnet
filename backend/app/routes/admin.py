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
        is_featured = data.get('is_featured', False)
        homepage_order = data.get('homepage_order', 0)
        
        if not all([title, image_url]):
            return jsonify({'message': 'Title and image URL are required'}), 400
        
        query = """INSERT INTO gallery (title, image_url, description, category, is_featured, homepage_order) 
                   VALUES (%s, %s, %s, %s, %s, %s)"""
        db.execute_query(query, (title, image_url, description, category, is_featured, homepage_order))
        
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
        is_featured = data.get('is_featured', False)
        homepage_order = data.get('homepage_order', 0)
        
        if not all([title, image_url]):
            return jsonify({'message': 'Title and image URL are required'}), 400
        
        query = """UPDATE gallery 
                   SET title = %s, image_url = %s, description = %s, category = %s, is_featured = %s, homepage_order = %s 
                   WHERE id = %s"""
        db.execute_query(query, (title, image_url, description, category, is_featured, homepage_order, gallery_id))
        
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

# ============ PRODUCT MANAGEMENT ============

@admin_bp.route('/products', methods=['POST'])
@require_admin
def create_product():
    """Create a new product."""
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        description = data.get('description', '').strip()
        price = data.get('price', 0)
        image_url = data.get('image_url', '').strip()
        category = data.get('category', '').strip()
        stock = data.get('stock', 0)
        is_featured = data.get('is_featured', False)
        
        if not all([name, price]):
            return jsonify({'message': 'Name and price are required'}), 400
        
        # Check product count limit (max 10)
        count_result = db.fetch_one('SELECT COUNT(*) as count FROM products')
        if count_result and count_result['count'] >= 10:
            return jsonify({'message': 'Maximum 10 products allowed'}), 400
        
        query = """INSERT INTO products (name, description, price, image_url, category, stock, is_featured) 
                   VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id"""
        result = db.fetch_one(query, (name, description, price, image_url, category, stock, is_featured))
        
        return jsonify({
            'message': 'Product created successfully',
            'product_id': result['id'] if result else None
        }), 201
    except Exception as e:
        return jsonify({'message': f'Error creating product: {str(e)}'}), 500

@admin_bp.route('/products/<int:product_id>', methods=['PUT'])
@require_admin
def update_product(product_id):
    """Update a product."""
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        description = data.get('description', '').strip()
        price = data.get('price', 0)
        image_url = data.get('image_url', '').strip()
        category = data.get('category', '').strip()
        stock = data.get('stock', 0)
        is_featured = data.get('is_featured', False)
        
        if not all([name, price]):
            return jsonify({'message': 'Name and price are required'}), 400
        
        query = """UPDATE products 
                   SET name = %s, description = %s, price = %s, image_url = %s, category = %s, stock = %s, is_featured = %s 
                   WHERE id = %s"""
        db.execute_query(query, (name, description, price, image_url, category, stock, is_featured, product_id))
        
        return jsonify({'message': 'Product updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error updating product: {str(e)}'}), 500

@admin_bp.route('/products/<int:product_id>', methods=['DELETE'])
@require_admin
def delete_product(product_id):
    """Delete a product."""
    try:
        # Delete product images first (CASCADE should handle this, but being explicit)
        db.execute_query("DELETE FROM product_images WHERE product_id = %s", (product_id,))
        # Delete product
        query = "DELETE FROM products WHERE id = %s"
        db.execute_query(query, (product_id,))
        
        return jsonify({'message': 'Product deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error deleting product: {str(e)}'}), 500

@admin_bp.route('/products/<int:product_id>/images', methods=['GET'])
@require_admin
def get_product_images_admin(product_id):
    """Get all images for a product."""
    try:
        images = db.fetch_all(
            'SELECT * FROM product_images WHERE product_id = %s ORDER BY display_order',
            (product_id,)
        )
        return jsonify(images or []), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching product images: {str(e)}'}), 500

@admin_bp.route('/products/<int:product_id>/images', methods=['POST'])
@require_admin
def add_product_image(product_id):
    """Add a new image to a product."""
    try:
        data = request.get_json()
        image_url = data.get('image_url', '').strip()
        
        if not image_url:
            return jsonify({'message': 'Image URL is required'}), 400
        
        # Get the next display order
        max_order = db.fetch_one(
            'SELECT MAX(display_order) as max_order FROM product_images WHERE product_id = %s',
            (product_id,)
        )
        next_order = (max_order['max_order'] or -1) + 1
        
        query = "INSERT INTO product_images (product_id, image_url, display_order) VALUES (%s, %s, %s)"
        db.execute_query(query, (product_id, image_url, next_order))
        
        return jsonify({'message': 'Image added successfully'}), 201
    except Exception as e:
        return jsonify({'message': f'Error adding image: {str(e)}'}), 500

@admin_bp.route('/products/<int:product_id>/images/<int:image_id>', methods=['DELETE'])
@require_admin
def delete_product_image(product_id, image_id):
    """Delete a product image."""
    try:
        query = "DELETE FROM product_images WHERE id = %s AND product_id = %s"
        db.execute_query(query, (image_id, product_id))
        
        return jsonify({'message': 'Image deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error deleting image: {str(e)}'}), 500

@admin_bp.route('/products/<int:product_id>/images/<int:image_id>/order', methods=['PUT'])
@require_admin
def update_image_order(product_id, image_id):
    """Update image display order."""
    try:
        data = request.get_json()
        new_order = data.get('display_order', 0)
        
        query = "UPDATE product_images SET display_order = %s WHERE id = %s AND product_id = %s"
        db.execute_query(query, (new_order, image_id, product_id))
        
        return jsonify({'message': 'Image order updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error updating image order: {str(e)}'}), 500

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
        products_count = db.fetch_one('SELECT COUNT(*) as count FROM products')
        
        return jsonify({
            'gallery': gallery_count['count'] if gallery_count else 0,
            'events': events_count['count'] if events_count else 0,
            'team': team_count['count'] if team_count else 0,
            'users': users_count['count'] if users_count else 0,
            'products': products_count['count'] if products_count else 0
        }), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching stats: {str(e)}'}), 500

@admin_bp.route('/settings', methods=['GET'])
@require_admin
def get_settings():
    """Get site settings (admin)."""
    try:
        rows = db.fetch_all('SELECT key, value FROM site_settings') or []
        settings = {row['key']: row['value'] for row in rows}
        return jsonify(settings), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching settings: {str(e)}'}), 500

@admin_bp.route('/settings', methods=['PUT'])
@require_admin
def update_settings():
    """Update site settings (hero video, messaging)."""
    try:
        data = request.get_json() or {}
        allowed_keys = ['hero_video_url', 'hero_video_poster', 'hero_fallback_image', 'hero_headline', 'hero_subheadline', 'cta_text', 'cta_link']
        for key, value in data.items():
            if key not in allowed_keys:
                continue
            db.execute_query(
                'INSERT INTO site_settings (key, value) VALUES (%s, %s) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value',
                (key, str(value) if value is not None else '')
            )
        return jsonify({'message': 'Settings updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error updating settings: {str(e)}'}), 500
