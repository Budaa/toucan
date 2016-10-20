<?php
//Loading config file
include 'classes/Config.php';
$Config = new Config;


//Conncecting to database
$conn = new mysqli($Config->host, $Config->username, $Config->password);

// Checking Connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


class Data {
    public $a = 'a';
    public $b = 'def';
  };

  $result = new Data;
  echo json_encode($result);
?>
