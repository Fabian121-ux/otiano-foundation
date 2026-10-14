<?php
// Display errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include database and models
require_once '../config/database.php';
require_once '../models/News.php';
require_once '../models/Events.php';

echo "Starting CRUD Tests...\n";

$database = new Database();
$db = $database->getConnection();

if ($db) {
    echo "Database connection successful.\n";
} else {
    die("Database connection failed.\n");
}

// --- NEWS TEST ---
echo "\n--- Testing News Model ---\n";
$news = new News($db);

// 1. Create
echo "1. Testing Create News... ";
$news->title = "Test News Title";
$news->description = "Test News Description";
$news->category = "Test Category";
$news->date = "2023-10-27";
$news->image = "test_image.jpg";

if ($news->create()) {
    echo "SUCCESS. ID: " . $news->id . "\n";
    $newsId = $news->id;
} else {
    echo "FAILED.\n";
    exit;
}

// 2. Read One
echo "2. Testing Read One News (ID: $newsId)... ";
$news->id = $newsId;
if ($news->readOne()) {
    echo "SUCCESS. Title: " . $news->title . "\n";
    if ($news->title !== "Test News Title") {
        echo "WARNING: Title mismatch.\n";
    }
} else {
    echo "FAILED.\n";
}

// 3. Update
echo "3. Testing Update News... ";
$news->id = $newsId;
$news->title = "Updated News Title";
$news->description = "Updated Description";
$news->category = "Updated Category";
$news->date = "2023-10-28";
$news->image = "updated_image.jpg";

if ($news->update()) {
    echo "SUCCESS.\n";
} else {
    echo "FAILED.\n";
}

// Verify Update
echo "   Verifying Update... ";
$news->id = $newsId;
$news->readOne();
if ($news->title === "Updated News Title") {
    echo "SUCCESS.\n";
} else {
    echo "FAILED. Got: " . $news->title . "\n";
}

// 4. Delete
echo "4. Testing Delete News... ";
$news->id = $newsId;
if ($news->delete()) {
    echo "SUCCESS.\n";
} else {
    echo "FAILED.\n";
}

// Verify Delete
echo "   Verifying Delete... ";
if (!$news->readOne()) {
    echo "SUCCESS (Item not found).\n";
} else {
    echo "FAILED (Item still exists).\n";
}


// --- EVENTS TEST ---
echo "\n--- Testing Events Model ---\n";
$event = new Events($db);

// 1. Create
echo "1. Testing Create Event... ";
$event->title = "Test Event Title";
$event->description = "Test Event Description";
$event->category = "Workshop";
$event->status = "Upcoming";
$event->date = "2023-11-15";
$event->time = "10:00 AM";
$event->location = "Test Location";
$event->venue = "Test Venue";
$event->image = "test_event.jpg";
$event->agenda = "Test Agenda";
$event->speakers = "Test Speaker";

if ($event->create()) {
    echo "SUCCESS. ID: " . $event->id . "\n";
    $eventId = $event->id;
} else {
    echo "FAILED.\n";
    print_r($event);
    exit;
}

// 2. Read One
echo "2. Testing Read One Event (ID: $eventId)... ";
$event->id = $eventId;
if ($event->readOne()) {
    echo "SUCCESS. Title: " . $event->title . "\n";
} else {
    echo "FAILED.\n";
}

// 3. Update
echo "3. Testing Update Event... ";
$event->id = $eventId;
$event->title = "Updated Event Title";
$event->description = "Updated Event Description";
$event->category = "Conference";
$event->status = "Completed";
$event->date = "2023-11-16";
$event->time = "11:00 AM";
$event->location = "Updated Location";
$event->venue = "Updated Venue";
$event->image = "updated_event.jpg";
$event->agenda = "Updated Agenda";
$event->speakers = "Updated Speaker";

if ($event->update()) {
    echo "SUCCESS.\n";
} else {
    echo "FAILED.\n";
}

// Verify Update
echo "   Verifying Update... ";
$event->id = $eventId;
$event->readOne();
if ($event->title === "Updated Event Title") {
    echo "SUCCESS.\n";
} else {
    echo "FAILED. Got: " . $event->title . "\n";
}

// 4. Delete
echo "4. Testing Delete Event... ";
$event->id = $eventId;
if ($event->delete()) {
    echo "SUCCESS.\n";
} else {
    echo "FAILED.\n";
}

// Verify Delete
echo "   Verifying Delete... ";
if (!$event->readOne()) {
    echo "SUCCESS (Item not found).\n";
} else {
    echo "FAILED (Item still exists).\n";
}

echo "\nAll CRUD tests completed.\n";
?>
