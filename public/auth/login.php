<?php
session_start();
require_once "../config/db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST["email"]);
    $pass  = $_POST["password"];

    $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        if (password_verify($pass, $user["password"])) {
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["name"] = $user["name"];
            header("Location: ../dashboard.php");
            exit;
        }
    }
    $error = "Invalid email or password";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login | Fusion FitNet</title>

  <!-- FIXED PATHS -->
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/auth.css">
</head>
<body>

  <div class="auth-container">
    <div class="auth-box">
      <h2>Login</h2>

      <?php if (!empty($error)): ?>
        <p style="color:red; margin-bottom:10px;">
          <?= htmlspecialchars($error) ?>
        </p>
      <?php endif; ?>

      <form action="login.php" method="POST">
        <div class="form-group">
          <input type="email" name="email" required>
          <label>Email Address</label>
        </div>

        <div class="form-group">
          <input type="password" name="password" required>
          <label>Password</label>
        </div>

        <button type="submit" class="btn full">Login</button>
      </form>

      <p class="auth-switch">
        Don't have an account?
        <a href="signup.php">Sign Up</a>
      </p>
    </div>
  </div>

  <script src="../js/main.js"></script>
</body>
</html>
