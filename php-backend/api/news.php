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
include_once '../models/News.php';
include_once '../utils/helpers.php';

$database = new Database();
$db = $database->getConnection();
$news = new News($db);

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? $_GET['id'] : null;

switch($method) {
    case 'GET':
        if ($id) {
            // Get single news item
            $news->id = $id;
            if($news->readOne()) {
                $news_item = array(
                    "id" => $news->id,
                    "title" => $news->title,
                    "description" => $news->description,
                    "category" => $news->category,
                    "date" => $news->date,
                    "image" => $news->image,
                    "created_at" => $news->created_at,
                    "updated_at" => $news->updated_at
                );
                sendResponse(200, $news_item);
            } else {
                sendResponse(404, null, 'News not found');
            }
        } else {
            // Get all news
            $stmt = $news->read();
            $news_arr = array();
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $news_item = array(
                    "id" => $row['id'],
                    "title" => $row['title'],
                    "description" => $row['description'],
                    "category" => $row['category'],
                    "date" => $row['date'],
                    "image" => $row['image'],
                    "created_at" => $row['created_at'],
                    "updated_at" => $row['updated_at']
                );
                array_push($news_arr, $news_item);
            }
            
            if(count($news_arr) > 0) {
                sendResponse(200, $news_arr);
            } else {
                sendResponse(200, []);
            }
        }
        break;
        
    case 'POST':
        requireAuth();
        $data = json_decode(file_get_contents("php://input"));
        
        if (!empty($data->title) && !empty($data->description)) {
            $news->title = $data->title;
            $news->description = $data->description;
            $news->category = $data->category ?? 'News';
            $news->date = $data->date ?? date('F j, Y');
            $news->image = $data->image ?? '';
            
            if($news->create()) {
                $news_item = array(
                    "id" => $news->id,
                    "title" => $news->title,
                    "description" => $news->description,
                    "category" => $news->category,
                    "date" => $news->date,
                    "image" => $news->image
                );
                sendResponse(201, $news_item, 'News created successfully');
            } else {
                sendResponse(500, null, 'Unable to create news');
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
        
        $news->id = $id;
        $news->title = $data->title;
        $news->description = $data->description;
        $news->category = $data->category ?? 'News';
        $news->date = $data->date ?? date('F j, Y');
        $news->image = $data->image ?? '';
        
        if($news->update()) {
            sendResponse(200, null, 'News updated successfully');
        } else {
            sendResponse(500, null, 'Unable to update news');
        }
        break;
        
    case 'DELETE':
        requireAuth();
        if (!$id) {
            sendResponse(400, null, 'ID is required');
        }
        
        $news->id = $id;
        if($news->delete()) {
            sendResponse(200, null, 'News deleted successfully');
        } else {
            sendResponse(500, null, 'Unable to delete news');
        }
        break;
        
    default:
        sendResponse(405, null, 'Method not allowed');
        break;
}
?>