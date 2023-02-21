


<?php

  require_once ('cnx.class.php');

  class DAO_comments {
    private $cnx = null;
    private $openCnx = null;

    const HOST = 'mysql:host=localhost;dbname=blog';
    const LOGIN = 'xavier';
    const PASSWORD = '@xav.mamy31';

    public function cnx() {
      $this -> cnx = new Dbcnx(self::HOST, self::LOGIN, self::PASSWORD);
      $this -> openCnx = $this -> cnx -> openConnexion();
    }

    public function getAllComments($id) {
      $this -> cnx();
      $sql = 'SELECT comments.account_id, id_comment, created_at, moderated, content, article_id, pseudo 
              FROM comments 
              INNER JOIN accounts 
              ON accounts.id_account = comments.account_id 
              WHERE (moderated = 0 AND article_id = :id)';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id', $id);
      $request -> execute();
      $data = $request -> fetchAll();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function modo_getAllComments($id) {
      $this -> cnx();
      $sql = 'SELECT comments.account_id, id_comment, created_at, moderated, content, article_id, pseudo 
              FROM comments 
              INNER JOIN accounts 
              ON accounts.id_account = comments.account_id 
              WHERE (article_id = :id)';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id', $id);
      $request -> execute();
      $data = $request -> fetchAll();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function getComment($id) {
      $this -> cnx();
      $sql = 'SELECT `content`, `id_comment`, `moderated` 
              FROM comments 
              WHERE moderated = 0
              AND id_comment = :id';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id', $id);
      $request -> execute();
      $data = $request -> fetch();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function modo_getComment($id) {
      $this -> cnx();
      $sql = 'SELECT `content`, `id_comment`, `moderated` 
              FROM comments 
              WHERE id_comment = :id';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id', $id);
      $request -> execute();
      $data = $request -> fetch();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function updateComment($receiveData) {
      $this -> cnx();
      $sql = 'UPDATE `comments`
              SET `content` = :content
              WHERE `comments`.`id_comment` = :id_comment';
      $request = $this -> openCnx -> prepare($sql);
      $data = array(
        ':content' => $receiveData -> content,
        ':id_comment' => $receiveData -> id_comment,
      );
      $bool = $request -> execute($data);
      $request -> execute();
      $this -> cnx -> closeConnexion();
      return $bool;
    }

    public function insertComment($receiveData) {
      $this -> cnx();
      $sql = 'INSERT INTO `comments` (`account_id`, `article_id`, `moderated`, `content`) 
              VALUES (:id_user, :id_art, :is_moderated, :content)';
      $request = $this -> openCnx -> prepare($sql);
      $data = array(
        ':id_user' => $receiveData -> id_user,
        ':id_art' => $receiveData -> id_article,
        ':is_moderated' => $receiveData -> is_moderated,
        ':content' => $receiveData -> content,
      );
      $bool = $request -> execute($data);
      $this -> cnx -> closeConnexion();
      return $bool;
    }

    public function set_comment_is_mod_to_1($id) {
      $this -> cnx();
      $sql = 'UPDATE `comments` 
              SET `moderated` = 1 
              WHERE `comments`.`id_comment` = :id_comment';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id_comment', $id);
      $bool = $request -> execute();
      $this -> cnx -> closeConnexion();
      return $bool;
    }

    public function modo_deleteComment($id) {
      $this -> cnx();
      $sql = 'DELETE FROM `comments` 
              WHERE `comments`.`id_comment` = :id_comment';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id_comment', $id);
      $bool = $request -> execute();
      $this -> cnx -> closeConnexion();
      return $bool;
    }

    public function set_comm_is_mod_to($id, $set) {
      $this -> cnx();
      $sql = 'UPDATE `comments` 
              SET `moderated` = :set_mod 
              WHERE `comments`.`id_comment` = :id_comment';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':set_mod', $set);
      $request -> bindValue(':id_comment', $id);
      $bool = $request -> execute();
      $this -> cnx -> closeConnexion();
      return $bool;
    }
  }


?>