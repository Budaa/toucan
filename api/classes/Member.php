<?php
/**
 * Member class
 *
 */
class Member
{
  public $id, $name, $email;

  function __construct($id, $name, $email)
  {
    $this->id = $id;
    $this->name = $name;
    $this->email = $email;
  }
}

?>
