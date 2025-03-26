<?php
session_start();

if (isset($_SESSION['user_id'])) {
    header("Location: /participants/");
    exit();
}

if (isset($_COOKIE['remember_me'])) {
    $session_id = $_COOKIE['remember_me'];

    session_id($session_id);
    session_start();

    if (isset($_SESSION['user_id'])) {
        header("Location: /participants/");
        exit();
    }
}
?>
<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Вход</title>
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
<div class="up_line hidden"></div>
<div class="left_line hidden"></div>
<img class="logo" src="img/logo.svg">

<form action="login.php" method="POST">
  <div class="login_form">
    <div class="inputs">
      <input type="text" id="username" class="username" name="username" required placeholder="логин">
      <input type="password" id="password" class="password" name="password" required placeholder="пароль">
    </div>
    <button type="submit" class="sub_but">войти</button>
  </div>
</form>

</body>
</html>
