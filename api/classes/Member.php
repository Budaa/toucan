<?php
/**
 * Members class
 *
 */
class Members
{
  public $name, $email;

  function __construct($name, $email)
  {
    $this->name = $name;
    $this->email = $email;
  }
}

?>
