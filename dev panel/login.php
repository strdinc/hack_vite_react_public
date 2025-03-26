<?php
session_start();

$host = 'host';
$dbname = 'db_name';
$username = 'user';
$password = 'pass';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $inputUsername = $_POST['username'];
    $inputPassword = $_POST['password'];

    // Защита от SQL-инъекций
    $stmt = $pdo->prepare("SELECT * FROM tablet_name WHERE username = :username");
    $stmt->execute(['username' => $inputUsername]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        if (password_verify($inputPassword, $user['password_hash'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            $cookie_name = "remember_me";
            $cookie_value = session_id(); //
            $cookie_lifetime = 60 * 60 * 24 * 365 * 10; //
            setcookie($cookie_name, $cookie_value, time() + $cookie_lifetime, "/");

            header("Location: /participants/");
            exit();
        } else {
            echo "Неверный пароль.";
        }
    } else {
        echo "Пользователь не найден.";
    }
} catch (PDOException $e) {
    die("Ошибка подключения к базе данных: " . $e->getMessage());
}
?>
