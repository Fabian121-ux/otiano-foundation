<?php
// Handle CORS
header('Access-Control-Allow-Origin: https://otianofoundation.org');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';
include_once '../utils/helpers.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Get all registrations (admin only)
        requireAuth();
        $query = "SELECT r.*, e.title as event_title 
                  FROM event_registrations r 
                  JOIN events e ON r.event_id = e.id 
                  ORDER BY r.created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $registrations = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($registrations, $row);
        }
        
        sendResponse(200, $registrations);
        break;
        
    case 'POST':
        // Create new registration
        $data = json_decode(file_get_contents("php://input"));
        
        if (!empty($data->event_id) && !empty($data->name) && !empty($data->email)) {
            $query = "INSERT INTO event_registrations 
                      (event_id, name, email, phone, organization, position) 
                      VALUES (?, ?, ?, ?, ?, ?)";
            
            $stmt = $db->prepare($query);
            
            if($stmt->execute([
                $data->event_id,
                $data->name,
                $data->email,
                $data->phone ?? '',
                $data->organization ?? '',
                $data->position ?? ''
            ])) {
                sendResponse(201, null, 'Registration successful');
            } else {
                sendResponse(500, null, 'Unable to register');
            }
        } else {
            sendResponse(400, null, 'Event ID, name and email are required');
        }
        break;
        
    default:
        sendResponse(405, null, 'Method not allowed');
        break;
}
?>