<?php
session_start();

// If the user is not logged in, redirect to the login page
if (empty($_SESSION["user_id"])) {
    header("Location: auth/login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Account - Fusion FitNet</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>My Account</h1>
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

    <main style="padding: 20px; text-align: center;">
        <h2>Welcome to your dashboard!</h2>
        <p>This page is under construction.</p>
    </main>

    <footer>
        © 2025 Fusion FitNet
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
