const express = require('express');
const router = express.Router();

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

module.exports = router;
