<?php
session_start();

// Visitor Counter
$visitor_count_file = 'data/visitor_count.txt';
$visitor_count = (int)file_get_contents($visitor_count_file);
$visitor_count++;
file_put_contents($visitor_count_file, $visitor_count);
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
  <link rel="stylesheet" href="css/team.css">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Poppins:wght@400;600&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

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
    <a href="#team">Our Team</a>
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

<!-- <section id="features">
  <h2>Why Choose Us?</h2>
  <div class="features">
    <div class="feature-card">Personalized Training</div>
    <div class="feature-card">Expert Coaches</div>
    <div class="feature-card">Community Support</div>
  </div>
</section> -->

<section id="features">
  <h2>Why Choose Fusion FitNet?</h2>
  <div class="features">
    <div class="feature-card">
      <i class="fas fa-dumbbell"></i>
      <h3>Personalized Training</h3>
      <p>Custom workouts and plans designed to match your fitness level and goals.</p>
      <a href="#contact" class="btn">Join Now</a>
    </div>
    <div class="feature-card">
      <i class="fas fa-trophy"></i>
      <h3>Expert Coaches</h3>
      <p>Learn from certified trainers with years of experience in strength and wellness.</p>
      <a href="#contact" class="btn">Meet Our Coaches</a>
    </div>
    <div class="feature-card">
      <i class="fas fa-users"></i>
      <h3>Community Support</h3>
      <p>Join a motivated community that keeps you accountable and inspired every day.</p>
      <a href="#contact" class="btn">Get Started</a>
    </div>
  </div>
</section>
<section id="gallery" class="gallery-section">
  <h2>Our Gallery</h2>
  <p class="section-subtitle">A glimpse of our workouts and transformations.</p>

  <div class="gallery-grid">
    <img src="images/g12.jpeg" loading="lazy" alt="Gallery">
    <img src="images/g7.jpeg" loading="lazy" alt="Gallery">
    <img src="images/g8.jpeg" loading="lazy" alt="Gallery">
    <img src="images/g9.jpeg" loading="lazy" alt="Gallery">
    <img src="images/g10.jpeg" loading="lazy" alt="Gallery">
    <img src="images/g11.jpeg" loading="lazy" alt="Gallery">
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

<section id="team">
  <h2>Our Team</h2>
  <div id="team-grid" class="team-grid"></div>
</section>

<section id="products" class="products-section">
  <h2>Our Premium Products</h2>
  <p class="section-subtitle">
    Discover our range of high-quality nutrition products from Germany, 
    designed to support your fitness and wellness journey.
  </p>
  
  <div class="products-content">
    <div class="products-info">
      <div class="product-highlight">
        <i class="fas fa-certificate"></i>
        <h3>Premium Quality</h3>
        <p>Certified nutrition products from Germany</p>
      </div>
      <div class="product-highlight">
        <i class="fas fa-leaf"></i>
        <h3>Natural Ingredients</h3>
        <p>Made with the finest natural components</p>
      </div>
      <div class="product-highlight">
        <i class="fas fa-shield-alt"></i>
        <h3>Trusted Brand</h3>
        <p>Backed by years of research and excellence</p>
      </div>
    </div>
    
    <div class="products-cta">
      <h3>Ready to Transform Your Health?</h3>
      <p>Explore our complete range of premium nutrition products</p>
      <a href="https://21362102.fitline.com" target="_blank" rel="noopener noreferrer" class="shop-now-btn">
        <i class="fas fa-shopping-bag"></i>
        <span>Shop Now</span>
        <i class="fas fa-arrow-right"></i>
      </a>
      <p class="shop-note">Visit our official online store</p>
    </div>
  </div>
</section>


<section id="contact" class="contact-section">
  <h2>Get in Touch</h2>
  <p class="contact-subtitle">
    Have questions? Want to start your fitness journey?  
    We’d love to hear from you.
  </p>

  <div class="contact-container">

    <!-- Contact Info -->
    <div class="contact-info">
      <div class="info-card">
        <span>📧</span>
        <h3>Email</h3>
        <p>ayanain@fusionfitnet.com</p>
      </div>

      <div class="info-card">
        <span>📞</span>
        <h3>Phone</h3>
        <p>+919147425114</p>
      </div>

      <div class="info-card">
        <span>📍</span>
        <h3>Location</h3>
        <p>India</p>
      </div>
    </div>

    <!-- Contact Form -->
    <div class="contact-form">
      <form action="contact.php" method="POST">
        <div class="form-group">
          <input type="text" name="name" required>
          <label>Your Name</label>
        </div>

        <div class="form-group">
          <input type="email" name="email" required>
          <label>Email Address</label>
        </div>

        <div class="form-group">
          <textarea name="message" rows="5" required></textarea>
          <label>Your Message</label>
        </div>

        <button type="submit" class="btn full">Send Message</button>
      </form>
    </div>

  </div>
</section>

<!-- <div class="sticky-contact">
  <a href="tel:+919147425114" class="call-btn">📞 Call</a>
  <a href="https://wa.me/919147425114" target="_blank" class="wa-btn">💬 WhatsApp</a>
</div> -->

<section class="mobile-cta">
  <h2>Start Your Fitness Journey Today</h2>
  <p>Join Fusion FitNet & transform your body</p>
  <a href="#contact">Join Now</a>
</section>

<!-- <footer>
  © 2025 Fusion FitNet
</footer> -->

<!-- WhatsApp -->
<a class="whatsapp" href="https://wa.me/919147425114" target="_blank">💬</a>

<!-- Dark Mode -->
<div class="toggle" onclick="toggleDarkMode()">🌙</div>

<script src="js/main.js"></script>
<script src="js/team.js"></script>


<footer>
  © 2025 Fusion FitNet | <span class="visitor-counter">Visitors: <?php echo $visitor_count; ?></span>
</footer>


</body>
</html>
