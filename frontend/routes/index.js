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
    const productsRes = await axios.get(`${FLASK_API}/api/products/featured`);
    const settingsRes = await axios.get(`${FLASK_API}/api/settings`);

    res.render('index', {
      title: 'Fusion FitNet',
      isLoggedIn: !!req.session.userId,
      userName: req.session.userName,
      visitors: visitorCountRes.data.count,
      gallery: galleryRes.data,
      events: eventsRes.data,
      team: teamRes.data,
      blog: blogRes.data,
      products: productsRes.data,
      settings: settingsRes.data || {}
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
      blog: [],
      products: [],
      settings: {}
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

// GET: Team page
router.get('/team', async (req, res) => {
  try {
    const teamRes = await axios.get(`${FLASK_API}/api/team`);
    res.render('team', {
      title: 'Our Team',
      isLoggedIn: !!req.session.userId,
      userName: req.session.userName,
      team: teamRes.data
    });
  } catch (error) {
    console.error('Error fetching team:', error.message);
    res.render('team', {
      title: 'Our Team',
      isLoggedIn: !!req.session.userId,
      userName: req.session.userName,
      team: []
    });
  }
});

// GET: Products page
router.get('/products', async (req, res) => {
  try {
    const productsRes = await axios.get(`${FLASK_API}/api/products`);
    res.render('products', {
      title: 'Our Products',
      isLoggedIn: !!req.session.userId,
      userName: req.session.userName,
      products: productsRes.data
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.render('products', {
      title: 'Our Products',
      isLoggedIn: !!req.session.userId,
      userName: req.session.userName,
      products: []
    });
  }
});

// GET: Product detail page
router.get('/products/:id', async (req, res) => {
  try {
    const productRes = await axios.get(`${FLASK_API}/api/products/${req.params.id}`);
    res.render('product-detail', {
      title: productRes.data.name,
      isLoggedIn: !!req.session.userId,
      userName: req.session.userName,
      product: productRes.data
    });
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.redirect('/products');
  }
});

// API Proxy routes for client-side JavaScript
router.get('/api/events', async (req, res) => {
  try {
    const response = await axios.get(`${FLASK_API}/api/events`);
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying events:', error.message);
    res.status(500).json([]);
  }
});

router.get('/api/settings', async (req, res) => {
  try {
    const response = await axios.get(`${FLASK_API}/api/settings`);
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying settings:', error.message);
    res.status(500).json({});
  }
});

module.exports = router;
