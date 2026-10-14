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
include_once '../models/Events.php';
include_once '../utils/helpers.php';

$database = new Database();
$db = $database->getConnection();
$events = new Events($db);

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? $_GET['id'] : null;

switch($method) {
    case 'GET':
        if ($id) {
            $events->id = $id;
            if($events->readOne()) {
                $event_item = array(
                    "id" => $events->id,
                    "title" => $events->title,
                    "description" => $events->description,
                    "category" => $events->category,
                    "status" => $events->status,
                    "date" => $events->date,
                    "time" => $events->time,
                    "location" => $events->location,
                    "venue" => $events->venue,
                    "image" => $events->image,
                    "agenda" => json_decode($events->agenda),
                    "speakers" => json_decode($events->speakers),
                    "created_at" => $events->created_at,
                    "updated_at" => $events->updated_at
                );
                sendResponse(200, $event_item);
            } else {
                sendResponse(404, null, 'Event not found');
            }
        } else {
            $stmt = $events->read();
            $events_arr = array();
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $event_item = array(
                    "id" => $row['id'],
                    "title" => $row['title'],
                    "description" => $row['description'],
                    "category" => $row['category'],
                    "status" => $row['status'],
                    "date" => $row['date'],
                    "time" => $row['time'],
                    "location" => $row['location'],
                    "venue" => $row['venue'],
                    "image" => $row['image'],
                    "agenda" => json_decode($row['agenda']),
                    "speakers" => json_decode($row['speakers']),
                    "created_at" => $row['created_at'],
                    "updated_at" => $row['updated_at']
                );
                array_push($events_arr, $event_item);
            }
            sendResponse(200, $events_arr);
        }
        break;
        
    case 'POST':
        requireAuth();
        $data = json_decode(file_get_contents("php://input"));
        
        if (!empty($data->title) && !empty($data->description)) {
            $events->title = $data->title;
            $events->description = $data->description;
            $events->category = $data->category ?? 'Conference';
            $events->status = $data->status ?? 'upcoming';
            $events->date = $data->date ?? date('F j, Y');
            $events->time = $data->time ?? '';
            $events->location = $data->location ?? '';
            $events->venue = $data->venue ?? '';
            $events->image = $data->image ?? '';
            $events->agenda = json_encode($data->agenda ?? []);
            $events->speakers = json_encode($data->speakers ?? []);
            
            if($events->create()) {
                $event_item = array(
                    "id" => $events->id,
                    "title" => $events->title,
                    "description" => $events->description,
                    "category" => $events->category,
                    "status" => $events->status,
                    "date" => $events->date,
                    "time" => $events->time,
                    "location" => $events->location,
                    "venue" => $events->venue,
                    "image" => $events->image,
                    "agenda" => json_decode($events->agenda),
                    "speakers" => json_decode($events->speakers)
                );
                sendResponse(201, $event_item, 'Event created successfully');
            } else {
                sendResponse(500, null, 'Unable to create event');
            }
        } else {
            sendResponse(400, null, 'Title and description are required');
        }
        break;
        
    case 'PUT':
        requireAuth();
        if (!$id) {
            sendResponse(400, null, 'ID is required');
        }
        
        $data = json_decode(file_get_contents("php://input"));
        
        $events->id = $id;
        $events->title = $data->title;
        $events->description = $data->description;
        $events->category = $data->category ?? 'Conference';
        $events->status = $data->status ?? 'upcoming';
        $events->date = $data->date ?? date('F j, Y');
        $events->time = $data->time ?? '';
        $events->location = $data->location ?? '';
        $events->venue = $data->venue ?? '';
        $events->image = $data->image ?? '';
        $events->agenda = json_encode($data->agenda ?? []);
        $events->speakers = json_encode($data->speakers ?? []);
        
        if($events->update()) {
            sendResponse(200, null, 'Event updated successfully');
        } else {
            sendResponse(500, null, 'Unable to update event');
        }
        break;
        
    case 'DELETE':
        requireAuth();
        if (!$id) {
            sendResponse(400, null, 'ID is required');
        }
        
        $events->id = $id;
        if($events->delete()) {
            sendResponse(200, null, 'Event deleted successfully');
        } else {
            sendResponse(500, null, 'Unable to delete event');
        }
        break;
        
    default:
        sendResponse(405, null, 'Method not allowed');
        break;
}
?>