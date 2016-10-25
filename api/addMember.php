<?php
  include 'classes/Config.php';
  include 'classes/Member.php';

//BASIC Variables
  $Config = new Config;
//DATA VALIDATION

//If there is any data missing
  if(!isset($_GET['name']) || !isset($_GET['email']) || !isset($_GET['school'])){
    die(json_encode("You didin't provide enough data to create new member"));
  }

//If email is invalid:
  if(!filter_var($_GET['email'], FILTER_VALIDATE_EMAIL)){
    die(json_encode("Provided E-mail address isn't valid."));
  }

//If name is invalid:
  if(preg_match('/[^A-Za-z\s]+/', $_GET['name'])){
    die(json_encode("Only english letters and space allowed!"));
  }

//If strings are too long
  if( strlen($_GET['name']) > 50 || strlen($_GET['email'] > 50) ) {
    die(json_encode("Inputs can not be longer than 50 charactes!"));
  }

  if(preg_match('/[^[0-9]]+/', $_GET['school'])){
    die(json_encode("Only valid school id numer allowed!"));
  }
//SET name and email variable
  $name = ucwords( strtolower( trim( $_GET['name'] ) ) );
  $email = strtolower( trim( $_GET['email'] ) );
  $school = trim( $_GET['school'] );


//DATABASE CONNECTION
  $conn = new mysqli($Config->host, $Config->username, $Config->password, $Config->db);
  //check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

//VALIDATION ON DATABASE
  //Check if there is an email in database:
  $sql = "SELECT email FROM member WHERE email='$email'";
  $result = $conn->query($sql);

  //DIE if email already exist
  if(mysqli_num_rows($result) > 0){
    die("Error: provided email addres already exist in our database!");
  }

  //Check if school id exist in database
  $sql = "SELECT id FROM school WHERE id=$school";
  $result = $conn->query($sql);

  //DIE if school doesnt exist
  if(mysqli_num_rows($result) == 0){
    die("Error: provided school id doesnt exist in our database!");
  }
//ADDING NEW RECORDS
  //insert new member
  $sql = "INSERT INTO member (name, email) VALUES ('$name', '$email')";
  //if succed
  if( $conn->query($sql) === TRUE) {
    //Select new member id
    $sql = "SELECT id FROM member WHERE email='$email'";
    $result = $conn->query($sql);
    $userId = $result->fetch_assoc();
    //Assign new user id to variable
    $userId = $userId['id'];
    //Connect new member to choosen school
    $sql = "INSERT INTO school_member (school_id, member_id) VALUES($school, $userId)";
    if( $conn->query($sql) === TRUE) {
      echo 1;
    }else {
      echo "Error: " . $conn->error;
    }
  }else {
    echo "Error: " . $conn->error;
  }

?>
