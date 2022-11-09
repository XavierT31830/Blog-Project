


<?php

  require ('../php_class/dao.users.class.php');
  require ('../php_class/dao.articles.class.php');
  require ('../php_class/dao.comments.class.php');
  require ('back_security.php');
  require ('verif_data.php');
  $receiveData = json_decode(file_get_contents('php://input'));
  $action = $receiveData -> action;

  switch ($action) {

    case 'displayAllArticles':
      $dao = new DAO_articles();
      $data = $dao -> getAllArticles();
      echo json_encode($data);
      break;

    case 'modo_displayAllArticles':
      $dao = new DAO_articles();
      $data = $dao -> modo_getAllArticles();
      echo json_encode($data);
      break;

    case 'displayAllComments':
      $dao = new DAO_comments();
      $data = $dao -> getAllComments($receiveData -> id);
      echo json_encode($data);
      break;

    case 'modo_displayAllComments':
      $dao = new DAO_comments();
      $data = $dao -> modo_getAllComments($receiveData -> id);
      echo json_encode($data);
      break;

    case 'logIn':
      $dao = new DAO_users();
      $pseudo = $receiveData -> pseudo;
      $pwdUser = $receiveData -> pwd;
      if (verifPseudo($pseudo) == 1) {
        $data = $dao -> getUser($pseudo);
        if ($data == false) {
          $msg_insert = 'This Pseudo doesn\'t exist!';
        }
        else {       
          if (verifPwd($pwdUser) == 1) {
            $pwdData = ($data['pwd']);
            $verify = password_verify($pwdUser, $pwdData);
            if ($verify) {
              echo json_encode($data);
              break;
            }
            else {
              $msg_insert = 'Incorrect Password!';
            }
          }
          else {
            $msg_insert = verifPwd($pwdUser);
          }
        }
      }
      else {
        $msg_insert = verifPseudo($pseudo);
      }
      echo json_encode($msg_insert);
      break;

    case 'signUp':
      $dao = new DAO_users();
      $pseudo = $receiveData -> pseudo;
      $firstname = $receiveData -> firstname;
      $email = $receiveData -> email;
      $pwd = $receiveData -> pwd;
      $pwdConfirm = $receiveData -> pwdConfirm;
      if (verifPseudo($pseudo) == 1 && verifFirstname($firstname) == 1 && verifEmail($email) == 1 && verifPwd($pwd) == 1 && verifPwd($pwdConfirm) == 1) {
        if ($pwd != $pwdConfirm) {
          $msg_insert = 'Password confirmation is incorrect!';
        }
        else {
          $pseudo = security($receiveData -> pseudo);
          $firstname = security($receiveData -> firstname);
          $email = security($receiveData -> email);
          $pwd = security($receiveData -> pwd);
          $receiveData -> pwd = password_hash($receiveData -> pwd, PASSWORD_DEFAULT);
          $bool = $dao -> insertUser($receiveData);
          if ($bool) {
            $msg_insert = 'New user correctly registered!';
          }
          else {
            $msg_insert = 'User already exists!';
          }
        }
      }
      else {
        if (verifPseudo($pseudo) != 1) {
          $msg_insert = verifPseudo($pseudo);
        }
        else if (verifFirstname($firstname) != 1) {
          $msg_insert = verifFirstname($firstname);
        }
        else if (verifEmail($email) != 1) {
          $msg_insert = verifEmail($email);
        }
        else if (verifPwd($pwd) != 1) {
          $msg_insert = verifPwd($pwd);
        }
        else if (verifPwd($pwdConfirm) != 1) {
          $msg_insert = 'Invalid Password Confirmation!</br></br>- (requires) at least one lower case</br>- (requires) at least one upper case</br>- (requires) 8 characters minimum</br>- (requires) one special character</br>- accents and numbers are allowed</br>- 100 characters Maximum';
        }
      }
      echo json_encode($msg_insert);
      break;

    case 'addNewArticle':
      $dao = new DAO_articles();
      $title = security($receiveData -> title);
      $content = security($receiveData -> content);
      if (verifTitleArticle($title) != 1) {
        $msg_insert = verifTitleArticle($title);
      }
      else {
        $data = $dao -> insertArticle($receiveData);
        if ($data) {
          $msg_insert = 'Article correctly added!';
        }
        else {
          $msg_insert = 'Error on adding article!';
        }
      }
      echo json_encode($msg_insert);
      break;

    case 'getArticle':
      $dao = new DAO_articles();
      $id = $receiveData -> id_article;
      $data = $dao -> getArticle($id);
      if ($data) {
        echo json_encode($data);
      }
      else {
        $msg_insert = 'Error on getting Article from Database!';
        echo json_encode($msg_insert);
      }
      break;

    case 'moderator_getArticle':
      $dao = new DAO_articles();
      $id = $receiveData -> id_article;
      $data = $dao -> modo_getArticle($id);
      if ($data) {
        echo json_encode($data);
      }
      else {
        $msg_insert = 'Error on getting Article from Database!';
        echo json_encode($msg_insert);
      }
      break;
    
    case 'updateArticle':
      $dao = new DAO_articles();
      $title = security($receiveData -> title);
      $content = security($receiveData -> content);
      if (verifTitleArticle($title) != 1) {
        $msg_insert = verifTitleArticle($title);
      }
      else {
        $data = $dao -> updateArticle($receiveData);
        if ($data) {
          $msg_insert = 'Article correctly updated!';
        }
        else {
          $msg_insert = 'Error on updating article!';
        }
      }
      echo json_encode($msg_insert);
      break;

    case 'deleteArticle':
      $dao = new DAO_articles();
      $id_article = $receiveData -> id_article;
      $data = $dao -> set_article_is_mod_to_1($id_article);
      if ($data) {
        $msg_insert = 'Your request to delete this article</br>has been sent to a moderator!';
      }
      else {
        $msg_insert = 'Error in article deletion request!';
      }
      echo json_encode($msg_insert);
      break;

    case 'moderator_deleteArticle':
      $dao = new DAO_articles();
      $id_article = $receiveData -> id_article;
      $data = $dao -> modo_deleteArticle($id_article);
      if ($data) {
        $msg_insert = 'Article correctly deleted!';
      }
      else {
        $msg_insert = 'Error in article deletion!';
      }
      echo json_encode($msg_insert);
      break;

    case 'addNewComment':
      $dao = new DAO_comments();
      $data = $dao -> insertComment($receiveData);
      if ($data) {
        $msg_insert = 'Comment correctly added!';
      }
      else {
        $msg_insert = 'Error in adding your comment!';
      }
      echo json_encode($msg_insert);
      break;

    case 'getComment':
      $dao = new DAO_comments();
      $id = $receiveData -> id_comment;
      $data = $dao -> getComment($id);
      if ($data) {
        echo json_encode($data);
      }
      else {
        $msg_insert = 'Error on getting Comment from Database!';
        echo json_encode($msg_insert);
      }
      break;

    case 'moderator_getComment':
      $dao = new DAO_comments();
      $id = $receiveData -> id_comment;
      $data = $dao -> modo_getComment($id);
      if ($data) {
        echo json_encode($data);
      }
      else {
        $msg_insert = 'Error on getting Comment from Database!';
        echo json_encode($msg_insert);
      }
      break;

    case 'updateComment':
      $dao = new DAO_comments();
      $content = security($receiveData -> content);
      $data = $dao -> updateComment($receiveData);
      if ($data) {
        $msg_insert = 'Comment correctly updated!';
      }
      else {
        $msg_insert = 'Error on updating comment!';
      }
      echo json_encode($msg_insert);
      break;

    case 'deleteComment':
      $dao = new DAO_comments();
      $id_comment = $receiveData -> id_comment;
      $data = $dao -> set_comment_is_mod_to_1($id_comment);
      if ($data) {
        $msg_insert = 'Your request to delete this comment</br>has been sent to a moderator!';
      }
      else {
        $msg_insert = 'Error in comment deletion request!';
      }
      echo json_encode($msg_insert);
      break;

    case 'moderator_deleteComment':
      $dao = new DAO_comments();
      $id_comment = $receiveData -> id_comment;
      $data = $dao -> modo_deleteComment($id_comment);
      if ($data) {
        $msg_insert = 'Comment correctly deleted!';
      }
      else {
        $msg_insert = 'Error in comment deletion!';
      }
      echo json_encode($msg_insert);
      break;

    case 'art_switch_to_1':
      $dao = new DAO_articles();
      $id_article = $receiveData -> id_article;
      $set = $receiveData -> set_mod;
      $data = $dao -> set_art_is_mod_to($id_article, $set);
      if ($data) {
        $msg_insert = 'Article correctly set to : is_mod_1!';
      }
      else {
        $msg_insert = 'Error in article setting moderated request!';
      }
      echo json_encode($msg_insert);
      break;

    case 'art_switch_to_0':
      $dao = new DAO_articles();
      $id_article = $receiveData -> id_article;
      $set = $receiveData -> set_mod;
      $data = $dao -> set_art_is_mod_to($id_article, $set);
      if ($data) {
        $msg_insert = 'Article correctly set to : is_mod_0!';
      }
      else {
        $msg_insert = 'Error in article setting moderated request!';
      }
      echo json_encode($msg_insert);
      break;

    case 'comm_switch_to_1':
      $dao = new DAO_comments();
      $id_comment = $receiveData -> id_comment;
      $set = $receiveData -> set_mod;
      $data = $dao -> set_comm_is_mod_to($id_comment, $set);
      if ($data) {
        $msg_insert = 'Comment correctly set to : is_mod_1!';
      }
      else {
        $msg_insert = 'Error in comment setting moderated request!';
      }
      echo json_encode($msg_insert);
      break;

    case 'comm_switch_to_0':
      $dao = new DAO_comments();
      $id_comment = $receiveData -> id_comment;
      $set = $receiveData -> set_mod;
      $data = $dao -> set_comm_is_mod_to($id_comment, $set);
      if ($data) {
        $msg_insert = 'Comment correctly set to : is_mod_0!';
      }
      else {
        $msg_insert = 'Error in Comment setting moderated request!';
      }
      echo json_encode($msg_insert);
      break;

    default:
      # code...
      break;
  }

?>