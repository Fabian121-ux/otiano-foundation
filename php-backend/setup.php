<?php
include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

// Create news table
$query = "CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'News',
    date VARCHAR(50) NOT NULL,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

// Create events table
$events_query = "CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'Conference',
    status VARCHAR(50) DEFAULT 'upcoming',
    date VARCHAR(50) NOT NULL,
    time VARCHAR(50),
    location VARCHAR(255),
    venue VARCHAR(255),
    image VARCHAR(500),
    agenda JSON,
    speakers JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

// Create event registrations table
$registrations_query = "CREATE TABLE IF NOT EXISTS event_registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    organization VARCHAR(255),
    position VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
)";

try {
    $db->exec($query);
    echo "News table created successfully\n";
    
    $db->exec($events_query);
    echo "Events table created successfully\n";
    
    $db->exec($registrations_query);
    echo "Event registrations table created successfully\n";
    
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
    
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>