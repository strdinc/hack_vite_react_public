<?php
session_start();

if (!isset($_SESSION['user_id']) && isset($_COOKIE['remember_me'])) {
    $session_id = $_COOKIE['remember_me'];

    if (session_status() === PHP_SESSION_ACTIVE) {
        session_destroy();
    }

    session_id($session_id);
    session_start();

    if (!isset($_SESSION['user_id'])) {
        setcookie("remember_me", "", time() - 3600, "/");
        header("Location: /");
        exit();
    }
}

if (!isset($_SESSION['user_id'])) {
    header("Location: /");
    exit();
}
?>
<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Участники</title>
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
<div class="up_line hidden"></div>
<div class="left_line hidden"></div>
<img class="logo" src="img/logo.svg">

<div id="app">
    <!-- Здесь будут отображаться данные -->
</div>

<script src="app.js"></script>
</body>
</html>
