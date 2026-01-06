<?php
$host = "localhost";
$user = "fusisktz_admin";
$pass = "F9!uQ@7Kx#R3Wm$Z";
$db   = "fusisktz_fusion_fitnet";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Database connection failed");
}
?>
