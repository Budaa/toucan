<?php
//Loading config file
include 'classes/Config.php';
include 'classes/Member.php';
$Config = new Config;
$return = [];


if(preg_match('/[^[0-9]]+/', $_GET['school'])){
  die(json_encode("Only valid school id numer allowed!"));
}
$school_id = trim($_GET['school']);

//Conncecting to database
$conn = new mysqli($Config->host, $Config->username, $Config->password, $Config->db);

// Checking Connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

//Check if school id exist in database
$sql = "SELECT id FROM school WHERE id=$school_id";
$result = $conn->query($sql);

//DIE if school doesnt exist
if(mysqli_num_rows($result) == 0){
  die("Error: provided school id doesnt exist in our database!");
}

//Query to get names of
$sql = "SELECT member.id, member.name, member.email FROM school_member INNER JOIN member ON school_member.member_id  = member.id WHERE school_member.school_id = $school_id ORDER BY member.name ASC";
$result = $conn->query($sql);

//IF there is no rows
if ($result->num_rows > 0) {
  //Cycle through results
  while($row = $result->fetch_assoc()) {
    //Creating Member Object
    $Member = new Member($row['id'], $row['name'], $row['email']);
    //Pushing member object into $return array
    array_push($return, $Member);
    unset($Member);
  }
} else {
  $return = 0;
}
  //Display result
  echo json_encode($return);
?>
