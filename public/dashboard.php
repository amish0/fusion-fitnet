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
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Welcome, <?php echo htmlspecialchars($name); ?>!</h1>
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
        <p>Here are your account details:</p>
        <div style="text-align: left; display: inline-block; margin-top: 20px;">
            <p><strong>Name:</strong> <?php echo htmlspecialchars($name); ?></p>
            <p><strong>Email:</strong> <?php echo htmlspecialchars($email); ?></p>
        </div>
    </main>

    <footer>
        © 2025 Fusion FitNet
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
