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
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Poppins:wght@400;600&display=swap" rel="stylesheet">

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
    <div class="back-button-container">
        <a href="index.php#team" class="back-button">
            <i class="fas fa-arrow-left"></i> Back to Team
        </a>
    </div>

    <div class="member-detail-card">
        <div class="member-detail-header">
            <div class="member-detail-image">
                <img src="<?php echo htmlspecialchars($member['image']); ?>" alt="<?php echo htmlspecialchars($member['name']); ?>">
            </div>
            <div class="member-detail-info">
                <h1><?php echo htmlspecialchars($member['name']); ?></h1>
                <p class="member-detail-role"><?php echo htmlspecialchars($member['role']); ?></p>
                <div class="member-detail-company">
                    <i class="fas fa-building"></i> FusionFitNet
                </div>
            </div>
        </div>

        <div class="member-detail-body">
            <h2><i class="fas fa-user-tie"></i> Professional Biography</h2>
            <div class="bio-content">
                <?php 
                // Split bio into paragraphs for better readability
                $bioParagraphs = explode('. ', $member['bio']);
                $currentParagraph = '';
                $sentenceCount = 0;
                
                foreach ($bioParagraphs as $sentence) {
                    if (!empty(trim($sentence))) {
                        $currentParagraph .= trim($sentence) . '. ';
                        $sentenceCount++;
                        
                        // Create a new paragraph every 3-4 sentences
                        if ($sentenceCount >= 3) {
                            echo '<p>' . htmlspecialchars($currentParagraph) . '</p>';
                            $currentParagraph = '';
                            $sentenceCount = 0;
                        }
                    }
                }
                
                // Output any remaining content
                if (!empty(trim($currentParagraph))) {
                    echo '<p>' . htmlspecialchars($currentParagraph) . '</p>';
                }
                ?>
            </div>

            <?php if (isset($member['experience'])): ?>
            <div class="member-experience">
                <h3><i class="fas fa-briefcase"></i> Experience Highlights</h3>
                <ul>
                    <?php foreach ($member['experience'] as $exp): ?>
                        <li><?php echo htmlspecialchars($exp); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <?php endif; ?>

            <?php if (isset($member['expertise'])): ?>
            <div class="member-expertise">
                <h3><i class="fas fa-star"></i> Areas of Expertise</h3>
                <div class="expertise-tags">
                    <?php foreach ($member['expertise'] as $skill): ?>
                        <span class="expertise-tag"><?php echo htmlspecialchars($skill); ?></span>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endif; ?>
        </div>

        <div class="member-detail-footer">
            <a href="index.php#contact" class="contact-member-btn">
                <i class="fas fa-envelope"></i> Get in Touch
            </a>
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
