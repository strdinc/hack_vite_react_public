<?php
$host = 'host';
$dbname = 'db_name';
$username = 'user';
$password = 'pass';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $newUsername = 'Login';
    $newPassword = 'PassWD';

    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    // Добавление пользователя в базу данных
    $stmt = $pdo->prepare("INSERT INTO tablet_name (username, password_hash) VALUES (:username, :password_hash)");
    $stmt->execute([
        'username' => $newUsername,
        'password_hash' => $hashedPassword
    ]);

    echo "Пользователь создан успешно!";
} catch (PDOException $e) {
    die("Ошибка подключения к базе данных: " . $e->getMessage());
}
?>
