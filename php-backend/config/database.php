<?php
class Database {
    private $db_name = 'database.sqlite';
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            // Absolute path to the database file
            $db_path = __DIR__ . '/../' . $this->db_name;
            $this->conn = new PDO("sqlite:" . $db_path);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("PRAGMA foreign_keys = ON;"); // Enable foreign keys for SQLite
        } catch(PDOException $exception) {
            error_log("Connection error: " . $exception->getMessage());
            return null;
        }
        return $this->conn;
    }
}
?>
