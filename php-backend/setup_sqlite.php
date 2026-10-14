<?php
include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

// Enable foreign key support
$db->exec("PRAGMA foreign_keys = ON;");

// Create news table
$query = "CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT DEFAULT 'News',
    date TEXT NOT NULL,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)";

// Create events table
$events_query = "CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT DEFAULT 'Conference',
    status TEXT DEFAULT 'upcoming',
    date TEXT NOT NULL,
    time TEXT,
    location TEXT,
    venue TEXT,
    image TEXT,
    agenda TEXT,
    speakers TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)";

// Create event registrations table
$registrations_query = "CREATE TABLE IF NOT EXISTS event_registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    organization TEXT,
    position TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
)";

// Create newsletter_subscriptions table
$newsletter_query = "CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
)";

// Create event_feedback table
$feedback_query = "CREATE TABLE IF NOT EXISTS event_feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    event TEXT NOT NULL,
    rating TEXT DEFAULT NULL,
    comments TEXT,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
)";

try {
    $db->exec($query);
    echo "News table created successfully\n";
    
    $db->exec($events_query);
    echo "Events table created successfully\n";
    
    $db->exec($registrations_query);
    echo "Event registrations table created successfully\n";
    
    $db->exec($newsletter_query);
    echo "Newsletter subscriptions table created successfully\n";

    $db->exec($feedback_query);
    echo "Event feedback table created successfully\n";
    
    // Check if news table is empty
    $check_news = $db->query("SELECT COUNT(*) FROM news")->fetchColumn();
    
    if ($check_news == 0) {
        // Insert sample news data
        $sample_news = [
            [
                'title' => 'Inspiring the Next Generation of Public Sector Leaders',
                'description' => 'From equipping civil servants with digital capabilities to enrolling new cohorts of reform-minded leaders, we strengthened public sector capacity at scale, equipping over 1,000 public servants across Africa in leadership, digital skills, policy development, and reform implementation.',
                'category' => 'News',
                'date' => 'December 30, 2025',
                'image' => '/src/assets/homepage/thumb-profile-governance-01.webp'
            ],
            [
                'title' => 'Supporting Civil Service Reform',
                'description' => 'In 2025, we deepened our support for civil service reform by strengthening systems, building practical skills, and expanding public service professionalism in partnership with public sector reform champions.',
                'category' => 'News',
                'date' => 'December 30, 2025',
                'image' => '/src/assets/homepage/thumb-profile-business-01.webp'
            ]
        ];
        
        $insert_query = "INSERT INTO news (title, description, category, date, image) VALUES (?, ?, ?, ?, ?)";
        $stmt = $db->prepare($insert_query);
        
        foreach ($sample_news as $news) {
            $stmt->execute([
                $news['title'],
                $news['description'],
                $news['category'],
                $news['date'],
                $news['image']
            ]);
        }
        
        echo "Sample news data inserted successfully\n";
    }

    // Check if events table is empty
    $check_events = $db->query("SELECT COUNT(*) FROM events")->fetchColumn();
    
    if ($check_events == 0) {
        // Insert sample events data
        $sample_events = [
            // Upcoming events
            [
                'title' => 'Public Sector Leadership Summit 2026',
                'description' => 'Join leading public sector professionals for a day of insights on transformational leadership and governance excellence.',
                'category' => 'Summit',
                'status' => 'upcoming',
                'date' => 'March 15, 2026',
                'time' => '9:00 AM - 5:00 PM',
                'location' => 'Lagos, Nigeria',
                'venue' => 'Eko Hotel & Suites, Victoria Island',
                'image' => '/src/assets/homepage/thumb-profile-governance-01.webp',
                'agenda' => json_encode([
                    ['time' => '9:00 AM', 'activity' => 'Registration & Welcome Coffee'],
                    ['time' => '10:00 AM', 'activity' => 'Opening Keynote: The Future of Public Service Leadership'],
                    ['time' => '11:30 AM', 'activity' => 'Panel Discussion: Digital Transformation in Government']
                ]),
                'speakers' => json_encode([
                    ['name' => 'Dr. Aigboje Aig-Imoukhuede', 'title' => 'Chairman, Aig-Imoukhuede Foundation'],
                    ['name' => 'Prof. Yemi Osinbajo', 'title' => 'Former Vice President of Nigeria']
                ])
            ],
            [
                'title' => 'Healthcare Innovation Workshop',
                'description' => 'Explore innovative approaches to primary healthcare delivery and system strengthening across Africa.',
                'category' => 'Workshop',
                'status' => 'upcoming',
                'date' => 'April 22, 2026',
                'time' => '10:00 AM - 4:00 PM',
                'location' => 'Abuja, Nigeria',
                'venue' => 'Transcorp Hilton Abuja',
                'image' => '/src/assets/homepage/thumb-profile-adv-01.webp',
                'agenda' => json_encode([
                    ['time' => '10:00 AM', 'activity' => 'Registration & Opening'],
                    ['time' => '11:00 AM', 'activity' => 'Healthcare Innovation Trends']
                ]),
                'speakers' => json_encode([
                    ['name' => 'Dr. Ofovwe Aig-Imoukhuede', 'title' => 'Executive Vice Chairman, Aig-Imoukhuede Foundation']
                ])
            ],
            [
                'title' => 'Financial Inclusion Conference 2026',
                'description' => 'Advancing financial inclusion strategies for sustainable economic development across Africa.',
                'category' => 'Conference',
                'status' => 'upcoming',
                'date' => 'June 10, 2026',
                'time' => '8:30 AM - 5:00 PM',
                'location' => 'Accra, Ghana',
                'venue' => 'Kempinski Hotel Gold Coast City',
                'image' => '/src/assets/homepage/thumb-profile-business-01.webp',
                'agenda' => json_encode([
                    ['time' => '8:30 AM', 'activity' => 'Registration & Welcome'],
                    ['time' => '9:30 AM', 'activity' => 'Keynote: Financial Inclusion in Africa'],
                    ['time' => '11:00 AM', 'activity' => 'Panel: Digital Banking Solutions']
                ]),
                'speakers' => json_encode([
                    ['name' => 'Dr. Aigboje Aig-Imoukhuede', 'title' => 'Chairman, Aig-Imoukhuede Foundation']
                ])
            ],
            // Past events
            [
                'title' => 'African Governance Excellence Awards 2024',
                'description' => 'Celebrating outstanding achievements in public sector governance and leadership across Africa.',
                'category' => 'Awards',
                'status' => 'past',
                'date' => 'November 20, 2024',
                'time' => '6:00 PM - 10:00 PM',
                'location' => 'Lagos, Nigeria',
                'venue' => 'Four Points by Sheraton Lagos',
                'image' => '/src/assets/homepage/thumb-profile-governance-01.webp',
                'agenda' => json_encode([
                    ['time' => '6:00 PM', 'activity' => 'Red Carpet & Cocktails'],
                    ['time' => '7:00 PM', 'activity' => 'Awards Ceremony'],
                    ['time' => '9:00 PM', 'activity' => 'Networking Dinner']
                ]),
                'speakers' => json_encode([
                    ['name' => 'Dr. Aigboje Aig-Imoukhuede', 'title' => 'Chairman, Aig-Imoukhuede Foundation']
                ])
            ],
            [
                'title' => 'Digital Government Transformation Conference',
                'description' => 'A comprehensive conference on leveraging technology for efficient public service delivery.',
                'category' => 'Conference',
                'status' => 'past',
                'date' => 'September 12, 2024',
                'time' => '8:00 AM - 5:00 PM',
                'location' => 'Abuja, Nigeria',
                'venue' => 'International Conference Centre',
                'image' => '/src/assets/homepage/thumb-profile-business-01.webp',
                'agenda' => json_encode([
                    ['time' => '8:00 AM', 'activity' => 'Registration & Breakfast'],
                    ['time' => '9:00 AM', 'activity' => 'Keynote: Digital Transformation in Africa'],
                    ['time' => '11:00 AM', 'activity' => 'Panel: E-Government Best Practices']
                ]),
                'speakers' => json_encode([
                    ['name' => 'Prof. Yemi Osinbajo', 'title' => 'Former Vice President of Nigeria'],
                    ['name' => 'Dr. Ofovwe Aig-Imoukhuede', 'title' => 'Executive Vice Chairman, Aig-Imoukhuede Foundation']
                ])
            ]
        ];
        
        $events_insert_query = "INSERT INTO events (title, description, category, status, date, time, location, venue, image, agenda, speakers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $events_stmt = $db->prepare($events_insert_query);
        
        foreach ($sample_events as $event) {
            $events_stmt->execute([
                $event['title'],
                $event['description'],
                $event['category'],
                $event['status'],
                $event['date'],
                $event['time'],
                $event['location'],
                $event['venue'],
                $event['image'],
                $event['agenda'],
                $event['speakers']
            ]);
        }
        
        echo "Sample events data inserted successfully\n";
    }
    
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
