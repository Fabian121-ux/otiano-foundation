<?php
class Events {
    private $conn;
    private $table_name = "events";

    public $id;
    public $title;
    public $description;
    public $category;
    public $status;
    public $date;
    public $time;
    public $location;
    public $venue;
    public $image;
    public $agenda;
    public $speakers;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    function read() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if($row) {
            $this->title = $row['title'];
            $this->description = $row['description'];
            $this->category = $row['category'];
            $this->status = $row['status'];
            $this->date = $row['date'];
            $this->time = $row['time'];
            $this->location = $row['location'];
            $this->venue = $row['venue'];
            $this->image = $row['image'];
            $this->agenda = $row['agenda'];
            $this->speakers = $row['speakers'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            return true;
        }
        return false;
    }

    function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                (title, description, category, status, date, time, location, venue, image, agenda, speakers, created_at, updated_at)
                VALUES
                (:title, :description, :category, :status, :date, :time, :location, :venue, :image, :agenda, :speakers, datetime('now'), datetime('now'))";
        
        $stmt = $this->conn->prepare($query);
        
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->date = htmlspecialchars(strip_tags($this->date));
        $this->time = htmlspecialchars(strip_tags($this->time));
        $this->location = htmlspecialchars(strip_tags($this->location));
        $this->venue = htmlspecialchars(strip_tags($this->venue));
        $this->image = htmlspecialchars(strip_tags($this->image));
        
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":date", $this->date);
        $stmt->bindParam(":time", $this->time);
        $stmt->bindParam(":location", $this->location);
        $stmt->bindParam(":venue", $this->venue);
        $stmt->bindParam(":image", $this->image);
        $stmt->bindParam(":agenda", $this->agenda);
        $stmt->bindParam(":speakers", $this->speakers);
        
        if($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    function update() {
        $query = "UPDATE " . $this->table_name . " 
                SET title=:title, description=:description, category=:category, status=:status,
                    date=:date, time=:time, location=:location, venue=:venue, image=:image,
                    agenda=:agenda, speakers=:speakers, updated_at=datetime('now')
                WHERE id=:id";
        
        $stmt = $this->conn->prepare($query);
        
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->date = htmlspecialchars(strip_tags($this->date));
        $this->time = htmlspecialchars(strip_tags($this->time));
        $this->location = htmlspecialchars(strip_tags($this->location));
        $this->venue = htmlspecialchars(strip_tags($this->venue));
        $this->image = htmlspecialchars(strip_tags($this->image));
        $this->id = htmlspecialchars(strip_tags($this->id));
        
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":date", $this->date);
        $stmt->bindParam(":time", $this->time);
        $stmt->bindParam(":location", $this->location);
        $stmt->bindParam(":venue", $this->venue);
        $stmt->bindParam(":image", $this->image);
        $stmt->bindParam(":agenda", $this->agenda);
        $stmt->bindParam(":speakers", $this->speakers);
        $stmt->bindParam(":id", $this->id);
        
        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);
        
        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>