const express = require('express');
const router = express.Router();
const axios = require('axios');
const FLASK_API = process.env.FLASK_API || 'http://localhost:5000';

// GET: Index page
router.get('/', async (req, res) => {
  try {
    const visitorCountRes = await axios.get(`${FLASK_API}/api/visitors`);
    const galleryRes = await axios.get(`${FLASK_API}/api/gallery/featured`);
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

// GET: Gallery page
router.get('/gallery', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const galleryRes = await axios.get(`${FLASK_API}/api/gallery?page=${page}`);
    const galleryData = galleryRes.data;
    
    res.render('gallery', {
      title: 'Photo Gallery',
      isLoggedIn: !!req.session.userId,
      userName: req.session.userName,
      gallery: galleryData.items || galleryData,
      currentPage: galleryData.page || 1,
      totalPages: galleryData.total_pages || 1,
      total: galleryData.total || 0
    });
  } catch (error) {
    console.error('Error fetching gallery:', error.message);
    res.render('gallery', {
      title: 'Photo Gallery',
      isLoggedIn: !!req.session.userId,
      userName: req.session.userName,
      gallery: [],
      currentPage: 1,
      totalPages: 1,
      total: 0
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
