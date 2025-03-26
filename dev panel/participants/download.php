<?php
$ftp_server = "00.000.000.000";
$ftp_user = "user";
$ftp_pass = "pass";
$ftp_folder = "/path/";

$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if (!$id) {
    header("HTTP/1.0 404 Not Found");
    echo "ID участника не указан.";
    exit;
}

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

$query = "SELECT tablet_name FROM form WHERE id = :id";
$stmt = $pdo->prepare($query);
$stmt->execute(['id' => $id]);
$participant = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$participant || empty($participant['files'])) {
    header("HTTP/1.0 404 Not Found");
    echo "Файл не найден для участника с ID: $id";
    exit;
}

$ftpFilePath = ltrim($participant['tablet_name'], '/');
$tempFilePath = sys_get_temp_dir() . "/" . basename($ftpFilePath);

$conn_id = ftp_connect($ftp_server);
if (!$conn_id) {
    header("HTTP/1.0 500 Internal Server Error");
    echo "Не удалось подключиться к FTP-серверу.";
    exit;
}

$login_result = ftp_login($conn_id, $ftp_user, $ftp_pass);
if (!$login_result) {
    header("HTTP/1.0 500 Internal Server Error");
    echo "Не удалось авторизоваться на FTP-сервере.";
    ftp_close($conn_id);
    exit;
}

if (ftp_get($conn_id, $tempFilePath, $ftpFilePath, FTP_BINARY)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . basename($ftpFilePath) . '"');
    header('Content-Length: ' . filesize($tempFilePath));
    readfile($tempFilePath);

    unlink($tempFilePath);
} else {
    header("HTTP/1.0 404 Not Found");
    echo "Файл не найден на FTP-сервере: $ftpFilePath";
}

ftp_close($conn_id);
exit;
?>
