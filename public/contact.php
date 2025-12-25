<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST["message"]);

    $to = "ayanain@fusionfitnet.com";
    $subject = "New Contact Form Message";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    mail($to, $subject, $body);
    header("Location: index.html");
}
?>
