const express = require('express');
const router = express.Router();
const axios = require('axios');
const FLASK_API = process.env.FLASK_API || 'http://localhost:5000';

// POST: Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const response = await axios.post(`${FLASK_API}/api/contact/submit`, {
      name,
      email,
      subject,
      message
    });

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Error sending message'
    });
  }
});

module.exports = router;
