<?php
$host = "localhost";
$user = "fusisktz_admin";
$pass = "F9!uQ@7Kx#R3Wm$Z";
$db   = "fusisktz_fusion_fitnet";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
try {
    $conn = new mysqli($host, $user, $pass, $db);
    $conn->set_charset("utf8mb4");
} catch (Exception $e) {
    // In a real application, you would log this error and show a generic message.
    // For debugging purposes, we are showing the actual error.
    error_log($e->getMessage());
    die("Database connection failed. Please try again later.");
}
?>
