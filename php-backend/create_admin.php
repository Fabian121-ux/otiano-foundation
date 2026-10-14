<?php
include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

// Create admins table
$query = "CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)";

try {
    $db->exec($query);
    echo "Admins table created successfully\n";

    // Check if admin exists
    $email = getenv('OTIANO_ADMIN_EMAIL');
    // Explicit credentials are required; never hardcode an administrator password.
    if (!$email || !getenv('OTIANO_ADMIN_PASSWORD')) {
        throw new RuntimeException('OTIANO_ADMIN_EMAIL and OTIANO_ADMIN_PASSWORD must be set');
    }
    $stmt = $db->prepare("SELECT COUNT(*) FROM admins WHERE email = ?");
    $stmt->execute([$email]);
    $count = $stmt->fetchColumn();

    if ($count == 0) {
        // Create default admin
        $password = getenv('OTIANO_ADMIN_PASSWORD');
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $name = 'Admin User';

        $insert_query = "INSERT INTO admins (email, password, name) VALUES (?, ?, ?)";
        $stmt = $db->prepare($insert_query);
        $stmt->execute([$email, $hashed_password, $name]);

        echo "Admin user created successfully.\n";
        echo "Email: $email\n";

    } else {
        echo "Admin user already exists.\n";
        echo "Email: $email\n";
        echo "Password: (hidden)\n";
    }

} catch(PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>