<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Fusion FitNet | Fitness & Strength Training</title>

  <!-- SEO -->
  <meta name="description" content="Fusion FitNet – Personalized fitness, expert coaches, and transformation programs.">
  <meta name="keywords" content="fitness, gym, personal training, strength, wellness">
  <meta name="author" content="Fusion FitNet">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- CSS -->
  <link rel="stylesheet" href="css/style.css">

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'YOUR_GA_ID');
  </script>
</head>

<body>

<!-- Bottom Navigation (Mobile) -->
<div class="bottom-nav">
  <a href="#features">🏠</a>
  <a href="#gallery">🖼️</a>
  <a href="#events">📅</a>
  <?php if (empty($_SESSION["user_id"])): ?>
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

    <?php if (!empty($_SESSION["user_id"])): ?>
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
  <p class="section-subtitle">A glimpse of our workouts and transformations.</p>

  <div class="gallery-grid">
    <img src="images/g1.jpg" loading="lazy" alt="Fusion FitNet workout session">
    <img src="images/g2.jpg" loading="lazy" alt="Strength training at Fusion FitNet">
    <img src="images/g3.jpg" loading="lazy" alt="Personal training session">
    <img src="images/g4.jpg" loading="lazy" alt="Group fitness class">
    <img src="images/g5.jpg" loading="lazy" alt="Transformation journey">
    <img src="images/g6.jpg" loading="lazy" alt="Fitness community event">
  </div>
</section>

<section id="events" class="events-section">
  <h2>Upcoming Events</h2>

  <div class="events-grid">
    <?php
    $eventsJson = file_get_contents('data/event.json');
    $events = json_decode($eventsJson, true);

    if ($events):
      foreach ($events as $event):
        $date = strtotime($event['date']);
    ?>
    <div class="event-card">
      <span class="event-date"><?php echo strtoupper(date('M d', $date)); ?></span>
      <h3><?php echo htmlspecialchars($event['title']); ?></h3>
      <p><?php echo htmlspecialchars($event['description']); ?></p>
      <a href="#contact" class="btn small">Register</a>
    </div>
    <?php
      endforeach;
    else:
    ?>
    <p>No upcoming events.</p>
    <?php endif; ?>
  </div>
</section>

<!-- PRODUCTS -->
<section id="products">
  <h2>Our Products</h2>

  <div class="product-grid">

    <!-- Protein -->
    <div class="product-card">
      <img src="https://images.unsplash.com/photo-1598266663439-2056e635781a"
           loading="lazy"
           alt="Protein Powder supplement">

      <h3>Protein Powder</h3>
      <p class="price">$49.99</p>

      <?php if (!empty($_SESSION["user_id"])): ?>
        <a href="cart.php?add=protein" class="btn small">Add to Cart</a>
        <a href="cart.php?add=proteina" class="btn small">Buy Now</a>
      <?php else: ?>
        <a href="auth/login.php" class="btn small">Login to Buy</a>
      <?php endif; ?>
    </div>

    <!-- Bands -->
    <div class="product-card">
      <img src="https://images.unsplash.com/photo-1549476464-37392241ea34"
           loading="lazy"
           alt="Resistance bands for workout">

      <h3>Resistance Bands</h3>
      <p class="price">$24.99</p>

      <?php if (!empty($_SESSION["user_id"])): ?>
        <a href="cart.php?add=bands" class="btn small">Add to Cart</a>
        <a href="cart.php?add=bands" class="btn small">Buy Now</a>
      <?php else: ?>
        <a href="auth/login.php" class="btn small">Login to Buy</a>
      <?php endif; ?>
    </div>

    <!-- Yoga Mat -->
    <div class="product-card">
      <img src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba"
           loading="lazy"
           alt="Yoga mat for home workout">

      <h3>Yoga Mat</h3>
      <p class="price">$39.99</p>

      <?php if (!empty($_SESSION["user_id"])): ?>
        <a href="cart.php?add=yoga-mat" class="btn small">Add to Cart</a>
        <a href="cart.php?add=yoga-mat" class="btn small">Buy Now</a>
      <?php else: ?>
        <a href="auth/login.php" class="btn small">Login to Buy</a>
      <?php endif; ?>
    </div>

  </div>
</section>

<footer>
  © 2025 Fusion FitNet
</footer>

<script src="js/main.js"></script>
</body>
</html>
