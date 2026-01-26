const express = require('express');
const router = express.Router();
const axios = require('axios');
const FLASK_API = process.env.FLASK_API || 'http://localhost:5000';

// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }
  next();
};

// GET: Cart page
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const cartRes = await axios.get(`${FLASK_API}/api/cart/${req.session.userId}`);
    
    res.render('cart', {
      title: 'Shopping Cart - Fusion FitNet',
      userName: req.session.userName,
      isLoggedIn: true,
      items: cartRes.data.items || [],
      total: cartRes.data.total || 0
    });
  } catch (error) {
    res.render('cart', {
      title: 'Shopping Cart - Fusion FitNet',
      userName: req.session.userName,
      isLoggedIn: true,
      items: [],
      total: 0
    });
  }
});

// POST: Add to cart
router.post('/add', isLoggedIn, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const response = await axios.post(`${FLASK_API}/api/cart/add`, {
      user_id: req.session.userId,
      product_id: productId,
      quantity: quantity || 1
    });

    res.json({ success: true, message: 'Item added to cart', data: response.data });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Error adding item to cart'
    });
  }
});

// POST: Remove from cart
router.post('/remove', isLoggedIn, async (req, res) => {
  try {
    const { cartItemId } = req.body;

    await axios.post(`${FLASK_API}/api/cart/remove`, {
      user_id: req.session.userId,
      cart_item_id: cartItemId
    });

    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Error removing item'
    });
  }
});

module.exports = router;
