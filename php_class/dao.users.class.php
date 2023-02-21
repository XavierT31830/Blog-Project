


<?php

  require_once ('cnx.class.php');

  class DAO_users {
    private $cnx = null;
    private $openCnx = null;

    const HOST = 'mysql:host=localhost;dbname=blog';
    const LOGIN = 'xavier';
    const PASSWORD = '@xav.mamy31';

    public function cnx() {
      $this -> cnx = new Dbcnx(self::HOST, self::LOGIN, self::PASSWORD);
      $this -> openCnx = $this -> cnx -> openConnexion();
    }

    public function getUser($pseudo) {
      $this -> cnx();
      $sql = 'SELECT * FROM blog.accounts 
              INNER JOIN roles 
              ON accounts.role_id = roles.id_role 
              WHERE BINARY `accounts`.`pseudo` = :pseudo';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':pseudo', $pseudo);
      $request -> execute();
      $data = $request -> fetch();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function insertUser($receiveData) {
      $this -> cnx();
      $sql = 'INSERT INTO `accounts` (`pseudo`, `firstname`, `email`, `pwd`, `role_id`) 
              VALUES (:pseudo, :firstname, :email, :pwd, :role_id)';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':pseudo', $receiveData -> pseudo);
      $request -> bindValue(':firstname', $receiveData -> firstname);
      $request -> bindValue(':email', $receiveData -> email);
      $request -> bindValue(':pwd', $receiveData -> pwd);
      $request -> bindValue(':role_id', '5');
      $bool = $request -> execute();
      $this -> cnx -> closeConnexion();
      return $bool;
    }
  }

?>