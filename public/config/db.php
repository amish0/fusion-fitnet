<?php
$host = "localhost";
$user = "fusisktz_admin";
$pass = "F9!uQ@7Kx#R3Wm$Z";
$db   = "fusisktz_fusion_fitnet";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
try {
    $conn = new mysqli($host, $user, $pass, $db);
    $conn->set_charset("utf8mb4");
    echo "✅ Database connected successfully!";
} catch (Exception $e) {
    echo "❌ Database connection failed: " . $e->getMessage();
    die();
}

