const express = require('express');
const router = express.Router();
const axios = require('axios');
const FLASK_API = process.env.FLASK_API || 'http://localhost:5000';

// GET: Login page
router.get('/login', (req, res) => {
  res.render('auth/login', { 
    title: 'Login - Fusion FitNet',
    error: req.query.error || null 
  });
});

// POST: Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('auth/login', {
        title: 'Login - Fusion FitNet',
        error: 'Email and password are required'
      });
    }

    const response = await axios.post(`${FLASK_API}/api/auth/login`, {
      email,
      password
    });

    // Store user info in session
    req.session.userId = response.data.user_id;
    req.session.userName = response.data.name;
    req.session.userEmail = response.data.email;
    req.session.isAdmin = response.data.is_admin || false;

    // Redirect admin users to admin dashboard
    if (response.data.is_admin) {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/dashboard');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Invalid email or password';
    res.render('auth/login', {
      title: 'Login - Fusion FitNet',
      error: errorMessage
    });
  }
});

// GET: Signup page
router.get('/signup', (req, res) => {
  res.render('auth/signup', {
    title: 'Sign Up - Fusion FitNet',
    error: null
  });
});

// POST: Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.render('auth/signup', {
        title: 'Sign Up - Fusion FitNet',
        error: 'All fields are required'
      });
    }

    if (password !== confirmPassword) {
      return res.render('auth/signup', {
        title: 'Sign Up - Fusion FitNet',
        error: 'Passwords do not match'
      });
    }

    const response = await axios.post(`${FLASK_API}/api/auth/signup`, {
      name,
      email,
      password
    });

    // Store user info in session
    req.session.userId = response.data.user_id;
    req.session.userName = response.data.name;
    req.session.userEmail = response.data.email;
    req.session.isAdmin = response.data.is_admin || false;

    // Redirect admin users to admin dashboard
    if (response.data.is_admin) {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/dashboard');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occurred during signup';
    res.render('auth/signup', {
      title: 'Sign Up - Fusion FitNet',
      error: errorMessage
    });
  }
});

// GET: Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error('Session destroy error:', err);
    res.redirect('/');
  });
});

module.exports = router;
