<?php
session_start();

// Get team member ID from URL
$memberId = isset($_GET['id']) ? $_GET['id'] : null;

if (!$memberId) {
    header('Location: index.php#team');
    exit();
}

// Load team data
$teamData = json_decode(file_get_contents('data/team.json'), true);
$member = null;

// Find the specific team member
foreach ($teamData as $m) {
    if ($m['id'] === $memberId) {
        $member = $m;
        break;
    }
}

// If member not found, redirect
if (!$member) {
    header('Location: index.php#team');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title><?php echo htmlspecialchars($member['name']); ?> | Fusion FitNet Team</title>

  <!-- SEO -->
  <meta name="description" content="<?php echo htmlspecialchars(substr($member['bio'], 0, 150)); ?>...">
  <meta name="keywords" content="fitness, team, <?php echo htmlspecialchars($member['name']); ?>, <?php echo htmlspecialchars($member['role']); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- CSS -->
  <link rel="stylesheet" href="css/style.css?v=<?php echo time(); ?>">
  <link rel="stylesheet" href="css/team.css?v=<?php echo time(); ?>">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>

<body>

<header>
  <h1>Fusion FitNet</h1>
  <p class="tagline">Fitness • Strength • Transformation</p>
</header>

<nav>
  <a href="index.php">Home</a>
  <a href="index.php#about">About</a>
  <a href="index.php#services">Services</a>
  <a href="index.php#gallery">Gallery</a>
  <a href="index.php#blog">Blog</a>
  <a href="index.php#events">Events</a>
  <a href="index.php#team">Our Team</a>
  <a href="index.php#contact">Contact</a>
  <?php if (isset($_SESSION['user_id'])): ?>
    <a href="dashboard.php">Dashboard</a>
  <?php else: ?>
    <a href="auth/login.php">Login</a>
  <?php endif; ?>
</nav>

<!-- Team Member Profile Section -->
<section class="team-profile-page">
    <div class="profile-container">
        <!-- Back Button -->
        <div class="back-nav">
            <a href="index.php#team" class="back-link">
                <i class="fas fa-arrow-left"></i> Back to Team
            </a>
        </div>

        <!-- Profile Card -->
        <div class="profile-card">
            <!-- Profile Image - Left Aligned -->
            <div class="profile-image-section">
                <img src="<?php echo htmlspecialchars($member['image']); ?>" alt="<?php echo htmlspecialchars($member['name']); ?>" class="member-photo">
            </div>

            <!-- Profile Content - Right Aligned -->
            <div class="profile-content-section">
                <!-- Section 1: Basic Details -->
                <div class="basic-details-section">
                    <h1 class="member-name"><?php echo htmlspecialchars($member['name']); ?></h1>
                    <p class="member-designation"><?php echo htmlspecialchars($member['role']); ?></p>
                    <div class="contact-info">
                        <div class="info-item">
                            <i class="fas fa-envelope"></i>
                            <a href="index.php#contact">contact@fusionfitnet.com</a>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-building"></i>
                            <span>FusionFitNet</span>
                        </div>
                    </div>
                </div>

                <!-- Section 2: Introduction -->
                <div class="introduction-section">
                    <h2 class="section-title">Introduction</h2>
                    <div class="section-content">
                        <p><?php echo htmlspecialchars($member['bio']); ?></p>
                        <div class="product-link-section">
                            <a href="https://21362102.fitline.com" target="_blank" rel="noopener noreferrer" class="buy-product-btn">
                                <i class="fas fa-shopping-cart"></i>
                                <span>Shop Our Premium Products</span>
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Section 3: Experience -->
                <?php if (isset($member['experience']) && !empty($member['experience'])): ?>
                <div class="experience-section">
                    <h2 class="section-title">Experience</h2>
                    <div class="section-content">
                        <ul class="experience-list">
                            <?php foreach ($member['experience'] as $exp): ?>
                                <li><?php echo htmlspecialchars($exp); ?></li>
                            <?php endforeach; ?>
                        </ul>
                        
                        <?php if (isset($member['expertise']) && !empty($member['expertise'])): ?>
                        <div class="expertise-tags">
                            <h3>Key Expertise:</h3>
                            <div class="tags-container">
                                <?php foreach ($member['expertise'] as $skill): ?>
                                    <span class="skill-tag"><?php echo htmlspecialchars($skill); ?></span>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>

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
