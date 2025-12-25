<?php
require_once "../config/db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name  = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $pass  = password_hash($_POST["password"], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $pass);

    if ($stmt->execute()) {
        header("Location: login.php?success=1");
        exit;
    } else {
        $error = "Email already registered!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign Up | Fusion FitNet</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/auth.css">
</head>
<body>
  <div class="auth-container">
    <div class="auth-box">
      <h2>Sign Up</h2>
      <form action="signup.php" method="POST">
        <div class="form-group">
          <input type="text" name="name" required>
          <label>Your Name</label>
        </div>
        <div class="form-group">
          <input type="email" name="email" required>
          <label>Email Address</label>
        </div>
        <div class="form-group">
          <input type="password" name="password" required>
          <label>Password</label>
        </div>
        <button type="submit" class="btn full">Sign Up</button>
      </form>
      <p class="auth-switch">Already have an account? <a href="login.html">Login</a></p>
    </div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>