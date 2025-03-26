<?php
// Настройки подключения к базе данных
$host = 'host';
$dbname = 'db_name';
$username = 'user';
$password = 'pass';

// Настройки FTP
$ftp_server = "00.000.000.000";
$ftp_user = "user";
$ftp_pass = "pass";
$ftp_folder = "/path/";

try {
    // Подключение к базе данных
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Получение данных из формы
    $full_name = trim($_POST['full_name']);
    $institution = trim($_POST['institution']);
    $phone = trim($_POST['phone']);
    $email = trim($_POST['email']);
    $selected_track = $_POST['selected_track'] ?? 'none'; // Если не выбрано, значение по умолчанию
    $selected_command = $_POST['selected_command'] ?? 'none';
    $command_name = isset($_POST['command_name']) && !empty(trim($_POST['command_name']))
        ? trim($_POST['command_name'])
        : ($selected_command === 'no' ? 'no_command' : '');

    // Проверка обязательных полей
    if (empty($full_name) || empty($institution) || empty($phone) || empty($email)) {
        echo json_encode(['status' => 'error', 'message' => 'все поля должны быть заполнены.']);
        exit;
    }

    // Проверка загруженного файла
    if (!empty($_FILES['consent_file']['name'])) {
        $allowedMimeTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png',
            'image/gif'
        ];

        $fileMimeType = mime_content_type($_FILES['consent_file']['tmp_name']);
        if (!in_array($fileMimeType, $allowedMimeTypes)) {
            echo json_encode(['status' => 'error', 'message' => 'разрешены только pdf, word или изображения']);
            exit;
        }

        $tmp_name = $_FILES['consent_file']['tmp_name'];
        $name = $_FILES['consent_file']['name'];
        $file_extension = pathinfo($name, PATHINFO_EXTENSION); // Расширение файла
        $random_hash = bin2hex(random_bytes(4)); // Генерация случайного хэша
        $latin_full_name = transliterator_transliterate('Any-Latin; Latin-ASCII', $full_name); // Перевод ФИО в латиницу
        $new_file_name = strtolower(str_replace(' ', '_', $latin_full_name)) . "_" . $random_hash . "." . $file_extension;
        $ftp_file_path = $ftp_folder . $new_file_name;

        // Подключение к FTP
        $conn_id = ftp_connect($ftp_server);
        if (!$conn_id) {
            echo json_encode(['status' => 'error', 'message' => 'не удалось подключиться к FTP-серверу.']);
            exit;
        }

        // Авторизация на FTP
        $login_result = ftp_login($conn_id, $ftp_user, $ftp_pass);
        if (!$login_result) {
            ftp_close($conn_id);
            echo json_encode(['status' => 'error', 'message' => 'ошибка авторизации на FTP-сервере.']);
            exit;
        }

        // Загрузка файла на FTP
        if (!ftp_put($conn_id, $ftp_file_path, $tmp_name, FTP_BINARY)) {
            ftp_close($conn_id);
            echo json_encode(['status' => 'error', 'message' => "ошибка при загрузке файла: $name"]);
            exit;
        }

        // Закрытие соединения с FTP
        ftp_close($conn_id);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'файл согласия не был отправлен.']);
        exit;
    }

    // SQL-запрос для вставки данных
    $stmt = $pdo->prepare("
        INSERT INTO form (
            full_name, institution, phone, email, selected_track, selected_command, command_name, files
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $full_name,
        $institution,
        $phone,
        $email,
        $selected_track,
        $selected_command,
        $command_name,
        $ftp_file_path // Сохраняем путь к файлу
    ]);

    // Возвращаем успешный ответ
    echo json_encode(['status' => 'success', 'message' => 'заявка успешно отправлена']);
    exit;
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'ошибка базы данных: ' . $e->getMessage()]);
    exit;
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'общая ошибка: ' . $e->getMessage()]);
    exit;
}
?>