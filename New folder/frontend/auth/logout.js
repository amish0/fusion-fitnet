const express = require('express');
const router = express.Router();

// Updated logout route to redirect to the index page
router.get('/', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Failed to log out');
    }
    res.redirect('/'); // Redirect to the index page after logout
  });
});

module.exports = router;