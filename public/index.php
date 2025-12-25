<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Fusion FitNet | Fitness & Strength Training</title>
  <meta name="description" content="Fusion FitNet – Personalized fitness, expert coaches, and transformation programs.">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO -->
  <meta name="keywords" content="fitness, gym, personal training, strength, wellness">
  <meta name="author" content="Fusion FitNet">

  <!-- CSS -->
  <link rel="stylesheet" href="css/style.css">

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>

<body>

<!-- Bottom Navigation (Mobile) -->
<div class="bottom-nav">
  <a href="#features">🏠</a>
  <a href="#gallery">🖼️</a>
  <a href="#events">📅</a>
  <?php if (!isset($_SESSION["user_id"])): ?>
    <a href="auth/login.php">🔐</a>
  <?php else: ?>
    <a href="dashboard.php">👤</a>
  <?php endif; ?>
</div>

<header>
  <h1>Fusion FitNet</h1>
  <p class="tagline">Fitness • Strength • Transformation</p>
</header>

<nav class="navbar">
  <div class="logo">Fusion FitNet</div>
  <div class="menu-toggle" onclick="toggleMenu()">☰</div>

  <div class="nav-links" id="navLinks">
    <a href="#features">Features</a>
    <a href="#gallery">Gallery</a>
    <a href="#events">Events</a>
    <a href="#products">Products</a>
    <a href="#contact">Contact</a>

    <?php if (isset($_SESSION["user_id"])): ?>
      <a href="cart.php">🛒 Cart</a>
      <a href="dashboard.php" class="btn-login">My Account</a>
      <a href="auth/logout.php" class="btn-signup">Logout</a>
    <?php else: ?>
      <a href="auth/login.php" class="btn-login">Login</a>
      <a href="auth/signup.php" class="btn-signup">Sign Up</a>
    <?php endif; ?>
  </div>
</nav>

<section id="features">
  <h2>Why Choose Us?</h2>
  <div class="features">
    <div class="feature-card">Personalized Training</div>
    <div class="feature-card">Expert Coaches</div>
    <div class="feature-card">Community Support</div>
  </div>
</section>

<section id="gallery" class="gallery-section">
  <h2>Our Gallery</h2>
  <p class="section-subtitle">A glimpse of our workouts, transformations, and energy.</p>
  <div class="gallery-grid">
    <img src="images/g1.jpg" alt="">
    <img src="images/g2.jpg" alt="">
    <img src="images/g3.jpg" alt="">
    <img src="images/g4.jpg" alt="">
    <img src="images/g5.jpg" alt="">
    <img src="images/g6.jpg" alt="">
  </div>
</section>

<section id="events" class="events-section">
  <h2>Upcoming Events</h2>
  <div class="events-grid">
    <div class="event-card">
      <span class="event-date">JUL 20</span>
      <h3>Summer Fitness Bootcamp</h3>
      <p>High-intensity outdoor training.</p>
      <a href="#contact" class="btn small">Register</a>
    </div>
    <div class="event-card">
      <span class="event-date">AUG 05</span>
      <h3>Nutrition Workshop</h3>
      <p>Clean eating & wellness.</p>
      <a href="#contact" class="btn small">Register</a>
    </div>
  </div>
</section>

<!-- PRODUCTS -->
<section id="products">
  <h2>Our Products</h2>
  <div class="product-grid">

    <!-- Protein -->
    <div class="product-card">
      <img src="https://images.unsplash.com/photo-1598266663439-2056e635781a" alt="Protein Powder">
      <h3>Protein Powder</h3>
      <p class="price">$49.99</p>

      <?php if (isset($_SESSION["user_id"])): ?>
        <a href="cart.php?add=protein" class="btn small">Add to Cart</a>
        <a href="checkout.php?product=protein" class="btn small">Buy Now</a>
      <?php else: ?>
        <a href="auth/login.php" class="btn small">Login to Buy</a>
      <?php endif; ?>
    </div>

    <!-- Bands -->
    <div class="product-card">
      <img src="https://images.unsplash.com/photo-1549476464-37392241ea34" alt="Resistance Bands">
      <h3>Resistance Bands</h3>
      <p class="price">$24.99</p>

      <?php if (isset($_SESSION["user_id"])): ?>
        <a href="cart.php?add=bands" class="btn small">Add to Cart</a>
        <a href="checkout.php?product=bands" class="btn small">Buy Now</a>
      <?php else: ?>
        <a href="auth/login.php" class="btn small">Login to Buy</a>
      <?php endif; ?>
    </div>

    <!-- Yoga Mat -->
    <div class="product-card">
      <img src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba" alt="Yoga Mat">
      <h3>Yoga Mat</h3>
      <p class="price">$39.99</p>

      <?php if (isset($_SESSION["user_id"])): ?>
        <a href="cart.php?add=mat" class="btn small">Add to Cart</a>
        <a href="checkout.php?product=mat" class="btn small">Buy Now</a>
      <?php else: ?>
        <a href="auth/login.php" class="btn small">Login to Buy</a>
      <?php endif; ?>
    </div>

  </div>
</section>

<footer>© 2025 Fusion FitNet</footer>

<script src="js/main.js"></script>
</body>
</html>
