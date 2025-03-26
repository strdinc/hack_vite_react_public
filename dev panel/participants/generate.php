<?php
header('Content-Type: application/json');

$host = "host";
$dbname = "db_name";
$username = "user";
$password = "pass";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['error' => $e->getMessage()]));
}

$query = "SELECT * FROM form";
$stmt = $pdo->query($query);
$participants = $stmt->fetchAll(PDO::FETCH_ASSOC);

$uploadDir = __DIR__ . '/../../path/';

// Добавляем URL для скачивания файла
foreach ($participants as &$participant) {
    if (!empty($participant['tablet_name'])) {
        $filePath = ltrim($participant['tablet_name'], '/');
        $fullPath = $uploadDir . basename($filePath);

        error_log("Проверка файла: " . $fullPath);

        if (file_exists($fullPath)) {
            $participant['file_url'] = "https://admin.hackathonidigit.ru/participants/download.php?file=" . urlencode(basename($filePath));
        } else {
            $participant['file_url'] = "#";
            error_log("Файл не найден: " . $fullPath);
        }
    } else {
        $participant['file_url'] = "#";
    }
}

error_log("Сформированные данные: " . json_encode($participants));

echo json_encode($participants);
?>
