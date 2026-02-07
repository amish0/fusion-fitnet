<?php
session_start();

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST["message"]);
    $phone = htmlspecialchars($_POST["phone"] ?? '');

    $to = "ayanain@fusionfitnet.com";
    $subject = "New Contact Form Message from $name";
    $body = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";
    $headers = "From: $email\r\nReply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        $success_message = "Thank you! Your message has been sent successfully.";
    } else {
        $error_message = "Sorry, there was an error sending your message. Please try again.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Contact Us - Fusion FitNet</title>

  <!-- SEO -->
  <meta name="description" content="Get in touch with Fusion FitNet - Your fitness transformation partner">
  <meta name="keywords" content="contact, fitness gym, personal training, contact us">
  <meta name="author" content="Fusion FitNet">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- CSS -->
  <link rel="stylesheet" href="css/style.css?v=<?php echo time(); ?>">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

  <style>
    .contact-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #e8f0fe 25%, #fef3f0 50%, #f0f4ff 100%);
      position: relative;
      overflow: hidden;
    }

    body.dark .contact-page {
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    }

    .contact-hero {
      background: linear-gradient(135deg, #ff5e14 0%, #ff9c42 100%);
      color: white;
      padding: 100px 20px 80px;
      text-align: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(255, 94, 20, 0.3);
    }

    .contact-hero::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
      animation: rotate 20s linear infinite;
    }

    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .contact-hero h1 {
      font-size: 3.5em;
      margin-bottom: 20px;
      position: relative;
      z-index: 1;
      font-weight: 900;
      letter-spacing: -1px;
      text-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
    }

    .contact-hero p {
      font-size: 1.3em;
      opacity: 0.95;
      max-width: 700px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
      line-height: 1.7;
    }

    .contact-content {
      max-width: 1300px;
      margin: -60px auto 80px;
      padding: 0 20px;
      position: relative;
      z-index: 2;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 40px;
      margin-bottom: 60px;
    }

    .contact-info-sidebar {
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      padding: 50px 40px;
      border-radius: 30px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
      border: 2px solid rgba(255, 94, 20, 0.1);
      height: fit-content;
    }

    body.dark .contact-info-sidebar {
      background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
      border-color: rgba(255, 94, 20, 0.2);
    }

    .contact-info-sidebar h3 {
      font-size: 2em;
      margin-bottom: 30px;
      color: #1a1a1a;
      font-weight: 800;
    }

    body.dark .contact-info-sidebar h3 {
      color: #ffffff;
    }

    .contact-info-item {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 30px;
      padding: 20px;
      background: rgba(255, 94, 20, 0.05);
      border-radius: 15px;
      transition: all 0.3s ease;
    }

    .contact-info-item:hover {
      background: rgba(255, 94, 20, 0.1);
      transform: translateX(5px);
    }

    .contact-info-item i {
      font-size: 2em;
      background: linear-gradient(135deg, #ff5e14, #ff9c42);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      width: 50px;
      flex-shrink: 0;
    }

    .contact-info-item-content h4 {
      font-size: 1.2em;
      margin-bottom: 5px;
      color: #1a1a1a;
      font-weight: 700;
    }

    .contact-info-item-content p {
      color: #666;
      line-height: 1.6;
    }

    .contact-info-item-content a {
      color: #ff5e14;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .contact-info-item-content a:hover {
      color: #ff9c42;
    }

    body.dark .contact-info-item-content h4 {
      color: #ffffff;
    }

    body.dark .contact-info-item-content p {
      color: #cccccc;
    }

    .contact-form-container {
      background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
      padding: 50px;
      border-radius: 30px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
      border: 2px solid rgba(255, 94, 20, 0.1);
    }

    body.dark .contact-form-container {
      background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
      border-color: rgba(255, 94, 20, 0.2);
    }

    .contact-form-container h3 {
      font-size: 2em;
      margin-bottom: 30px;
      color: #1a1a1a;
      font-weight: 800;
    }

    body.dark .contact-form-container h3 {
      color: #ffffff;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-field {
      margin-bottom: 25px;
    }

    .form-field label {
      display: block;
      margin-bottom: 8px;
      color: #333;
      font-weight: 600;
      font-size: 0.95em;
    }

    body.dark .form-field label {
      color: #e0e0e0;
    }

    .form-field input,
    .form-field textarea {
      width: 100%;
      padding: 15px 20px;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      font-size: 1em;
      transition: all 0.3s ease;
      background: #f8f9fa;
      font-family: 'Poppins', sans-serif;
    }

    body.dark .form-field input,
    body.dark .form-field textarea {
      background: #2a2a2a;
      border-color: #444;
      color: #fff;
    }

    .form-field input:focus,
    .form-field textarea:focus {
      outline: none;
      border-color: #ff5e14;
      background: white;
      box-shadow: 0 4px 15px rgba(255, 94, 20, 0.15);
      transform: translateY(-2px);
    }

    body.dark .form-field input:focus,
    body.dark .form-field textarea:focus {
      background: #333;
      border-color: #ff5e14;
    }

    .form-field textarea {
      resize: vertical;
      min-height: 150px;
    }

    .submit-btn {
      width: 100%;
      padding: 18px;
      background: linear-gradient(135deg, #ff5e14 0%, #ff9c42 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1.2em;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 8px 20px rgba(255, 94, 20, 0.3);
      position: relative;
      overflow: hidden;
    }

    .submit-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.6s ease;
    }

    .submit-btn:hover::before {
      left: 100%;
    }

    .submit-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 30px rgba(255, 94, 20, 0.4);
      background: linear-gradient(135deg, #ff9c42 0%, #ff5e14 100%);
    }

    .submit-btn:active {
      transform: translateY(-1px);
    }

    .success-message {
      background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
      color: white;
      padding: 20px 30px;
      border-radius: 15px;
      margin-bottom: 30px;
      text-align: center;
      font-weight: 600;
      box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
      animation: slideDown 0.5s ease;
    }

    .error-message {
      background: linear-gradient(135deg, #f44336 0%, #da190b 100%);
      color: white;
      padding: 20px 30px;
      border-radius: 15px;
      margin-bottom: 30px;
      text-align: center;
      font-weight: 600;
      box-shadow: 0 8px 25px rgba(244, 67, 54, 0.3);
      animation: slideDown 0.5s ease;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .map-container {
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      padding: 50px;
      border-radius: 30px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
      border: 2px solid rgba(255, 94, 20, 0.1);
      text-align: center;
    }

    body.dark .map-container {
      background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
      border-color: rgba(255, 94, 20, 0.2);
    }

    .map-container h3 {
      font-size: 2em;
      margin-bottom: 20px;
      color: #1a1a1a;
      font-weight: 800;
    }

    body.dark .map-container h3 {
      color: #ffffff;
    }

    .map-container p {
      color: #666;
      margin-bottom: 30px;
      font-size: 1.1em;
    }

    body.dark .map-container p {
      color: #cccccc;
    }

    @media (max-width: 968px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }

      .contact-hero h1 {
        font-size: 2.5em;
      }

      .contact-form-container,
      .contact-info-sidebar,
      .map-container {
        padding: 40px 30px;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .contact-hero {
        padding: 60px 20px 50px;
      }

      .contact-hero h1 {
        font-size: 2em;
      }

      .contact-hero p {
        font-size: 1.1em;
      }

      .contact-content {
        margin: -40px auto 60px;
      }
      
      .contact-info-sidebar,
      .contact-form-container {
        padding: 35px 25px;
      }
      
      .info-card i {
        font-size: 2em;
      }
    }
    
    @media (max-width: 480px) {
      .contact-hero {
        padding: 50px 15px 40px;
      }
      
      .contact-hero h1 {
        font-size: 1.7em;
      }
      
      .contact-hero p {
        font-size: 1em;
      }
      
      .contact-content {
        margin: -30px 10px 50px;
      }
      
      .contact-info-sidebar,
      .contact-form-container {
        padding: 30px 20px;
      }
      
      .sidebar-title {
        font-size: 1.3em;
      }
      
      .info-card {
        padding: 18px;
      }
      
      .info-card i {
        font-size: 1.8em;
        min-width: 45px;
      }
      
      .info-card h4 {
        font-size: 1em;
        margin-bottom: 4px;
      }
      
      .info-card p,
      .info-card a {
        font-size: 0.9em;
      }
      
      .form-title {
        font-size: 1.5em;
      }
      
      .form-group label {
        font-size: 0.95em;
      }
      
      .form-group input,
      .form-group textarea {
        padding: 12px 15px;
        font-size: 0.95em;
      }
      
      .submit-btn {
        padding: 14px 30px;
        font-size: 0.95em;
        min-height: 48px;
      }
      
      .map-container {
        padding: 30px 20px;
      }
      
      .map-placeholder i {
        font-size: 3em;
      }
    }
  </style>
</head>

<body>

<div class="contact-page">
  <header>
    <h1>Fusion FitNet</h1>
    <p class="tagline">Fitness • Strength • Transformation</p>
  </header>

  <nav class="navbar">
    <div class="logo">Fusion FitNet</div>
    <div class="menu-toggle" onclick="toggleMenu()">☰</div>

    <div class="nav-links" id="navLinks">
      <a href="index.php">Home</a>
      <a href="index.php#features">Features</a>
      <a href="index.php#gallery">Gallery</a>
      <a href="index.php#events">Events</a>
      <a href="index.php#team">Our Team</a>
      <a href="index.php#products">Products</a>
      <a href="contact-page.php" class="active">Contact</a>

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

  <div class="contact-hero">
    <h1>Get in Touch</h1>
    <p>Have questions? Want to start your fitness journey? We'd love to hear from you. Reach out and let's transform your life together.</p>
  </div>

  <div class="contact-content">
    <?php if (isset($success_message)): ?>
      <div class="success-message">
        <i class="fas fa-check-circle"></i> <?php echo $success_message; ?>
      </div>
    <?php endif; ?>

    <?php if (isset($error_message)): ?>
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i> <?php echo $error_message; ?>
      </div>
    <?php endif; ?>

    <div class="contact-grid">
      <!-- Contact Information Sidebar -->
      <div class="contact-info-sidebar">
        <h3>Contact Information</h3>
        
        <div class="contact-info-item">
          <i class="fas fa-envelope"></i>
          <div class="contact-info-item-content">
            <h4>Email Us</h4>
            <p><a href="mailto:ayanain@fusionfitnet.com">ayanain@fusionfitnet.com</a></p>
          </div>
        </div>

        <div class="contact-info-item">
          <i class="fas fa-phone-alt"></i>
          <div class="contact-info-item-content">
            <h4>Call Us</h4>
            <p><a href="tel:+919147425114">+91 91474 25114</a></p>
          </div>
        </div>

        <div class="contact-info-item">
          <i class="fas fa-map-marker-alt"></i>
          <div class="contact-info-item-content">
            <h4>Visit Us</h4>
            <p>India</p>
          </div>
        </div>

        <div class="contact-info-item">
          <i class="fas fa-clock"></i>
          <div class="contact-info-item-content">
            <h4>Business Hours</h4>
            <p>Monday - Saturday<br>6:00 AM - 10:00 PM</p>
          </div>
        </div>

        <div class="contact-info-item">
          <i class="fab fa-whatsapp"></i>
          <div class="contact-info-item-content">
            <h4>WhatsApp</h4>
            <p><a href="https://wa.me/919147425114" target="_blank">Chat with us instantly</a></p>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="contact-form-container">
        <h3>Send Us a Message</h3>
        <form method="POST" action="">
          <div class="form-row">
            <div class="form-field">
              <label for="name">Your Name *</label>
              <input type="text" id="name" name="name" required placeholder="your name">
            </div>
            <div class="form-field">
              <label for="email">Email Address *</label>
              <input type="email" id="email" name="email" required placeholder="xx@xxxx.com">
            </div>
          </div>

          <div class="form-field">
            <label for="phone">Phone Number (Optional)</label>
            <input type="tel" id="phone" name="phone" placeholder="+91 xxxxxxxxxx">
          </div>

          <div class="form-field">
            <label for="message">Your Message *</label>
            <textarea id="message" name="message" required placeholder="Tell us how we can help you..."></textarea>
          </div>

          <button type="submit" class="submit-btn">
            <i class="fas fa-paper-plane"></i> Send Message
          </button>
        </form>
      </div>
    </div>

    <!-- Map Section -->
    <div class="map-container">
      <h3>Find Us</h3>
      <p>We're located in the heart of India, ready to help you achieve your fitness goals.</p>
      <i class="fas fa-map-marked-alt" style="font-size: 5em; color: #ff5e14; margin-top: 20px;"></i>
    </div>
  </div>
</div>

<!-- WhatsApp -->
<a class="whatsapp" href="https://wa.me/919147425114" target="_blank">💬</a>

<!-- Dark Mode -->
<div class="toggle" onclick="toggleDarkMode()">🌙</div>

<footer>
  <div class="footer-content">
    <div class="footer-section">
      <h3>Fusion FitNet</h3>
      <p>Your partner in fitness transformation. Building stronger, healthier lives through expert coaching and premium nutrition.</p>
      <div class="social-links">
        <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
        <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
      </div>
    </div>
    
    <div class="footer-section">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="index.php">Home</a></li>
        <li><a href="index.php#features">Features</a></li>
        <li><a href="index.php#gallery">Gallery</a></li>
        <li><a href="index.php#events">Events</a></li>
      </ul>
    </div>
    
    <div class="footer-section">
      <h4>Our Team</h4>
      <ul>
        <li><a href="index.php#team">Meet Our Team</a></li>
        <li><a href="index.php#products">Products</a></li>
        <li><a href="cart.php">Shopping Cart</a></li>
        <li><a href="dashboard.php">My Account</a></li>
      </ul>
    </div>
    
    <div class="footer-section">
      <h4>Contact Us</h4>
      <ul>
        <li><a href="contact-page.php">Get in Touch</a></li>
        <li><a href="mailto:ayanain@fusionfitnet.com"><i class="fas fa-envelope"></i> ayanain@fusionfitnet.com</a></li>
        <li><a href="tel:+919147425114"><i class="fas fa-phone"></i> +91 91474 25114</a></li>
        <li><i class="fas fa-map-marker-alt"></i> India</li>
      </ul>
    </div>
  </div>
  
  <div class="footer-bottom">
    <p>&copy; <?php echo date('Y'); ?> Fusion FitNet. All rights reserved.</p>
  </div>
</footer>

<script src="js/main.js?v=<?php echo time(); ?>"></script>

</body>
</html>
