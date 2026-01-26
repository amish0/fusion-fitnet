const express = require('express');
const router = express.Router();
const axios = require('axios');
const FLASK_API = process.env.FLASK_API || 'http://localhost:5000';

// Middleware to check if user is admin
function isAdmin(req, res, next) {
  const isAdmin = req.session.isAdmin === true;
  
  if (!isAdmin) {
    return res.status(403).redirect('/');
  }
  
  next();
}

// Admin Dashboard Page
router.get('/dashboard', isAdmin, (req, res) => {
  res.render('admin-dashboard', {
    title: 'Admin Dashboard',
    userId: req.session.userId,
    userName: req.session.userName,
    userEmail: req.session.userEmail,
    isAdmin: req.session.isAdmin
  });
});

// Site Settings Page
router.get('/settings', isAdmin, (req, res) => {
  res.render('settings', {
    title: 'Site Settings',
    userId: req.session.userId,
    userName: req.session.userName,
    userEmail: req.session.userEmail,
    isAdmin: req.session.isAdmin
  });
});

// API Proxy: PUT /admin/settings
router.put('/settings', isAdmin, async (req, res) => {
  try {
    console.log('Admin settings update request:', req.body);
    const response = await axios.put(
      `${FLASK_API}/api/admin/settings`,
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': req.headers.authorization || '',
          'X-User-ID': req.session.userId || ''
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error updating settings:', error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Error updating settings'
    });
  }
});

module.exports = router;
