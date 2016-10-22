<?php
//Loading config file
include 'classes/Config.php';
include 'classes/Member.php';
$Config = new Config;
$return = [];


//TODO check valid id's in the database
if(preg_match('/[^[1-6]]+/', $_GET['name'])){
  die(json_encode("Only valid school id numer allowed!"));
}
$school_id = trim($_GET['school']);

//Conncecting to database
$conn = new mysqli($Config->host, $Config->username, $Config->password, $Config->db);

// Checking Connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
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
