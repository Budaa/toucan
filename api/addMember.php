<?php
  include 'classes/Config.php';
  include 'classes/Member.php';
//DATA VALIDATION

//If there is any data missing
  if(!isset($_GET['name']) or !isset($_GET['email'])){
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

//SET name and email variable
  $name = ucwords( strtolower( trim( $_GET['name'] ) ) );
  $email = strtolower( trim( $_GET['email'] ) );
  echo $name . "<br>" . $email;
?>
