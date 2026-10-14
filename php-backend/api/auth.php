<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://otianofoundation.org');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include_once '../config/database.php';
include_once '../utils/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, null, 'Method not allowed');
}

$data = json_decode(file_get_contents("php://input"));

if (empty($data->email) || empty($data->password)) {
    sendResponse(400, null, 'Email and password are required');
}

$database = new Database();
$db = $database->getConnection();

$query = "SELECT id, name, email, password FROM admins WHERE email = ? LIMIT 0,1";
$stmt = $db->prepare($query);
$stmt->bindValue(1, $data->email);
$stmt->execute();

if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $id = $row['id'];
    $name = $row['name'];
    $email = $row['email'];
    $password_hash = $row['password'];

    if (password_verify($data->password, $password_hash)) {
        // Generate a simple token (in production use JWT)
        $token = bin2hex(random_bytes(32));
        
        $response_data = array(
            'token' => $token,
            'user' => array(
                'id' => $id,
                'name' => $name,
                'email' => $email,
                'role' => 'admin'
            )
        );
        sendResponse(200, $response_data, 'Login successful');
    } else {
        sendResponse(401, null, 'Invalid credentials');
    }
} else {
    sendResponse(401, null, 'Invalid credentials');
}
?>