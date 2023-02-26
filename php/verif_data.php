<?php


function verifPseudo($data) {
  $regex = '#^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\dùúûüũòóôõöéèêëàáâãäçìíîïĩÙÚÛÜŨÒÓÔÕÖÉÈÊËÀÁÂÃÄÇÌÍÎÏĨ]{3,100}$#';
  $pseudo = strval($data);
  if (preg_match($regex, $pseudo) == 1) {
    $resultat = preg_match($regex, $pseudo);
  }
  else {
    $resultat = "Invalid Pseudo!</br></br>- (requires) at least one lower case
    </br>- (requires) at least one upper case</br>- (requires) 3 characters minimum</br>- accents and numbers are allowed</br>- 100 characters Maximum";
  }
  return $resultat;
}

function verifPwd($data) {
  $regex = '#^(?=.*?[A-ZÙÚÛÜŨÒÓÔÕÖÉÈÊËÀÁÂÃÄÇÌÍÎÏĨ])(?=.*?[a-zùúûüũòóôõöéèêëàáâãäçìíîïĩ])(?=.*?[0-9])(?=.*?[\#?!@$%^&*-]).{8,100}$#';
  $pwd = strval($data);
  if (preg_match($regex, $pwd) == 1) {
    return preg_match($regex, $pwd);
  }
  else {
    $resultat = "Invalid Password!</br></br>- (requires) at least one lower case</br>- (requires) at least one upper case</br>- (requires) 8 characters minimum</br>- (requires) one special character</br>- accents and numbers are allowed</br>- 100 characters Maximum";
    return $resultat;
  }
}

function verifFirstname($data) {
  $regex = '#^(?=.*[A-z])[a-zA-ZùúûüũòóôõöéèêëàáâãäçìíîïĩÙÚÛÜŨÒÓÔÕÖÉÈÊËÀÁÂÃÄÇÌÍÎÏĨ -]{2,100}$#';
  $firstname = strval($data);
  if (preg_match($regex, $firstname) == 1) {
    return preg_match($regex, $firstname);
  }
  else {
    $resultat = "Invalid First Name!</br></br>- (requires) 2 characters Minimum</br>- (requires) no special characters</br>- accents and space are allowed</br>- 100 characters Maximum";
    return $resultat;
  }
}

function verifEmail($data) {
  $regex = '#^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$#';
  $email = strval($data);
  if (preg_match($regex, $email) == 1) {
    return preg_match($regex, $email);
  }
  else {
    $resultat = "Invalid Email!</br></br>- (requires) 2 characters Minimum</br>- (requires) no special characters</br>- (requires) need @ character</br>- (requires) need . character</br>- (requires) between 2 and 4 characters at the end";
    return $resultat;
  }
}

function verifTitleArticle($data) {
  $regex = '#^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\dùúûüũòóôõöéèêëàáâãäçìíîïĩÙÚÛÜŨÒÓÔÕÖÉÈÊËÀÁÂÃÄÇÌÍÎÏĨ ]{5,100}$#';
  $title = strval($data);
  if (preg_match($regex, $title) == 1) {
    return preg_match($regex, $title);
  }
  else {
    $resultat = "Invalid Title!</br></br>- (requires) at least one lower case</br>- (requires) at least one upper case</br>- (requires) 5 characters minimum</br>- accents, numbers, space are allowed</br>- 100 characters Maximum";
    return $resultat;
  }
}
  

?>