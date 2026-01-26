from flask import Blueprint, request, jsonify
from app.database import db

cart_bp = Blueprint('cart', __name__, url_prefix='/api/cart')

@cart_bp.route('/<int:user_id>', methods=['GET'])
def get_cart(user_id):
    """Get user's cart."""
    try:
        # Fetch cart items for user
        items = db.fetch_all(
            '''SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.description
               FROM cart_items ci
               LEFT JOIN products p ON ci.product_id = p.id
               WHERE ci.user_id = %s''',
            (user_id,)
        )
        
        if not items:
            items = []
        
        total = sum(item['price'] * item['quantity'] for item in items if item['price'])
        
        return jsonify({
            'user_id': user_id,
            'items': items,
            'total': total
        }), 200
    
    except Exception as e:
        return jsonify({'message': f'Error fetching cart: {str(e)}'}), 500

@cart_bp.route('/add', methods=['POST'])
def add_to_cart():
    """Add item to cart."""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        product_id = data.get('product_id')
        quantity = data.get('quantity', 1)
        
        if not user_id or not product_id:
            return jsonify({'message': 'User ID and Product ID are required'}), 400
        
        # Check if product exists
        product = db.fetch_one('SELECT id FROM products WHERE id = %s', (product_id,))
        if not product:
            return jsonify({'message': 'Product not found'}), 404
        
        # Check if item already in cart
        existing_item = db.fetch_one(
            'SELECT id, quantity FROM cart_items WHERE user_id = %s AND product_id = %s',
            (user_id, product_id)
        )
        
        if existing_item:
            # Update quantity
            new_quantity = existing_item['quantity'] + quantity
            db.execute_query(
                'UPDATE cart_items SET quantity = %s WHERE id = %s',
                (new_quantity, existing_item['id'])
            )
        else:
            # Add new item
            db.execute_query(
                'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (%s, %s, %s)',
                (user_id, product_id, quantity)
            )
        
        return jsonify({'message': 'Item added to cart successfully'}), 201
    
    except Exception as e:
        return jsonify({'message': f'Error adding to cart: {str(e)}'}), 500

@cart_bp.route('/remove', methods=['POST'])
def remove_from_cart():
    """Remove item from cart."""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        cart_item_id = data.get('cart_item_id')
        
        if not user_id or not cart_item_id:
            return jsonify({'message': 'User ID and Cart Item ID are required'}), 400
        
        # Verify cart item belongs to user
        item = db.fetch_one(
            'SELECT id FROM cart_items WHERE id = %s AND user_id = %s',
            (cart_item_id, user_id)
        )
        
        if not item:
            return jsonify({'message': 'Cart item not found'}), 404
        
        # Delete item
        db.execute_query('DELETE FROM cart_items WHERE id = %s', (cart_item_id,))
        
        return jsonify({'message': 'Item removed from cart'}), 200
    
    except Exception as e:
        return jsonify({'message': f'Error removing from cart: {str(e)}'}), 500

@cart_bp.route('/clear', methods=['POST'])
def clear_cart():
    """Clear user's entire cart."""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        
        if not user_id:
            return jsonify({'message': 'User ID is required'}), 400
        
        db.execute_query('DELETE FROM cart_items WHERE user_id = %s', (user_id,))
        
        return jsonify({'message': 'Cart cleared'}), 200
    
    except Exception as e:
        return jsonify({'message': f'Error clearing cart: {str(e)}'}), 500
