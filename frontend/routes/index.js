const express = require('express');
const router = express.Router();
const axios = require('axios');
const FLASK_API = process.env.FLASK_API || 'http://localhost:5000';

// GET: Index page
router.get('/', async (req, res) => {
  try {
    const visitorCountRes = await axios.get(`${FLASK_API}/api/visitors`);
    const galleryRes = await axios.get(`${FLASK_API}/api/gallery`);
    const eventsRes = await axios.get(`${FLASK_API}/api/events`);
    const teamRes = await axios.get(`${FLASK_API}/api/team`);
    const blogRes = await axios.get(`${FLASK_API}/api/blog`);

    res.render('index', {
      title: 'Fusion FitNet',
      isLoggedIn: !!req.session.userId,
      userName: req.session.userName,
      visitors: visitorCountRes.data.count,
      gallery: galleryRes.data,
      events: eventsRes.data,
      team: teamRes.data,
      blog: blogRes.data
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.render('index', {
      title: 'Fusion FitNet',
      isLoggedIn: !!req.session.userId,
      userName: req.session.userName,
      visitors: 0,
      gallery: [],
      events: [],
      team: [],
      blog: []
    });
  }
});

// GET: Contact page
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us',
    isLoggedIn: !!req.session.userId,
    userName: req.session.userName
  });
});

module.exports = router;
