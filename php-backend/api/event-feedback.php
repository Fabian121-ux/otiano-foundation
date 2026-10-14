<?php
header('Access-Control-Allow-Origin: https://otianofoundation.org');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['name']) || !isset($input['email']) || !isset($input['event']) || !isset($input['rating'])) {
        http_response_code(400);
        echo json_encode(['error' => 'All required fields must be provided']);
        exit;
    }
    
    $name = $input['name'];
    $email = $input['email'];
    $event = $input['event'];
    $rating = $input['rating'];
    $comments = $input['comments'] ?? '';
    
    // Insert feedback
    $query = "INSERT INTO event_feedback (name, email, event, rating, comments, submitted_at) VALUES (:name, :email, :event, :rating, :comments, datetime('now'))";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':event', $event);
    $stmt->bindParam(':rating', $rating);
    $stmt->bindParam(':comments', $comments);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Feedback submitted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to submit feedback']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get all feedback for admin
    $query = "SELECT id, name, email, event, rating, comments, submitted_at FROM event_feedback ORDER BY submitted_at DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $feedback = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $feedback]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>