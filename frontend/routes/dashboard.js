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

// GET: Dashboard
router.get('/', isLoggedIn, (req, res) => {
  res.render('dashboard', {
    title: 'My Account - Fusion FitNet',
    userName: req.session.userName,
    userEmail: req.session.userEmail,
    isLoggedIn: true
  });
});

// GET: Profile data (API)
router.get('/api/profile', isLoggedIn, async (req, res) => {
  try {
    const response = await axios.get(`${FLASK_API}/api/user/profile`, {
      headers: { Authorization: `Bearer ${req.session.userId}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Error fetching profile'
    });
  }
});

module.exports = router;
