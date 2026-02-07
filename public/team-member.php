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
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/team.css">

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

<!-- Team Member Detail Section -->
<section class="team-member-detail">
    <div class="profile-hero">
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <div class="back-button-container">
                <a href="index.php#team" class="back-button">
                    <i class="fas fa-arrow-left"></i> Back to Team
                </a>
            </div>
            
            <div class="profile-header">
                <div class="profile-image-wrapper">
                    <div class="profile-image-border">
                        <img src="<?php echo htmlspecialchars($member['image']); ?>" alt="<?php echo htmlspecialchars($member['name']); ?>" class="profile-image">
                    </div>
                    <div class="image-decoration"></div>
                </div>
                
                <div class="profile-info">
                    <div class="profile-badge">
                        <i class="fas fa-certificate"></i> Senior Leadership
                    </div>
                    <h1 class="profile-name"><?php echo htmlspecialchars($member['name']); ?></h1>
                    <p class="profile-role"><?php echo htmlspecialchars($member['role']); ?></p>
                    <div class="profile-company">
                        <i class="fas fa-building"></i>
                        <span>FusionFitNet</span>
                        <span class="separator">|</span>
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Asia Pacific Region</span>
                    </div>
                    
                    <div class="profile-stats">
                        <div class="stat-item">
                            <div class="stat-number"><?php 
                                // Extract years of experience from bio
                                preg_match('/(\d+) years/', $member['bio'], $matches);
                                echo isset($matches[1]) ? $matches[1] . '+' : '10+';
                            ?></div>
                            <div class="stat-label">Years Experience</div>
                        </div>
                        <div class="stat-divider"></div>
                        <div class="stat-item">
                            <div class="stat-number"><?php echo isset($member['expertise']) ? count($member['expertise']) : '6'; ?>+</div>
                            <div class="stat-label">Expertise Areas</div>
                        </div>
                        <div class="stat-divider"></div>
                        <div class="stat-item">
                            <div class="stat-number"><?php echo isset($member['experience']) ? count($member['experience']) : '5'; ?>+</div>
                            <div class="stat-label">Key Companies</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="profile-content-wrapper">
        <!-- Quick Info Cards -->
        <div class="quick-info-section">
            <div class="info-card">
                <div class="info-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="info-content">
                    <h4>Industry Leader</h4>
                    <p>Driving excellence in nutraceutical sector</p>
                </div>
            </div>
            <div class="info-card">
                <div class="info-icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="info-content">
                    <h4>Team Builder</h4>
                    <p>Expert in training & development</p>
                </div>
            </div>
            <div class="info-card">
                <div class="info-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="info-content">
                    <h4>Growth Strategist</h4>
                    <p>Proven track record in market expansion</p>
                </div>
            </div>
        </div>

        <div class="profile-main-content">
            <!-- About Section -->
            <div class="content-section about-section">
                <div class="section-header">
                    <div class="header-line"></div>
                    <h2><i class="fas fa-user-circle"></i> Professional Overview</h2>
                </div>
                <div class="bio-content">
                    <?php 
                    $bioParagraphs = explode('. ', $member['bio']);
                    $currentParagraph = '';
                    $sentenceCount = 0;
                    
                    foreach ($bioParagraphs as $sentence) {
                        if (!empty(trim($sentence))) {
                            $currentParagraph .= trim($sentence) . '. ';
                            $sentenceCount++;
                            
                            if ($sentenceCount >= 3) {
                                echo '<p class="bio-paragraph">' . htmlspecialchars($currentParagraph) . '</p>';
                                $currentParagraph = '';
                                $sentenceCount = 0;
                            }
                        }
                    }
                    
                    if (!empty(trim($currentParagraph))) {
                        echo '<p class="bio-paragraph">' . htmlspecialchars($currentParagraph) . '</p>';
                    }
                    ?>
                </div>
            </div>

            <div class="two-column-layout">
                <!-- Experience Section -->
                <?php if (isset($member['experience'])): ?>
                <div class="content-section experience-section">
                    <div class="section-header">
                        <div class="header-line"></div>
                        <h2><i class="fas fa-briefcase"></i> Career Journey</h2>
                    </div>
                    <div class="experience-timeline">
                        <?php foreach ($member['experience'] as $index => $exp): ?>
                        <div class="timeline-item" style="animation-delay: <?php echo $index * 0.1; ?>s">
                            <div class="timeline-marker">
                                <div class="marker-dot"></div>
                                <div class="marker-line"></div>
                            </div>
                            <div class="timeline-content">
                                <div class="timeline-icon">
                                    <i class="fas fa-building"></i>
                                </div>
                                <p><?php echo htmlspecialchars($exp); ?></p>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
                <?php endif; ?>

                <!-- Expertise Section -->
                <?php if (isset($member['expertise'])): ?>
                <div class="content-section expertise-section">
                    <div class="section-header">
                        <div class="header-line"></div>
                        <h2><i class="fas fa-star"></i> Core Competencies</h2>
                    </div>
                    <div class="expertise-grid">
                        <?php foreach ($member['expertise'] as $index => $skill): ?>
                        <div class="expertise-item" style="animation-delay: <?php echo $index * 0.05; ?>s">
                            <div class="expertise-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <span><?php echo htmlspecialchars($skill); ?></span>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
                <?php endif; ?>
            </div>

            <!-- Call to Action -->
            <div class="cta-section">
                <div class="cta-content">
                    <div class="cta-icon">
                        <i class="fas fa-handshake"></i>
                    </div>
                    <div class="cta-text">
                        <h3>Let's Connect</h3>
                        <p>Interested in discussing business opportunities or learning more about FusionFitNet?</p>
                    </div>
                    <a href="index.php#contact" class="cta-button">
                        <span>Get in Touch</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<footer>
  <p>&copy; <?php echo date('Y'); ?> Fusion FitNet. All Rights Reserved.</p>
  <p>Visitor count: <?php echo isset($visitor_count) ? $visitor_count : '0'; ?></p>
</footer>

<script src="js/main.js"></script>

</body>
</html>
