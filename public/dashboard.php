<?php
session_start();

// If the user is not logged in, redirect to the login page
if (empty($_SESSION["user_id"])) {
    header("Location: auth/login.php");
    exit;
}

$name = $_SESSION["name"];
$email = $_SESSION["email"];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Account - Fusion FitNet</title>
    <link rel="stylesheet" href="css/style.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        .dashboard-container {
            max-width: 1200px;
            margin: 60px auto;
            padding: 40px 20px;
        }
        
        .dashboard-hero {
            background: linear-gradient(135deg, #ff5e14 0%, #ff9c42 100%);
            color: white;
            padding: 60px 40px;
            border-radius: 30px;
            text-align: center;
            margin-bottom: 50px;
            box-shadow: 0 20px 50px rgba(255, 94, 20, 0.3);
            position: relative;
            overflow: hidden;
        }
        
        .dashboard-hero::before {
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
        
        .dashboard-hero h1 {
            font-size: 3em;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
            font-weight: 900;
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .dashboard-hero p {
            font-size: 1.2em;
            opacity: 0.95;
            position: relative;
            z-index: 1;
        }
        
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 50px;
        }
        
        .dashboard-card {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            padding: 40px 30px;
            border-radius: 25px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
            border: 2px solid rgba(255, 94, 20, 0.1);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        
        .dashboard-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #ff5e14, #ff9c42);
            transform: scaleX(0);
            transition: transform 0.4s ease;
        }
        
        .dashboard-card:hover::before {
            transform: scaleX(1);
        }
        
        .dashboard-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 60px rgba(255, 94, 20, 0.2);
            border-color: rgba(255, 94, 20, 0.3);
        }
        
        .dashboard-card i {
            font-size: 3em;
            background: linear-gradient(135deg, #ff5e14, #ff9c42);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            display: block;
        }
        
        .dashboard-card h3 {
            font-size: 1.5em;
            margin-bottom: 15px;
            color: #1a1a1a;
            font-weight: 700;
        }
        
        .dashboard-card p {
            color: #666;
            line-height: 1.8;
            margin-bottom: 10px;
        }
        
        .dashboard-card strong {
            color: #1a1a1a;
            font-weight: 700;
        }
        
        body.dark .dashboard-card {
            background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
            border-color: rgba(255, 94, 20, 0.2);
        }
        
        body.dark .dashboard-card h3,
        body.dark .dashboard-card strong {
            color: #ffffff;
        }
        
        body.dark .dashboard-card p {
            color: #cccccc;
        }
        
        @media (max-width: 768px) {
            .dashboard-hero h1 {
                font-size: 2em;
            }
            
            .dashboard-hero {
                padding: 40px 30px;
            }
            
            .dashboard-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>My Dashboard</h1>
        <p class="tagline">Welcome Back to Fusion FitNet</p>
    </header>

    <nav class="navbar">
        <div class="logo">Fusion FitNet</div>
        <div class="menu-toggle" onclick="toggleMenu()">☰</div>

        <div class="nav-links" id="navLinks">
            <a href="index.php">Home</a>
            <a href="index.php#features">Features</a>
            <a href="index.php#gallery">Gallery</a>
            <a href="index.php#events">Events</a>
            <a href="index.php#products">Products</a>
            <a href="index.php#contact">Contact</a>
            <a href="cart.php">🛒 Cart</a>
            <a href="auth/logout.php" class="btn-signup">Logout</a>
        </div>
    </nav>

    <div class="dashboard-container">
        <div class="dashboard-hero">
            <h1>Welcome, <?php echo htmlspecialchars($name); ?>! 🎉</h1>
            <p>Your fitness journey starts here</p>
        </div>
        
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <i class="fas fa-user-circle"></i>
                <h3>Profile Information</h3>
                <p><strong>Name:</strong> <?php echo htmlspecialchars($name); ?></p>
                <p><strong>Email:</strong> <?php echo htmlspecialchars($email); ?></p>
            </div>
            
            <div class="dashboard-card">
                <i class="fas fa-dumbbell"></i>
                <h3>Quick Actions</h3>
                <a href="index.php#products" class="btn" style="margin-top: 10px; display: block;">Browse Products</a>
                <a href="cart.php" class="btn" style="margin-top: 10px; display: block;">View Cart</a>
            </div>
            
            <div class="dashboard-card">
                <i class="fas fa-chart-line"></i>
                <h3>Your Stats</h3>
                <p>Member since: <?php echo date('F Y'); ?></p>
                <p>Status: <strong style="color: #ff5e14;">Active Member</strong></p>
            </div>
        </div>
    </div>

    <footer>
        © 2025 Fusion FitNet
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
