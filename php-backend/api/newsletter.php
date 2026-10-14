<?php
header('Access-Control-Allow-Origin: https://otianofoundation.org');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    if (!$db) {
        throw new Exception('Database connection failed');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Valid email is required']);
        exit;
    }
    
    $email = $input['email'];
    
    try {
        // Check if email already exists
        $check_query = "SELECT id FROM newsletter_subscriptions WHERE email = :email";
        $check_stmt = $db->prepare($check_query);
        $check_stmt->bindParam(':email', $email);
        $check_stmt->execute();
        
        if ($check_stmt->fetch()) {
            echo json_encode(['success' => true, 'message' => 'Already subscribed']);
            exit;
        }
        
        // Insert new subscription
        $query = "INSERT INTO newsletter_subscriptions (email, subscribed_at) VALUES (:email, datetime('now'))";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $email);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Successfully subscribed to newsletter']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to process subscription']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Get all subscriptions for admin
        $query = "SELECT id, email, subscribed_at FROM newsletter_subscriptions ORDER BY subscribed_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $subscriptions = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'data' => $subscriptions]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>