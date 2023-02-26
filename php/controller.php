<?php

  require('../php_class/dao.users.class.php');
  require('../php_class/dao.articles.class.php');
  require('../php_class/dao.comments.class.php');
  require('back_security.php');
  require('verif_data.php');
  $receiveData = json_decode(file_get_contents('php://input'));
  $action = $receiveData -> action;

  actionSwitch($action, $receiveData);

  function actionSwitch($action, $receiveData) {
    switch ($action) {
      //-----------------------------------------------------------------------------------------------//
      case 'displayAllArticles':
        $msg_insert = dataAll('DAO_articles', 'getAllArticles');
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'modo_displayAllArticles':
        $msg_insert = dataAll('DAO_articles', 'modo_getAllArticles');
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'displayAllComments':
        $msg_insert = dataById($receiveData, 'DAO_comments', 'getAllComments', 'id');
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'modo_displayAllComments':
        $msg_insert = dataById($receiveData, 'DAO_comments', 'modo_getAllComments', 'id');
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'logIn':
        $msg_insert = logIn($receiveData, 'DAO_users', 'getUser');
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'signUp':
        $msg_insert = signUp($receiveData, 'DAO_users', 'insertUser');
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'getArticle':
        $data = dataById($receiveData, 'DAO_articles', 'getArticle', 'id_article');
        $msg_insert = msg_insert($data, $action);
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'moderator_getArticle':
        $data = dataById($receiveData, 'DAO_articles', 'modo_getArticle', 'id_article');
        $msg_insert = msg_insert($data, $action);
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'getComment':
        $data = dataById($receiveData, 'DAO_comments', 'getComment', 'id_comment');
        $msg_insert = msg_insert($data, $action);
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'moderator_getComment':
        $data = dataById($receiveData, 'DAO_comments', 'modo_getComment', 'id_comment');
        $msg_insert = msg_insert($data, $action);
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'addNewArticle':
        $msg_insert = articleAddUpdate($receiveData, 'DAO_articles', 'insertArticle', 'addNewArticle');
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'updateArticle':
        $msg_insert = articleAddUpdate($receiveData, 'DAO_articles', 'updateArticle', 'updateArticle');
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'deleteArticle':
        $data = dataById($receiveData, 'DAO_articles', 'set_article_is_mod_to_1', 'id_article');
        $msg_insert = msg_insert($data, $action);
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'moderator_deleteArticle':
        $data = dataById($receiveData, 'DAO_articles', 'modo_deleteArticle', 'id_article');
        $msg_insert = msg_insert($data, $action);
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'addNewComment':
        $data = commentAddUpdate($receiveData, 'DAO_comments', 'insertComment');
        $msg_insert = msg_insert($data, $action);
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'updateComment':
        $data = commentAddUpdate($receiveData, 'DAO_comments', 'updateComment');
        $msg_insert = msg_insert($data, $action);
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'deleteComment':
        $data = dataById($receiveData, 'DAO_comments', 'set_comment_is_mod_to_1', 'id_comment');
        $msg_insert = msg_insert($data, $action);
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'moderator_deleteComment':
        $data = dataById($receiveData, 'DAO_comments', 'modo_deleteComment', 'id_comment');
        $msg_insert = msg_insert($data, $action);
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'art_switch_to_1':
        $data = dataSwitch($receiveData, 'DAO_articles', 'set_art_is_mod_to', 'id_article');
        $msg_insert = msg_insert($data, $action);
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'art_switch_to_0':
        $data = dataSwitch($receiveData, 'DAO_articles', 'set_art_is_mod_to', 'id_article');
        $msg_insert = msg_insert($data, $action);
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'comm_switch_to_1':
        $data = dataSwitch($receiveData, 'DAO_comments', 'set_comm_is_mod_to', 'id_comment');
        $msg_insert = msg_insert($data, $action);
        break;
      //-----------------------------------------------------------------------------------------------//
      case 'comm_switch_to_0':
        $data = dataSwitch($receiveData, 'DAO_comments', 'set_comm_is_mod_to', 'id_comment');
        $msg_insert = msg_insert($data, $action);
        break;
      //-----------------------------------------------------------------------------------------------//
      default:
        $msg_insert = 'Controller -> Switch Case null! (dflt msg)';
        break;
      //-----------------------------------------------------------------------------------------------//
    }
    echo json_encode($msg_insert);
  }

  function logIn($receiveData, $class, $func) {
    $dao = new $class();
    $pseudo = $receiveData -> pseudo;
    $pwdUser = $receiveData -> pwd;
    if (verifPseudo($pseudo) == 1) {
      $data = $dao -> $func($pseudo);
      // Pseudo OK = SUCCESS to getting user in order to test its existence
      if ($data == false) {
        $msg = 'This Pseudo doesn\'t exist!';
      }
      else {       
        if (verifPwd($pwdUser) == 1) {
          $pwdData = ($data['pwd']);
          $verify = password_verify($pwdUser, $pwdData);
          if ($verify) {
            $msg = $data;
            // Password Ok = SUCCESSFULLY LOGGED IN
          }
          else {
            $msg = 'Incorrect Password!';
          }
        }
        else {
          $msg = verifPwd($pwdUser);
        }
      }
    }
    else {
      $msg = verifPseudo($pseudo);
    }
    return $msg;
  }

  function signUp($receiveData, $class, $func) {
    $dao = new $class();
    $pseudo = $receiveData -> pseudo;
    $firstname = $receiveData -> firstname;
    $email = $receiveData -> email;
    $pwd = $receiveData -> pwd;
    $pwdConfirm = $receiveData -> pwdConfirm;
    if (verifPseudo($pseudo) == 1 && verifFirstname($firstname) == 1 && verifEmail($email) == 1 && verifPwd($pwd) == 1 && verifPwd($pwdConfirm) == 1) {
      if ($pwd != $pwdConfirm) {
        $msg = 'Password confirmation is incorrect!';
      }
      else {
        $pseudo = security($receiveData -> pseudo);
        $firstname = security($receiveData -> firstname);
        $email = security($receiveData -> email);
        $pwd = security($receiveData -> pwd);
        $receiveData -> pwd = password_hash($receiveData -> pwd, PASSWORD_DEFAULT);
        $bool = $dao -> $func($receiveData); 
        // Checking Data Ok = SUCCESS to send request in order to test its existence
        if ($bool) {
          $msg = 'New user correctly registered!'; 
          // SUCCESSFULLY REGISTERED
        }
        else {
          $msg = 'User already exists!';
        }
      }
    }
    else {
      if (verifPseudo($pseudo) != 1) {
        $msg = verifPseudo($pseudo);
      }
      else if (verifFirstname($firstname) != 1) {
        $msg = verifFirstname($firstname);
      }
      else if (verifEmail($email) != 1) {
        $msg = verifEmail($email);
      }
      else if (verifPwd($pwd) != 1) {
        $msg = verifPwd($pwd);
      }
      else if (verifPwd($pwdConfirm) != 1) {
        $msg = 'Invalid Password Confirmation!</br></br>- (requires) at least one lower case</br>- (requires) at least one upper case</br>- (requires) 8 characters minimum</br>- (requires) one special character</br>- accents and numbers are allowed</br>- 100 characters Maximum';
      }
    }
    return $msg;
    
  }

  function dataAll($class, $func) {
    $dao = new $class();
    $data = $dao -> $func();
    return $data;
  }

  function dataById($receiveData, $class, $func, $id) {
    $dao = new $class();
    $data = $dao -> $func($receiveData -> $id);
    return $data;
  }

  function articleAddUpdate($receiveData, $class, $func, $action) {
    $dao = new $class();
    $title = security($receiveData -> title);
    $content = security($receiveData -> content);
    if (verifTitleArticle($title) != 1) {
      $msg = verifTitleArticle($title);
    }
    else {
      $data = $dao -> $func($receiveData);
      $msg = msg_insert($data, $action);
    }
    return $msg;
  }

  function commentAddUpdate($receiveData, $class, $func) {
    $dao = new $class();
    $content = security($receiveData -> content);
    $data = $dao -> $func($receiveData);
    return $data;
  }

  function dataSwitch($receiveData, $class, $func, $id) {
    $dao = new $class();
    $idToSend = $receiveData -> $id;
    $set = $receiveData -> set_mod;
    $data = $dao -> $func($idToSend, $set);
    return $data;
  }

  function msg_insert($data, $action) {
    switch ($action) {
      //---------------------------------------------------------------------//
      case 'getArticle':
        $success = $data;
        $error = 'Error on getting Article from Database!';
        break;
      //---------------------------------------------------------------------//
      case 'moderator_getArticle':
        $success = $data;
        $error = 'Error on getting Article from Database!';
        break;
      //---------------------------------------------------------------------//
      case 'getComment':
        $success = $data;
        $error = 'Error on getting Comment from Database!';
        break;
      //---------------------------------------------------------------------//
      case 'moderator_getComment':
        $success = $data;
        $error = 'Error on getting Comment from Database!';
        break;
      //---------------------------------------------------------------------//
      case 'addNewArticle':
        $success = 'Article correctly added!';
        $error = 'Error on adding article!';
        break;
      //---------------------------------------------------------------------//
      case 'updateArticle':
        $success = 'Article correctly updated!';
        $error = 'Error on updating article!';
        break;
      //---------------------------------------------------------------------//
      case 'deleteArticle':
        $success = 'Your request to delete this article</br>has been sent to a moderator!';
        $error = 'Error in article deletion request!';
        break;
      //---------------------------------------------------------------------//
      case 'moderator_deleteArticle':
        $success = 'Article correctly deleted!';
        $error = 'Error in article deletion!';
        break;
      //---------------------------------------------------------------------//
      case 'addNewComment':
        $success = 'Comment correctly added!';
        $error = 'Error in adding your comment!';
        break;
      //---------------------------------------------------------------------//
      case 'updateComment':
        $success = 'Comment correctly updated!';
        $error = 'Error on updating comment!';
        break;
      //---------------------------------------------------------------------//
      case 'deleteComment':
        $success = 'Your request to delete this comment</br>has been sent to a moderator!';
        $error = 'Error in comment deletion request!';
        break;
      //---------------------------------------------------------------------//
      case 'moderator_deleteComment':
        $success = 'Comment correctly deleted!';
        $error = 'Error in comment deletion!';
        break;
      //---------------------------------------------------------------------//
      case 'art_switch_to_1':
        $success = 'Article correctly set to : is_mod_1!';
        $error = 'Error in article setting moderated request!';
        break;
      //---------------------------------------------------------------------//
      case 'art_switch_to_0':
        $success = 'Article correctly set to : is_mod_0!';
        $error = 'Error in article setting moderated request!';
        break;
      //---------------------------------------------------------------------//
      case 'comm_switch_to_1':
        $success = 'Comment correctly set to : is_mod_1!';
        $error = 'Error in comment setting moderated request!';
        break;
      //---------------------------------------------------------------------//
      case 'comm_switch_to_0':
        $success = 'Comment correctly set to : is_mod_0!';
        $error = 'Error in Comment setting moderated request!';
        break;
      //---------------------------------------------------------------------//
      default:
        $msg = 'Error : #messageInsert($data, $case)';
        break;
      //---------------------------------------------------------------------//
    }
    if ($data) {
      $msg = $success;
    }
    else {
      $msg = $error;
    }
    return $msg;
  }

?>