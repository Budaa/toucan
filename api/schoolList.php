<?php

include "classes/Config.php";
include "classes/School.php";

$Config = new Config;
$return = [];

//Conncecting to database
$conn = new mysqli($Config->host, $Config->username, $Config->password, $Config->db);

// Checking Connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

//Query to get list of schools
$sql = "SELECT * FROM school";
$result = $conn->query($sql);
//IF there is no rows
if ($result->num_rows > 0) {
  //Cycle through results
  while($row = $result->fetch_object()) {
    //Creating School Object
    $School = new School($row->id, $row->name);
    //Pushing school object into $return array
    array_push($return, $School);
    unset($School);
  }
} else {
  $return = 0;
}

//Display result
echo json_encode($return);
?>
