<?php
/**
 * School Class
 */
class School
{
  public $id, $name;
  private $members = [];
  function __construct($id, $name)
  {
    $this->id = $id;
    $this->name = $name;
  }

  public function addMember ($member) {
    array_push($this->members, $member);
  }

  public function showMembers ($member) {
    return $this->members;
  }
}

 ?>
