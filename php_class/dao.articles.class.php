<?php

  require_once ('cnx.config.php');

  class DAO_articles extends Cnx_config {

    public function getAllArticles() {
      $this -> cnx();
      $sql = 'SELECT `title`, `created_at`, `moderated`, `content`, 
      `pseudo`, `articles`.`id_article`, `accounts`.`id_account` 
              FROM articles 
              INNER JOIN accounts 
              ON articles.account_id = accounts.id_account 
              WHERE (moderated = 0) 
              ORDER BY articles.created_at DESC';
      $request = $this -> openCnx -> prepare($sql);
      $request -> execute();
      $data = $request -> fetchAll();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function modo_getAllArticles() {
      $this -> cnx();
      $sql = 'SELECT `title`, `created_at`, `moderated`, `content`, 
      `pseudo`, `articles`.`id_article`, `accounts`.`id_account` 
              FROM articles 
              INNER JOIN accounts 
              ON articles.account_id = accounts.id_account 
              ORDER BY articles.created_at DESC';
      $request = $this -> openCnx -> prepare($sql);
      $request -> execute();
      $data = $request -> fetchAll();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function getArticle($id) {
      $this -> cnx();
      $sql = 'SELECT `title`, `content`, `id_article`, `moderated` 
              FROM articles 
              WHERE moderated = 0
              AND id_article = :id_article';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id_article', $id);
      $request -> execute();
      $data = $request -> fetch();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function modo_getArticle($id) {
      $this -> cnx();
      $sql = 'SELECT `title`, `content`, `id_article`, `moderated` 
              FROM articles 
              WHERE id_article = :id_article';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id_article', $id);
      $request -> execute();
      $data = $request -> fetch();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function updateArticle($receiveData) {
      $this -> cnx();
      $sql = 'UPDATE `articles`
              SET `title` = :title, `content` = :content
              WHERE `articles`.`id_article` = :id_article';
      $request = $this -> openCnx -> prepare($sql);
      $data = array(
        ':title' => $receiveData -> title,
        ':content' => $receiveData -> content,
        ':id_article' => $receiveData -> id_article,
      );
      $bool = $request -> execute($data);
      $request -> execute();
      $this -> cnx -> closeConnexion();
      return $bool;
    }


    public function insertArticle($receiveData) {
      $this -> cnx();
      $sql = 'INSERT INTO `articles` (`account_id`, `title`, `moderated`, `content`) 
              VALUES (:id_user, :title, :is_moderated, :content)';
      $request = $this -> openCnx -> prepare($sql);
      // --- Other way to bind values : with an Associative Array --- //
      $data = array(
        ':id_user' => $receiveData -> id_user,
        ':title' => $receiveData -> title,
        ':is_moderated' => $receiveData -> is_moderated,
        ':content' => $receiveData -> content,
      );
      $bool = $request -> execute($data);
      $this -> cnx -> closeConnexion();
      return $bool;
    }


    public function set_article_is_mod_to_1($id) {
      $this -> cnx();
      $sql = 'UPDATE `articles` 
              SET `moderated` = 1 
              WHERE `articles`.`id_article` = :id_article';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id_article', $id);
      $bool = $request -> execute();
      $this -> cnx -> closeConnexion();
      return $bool;
    }


    public function modo_deleteArticle($id) {
      $this -> cnx();
      $sql = 'DELETE FROM `articles` 
              WHERE `articles`.`id_article` = :id_article';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id_article', $id);
      $bool = $request -> execute();
      $this -> cnx -> closeConnexion();
      return $bool;
    }

    public function set_art_is_mod_to($id, $set) {
      $this -> cnx();
      $sql = 'UPDATE `articles` 
              SET `moderated` = :set_mod 
              WHERE `articles`.`id_article` = :id_article';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':set_mod', $set);
      $request -> bindValue(':id_article', $id);
      $bool = $request -> execute();
      $this -> cnx -> closeConnexion();
      return $bool;
    }

  }

  // ---------------------------------------------------------- //
  // ----------- TEMPLATE DE REQUETE SQL QUI TUE !! ----------- //
  // ---------------------------------------------------------- //
  // $sql = 'SELECT articles.id_article,title,content,articles.creation_date,articles.is_moderated,username,comments_nb 
  // FROM articles 
  // INNER JOIN users 
  // ON articles.id_user = users.id_user 
  // LEFT JOIN ( SELECT comments.id_article, COUNT(*) 
              // AS comments_nb 
              // FROM comments 
              // GROUP BY comments.id_article ) comments 
  // ON articles.id_article = comments.id_article';


?>