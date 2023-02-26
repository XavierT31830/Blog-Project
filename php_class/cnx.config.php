<?php

  require_once ('cnx.class.php');

  class Cnx_config {
    protected $cnx = null;
    protected $openCnx = null;

    const HOST = 'mysql:host=localhost;dbname=blog';
    const LOGIN = 'xavier';
    const PASSWORD = '@xav.mamy31';

    protected function cnx() {
      $this -> cnx = new Dbcnx(self::HOST, self::LOGIN, self::PASSWORD);
      $this -> openCnx = $this -> cnx -> openConnexion();
    }
  }

?>