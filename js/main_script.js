

const Refresh = document.querySelector('.refresh');
const NavConfirm = document.getElementById('navConfirm');
const Home = document.getElementById('home');
const CnxLogIn = document.getElementById('logIn');
const CnxSignIn = document.getElementById('signUp');
const UserWelcome = document.getElementById('userWelcome');
const Main = document.getElementById('main');
const PostContainer = document.getElementById('postContainer');
const LogIDPopup = 'logPopup';
const SignIDPopup = 'signPopup';
const Redactor = 'Redactor';
const Moderator = 'Moderator';
const Administrator = 'Administrator';
const Articles = '.article_';
const Comments = '.comment_';
const ShowHideComments = 'commentsArticle_';
const LongTime = 4500;
const ClearTime = 2000;
const UpdateTime = 800;

Refresh.addEventListener('click', () => window.location.reload());
Home.addEventListener('click', () => displayArticles());
CnxLogIn.addEventListener('click', function openLogPopup() {
  createLogSignPopup(LogIDPopup);
});
CnxSignIn.addEventListener('click', function openSignPopup() {
  createLogSignPopup(SignIDPopup);
});

displayArticles();

// ---------------------------------------------- //
//        DISPLAY FUNCTIONS AND LISTENERS         //
// ---------------------------------------------- //
// DISPLAY ALL ARTICLES
function displayArticles() {
  toggleMainPositiveZ_Index();
  while (PostContainer.firstChild) {
    PostContainer.removeChild(PostContainer.lastChild);
  };
  let data = {};
  let action;
  let func;
  func = getAllArticlesSuccess;
  if (sessionStorage.userRole == Moderator) {
    action = 'modo_displayAllArticles';
  }
  else {
    action = 'displayAllArticles';
  }
  sendCnxData(data, action, func);
  let moderator;
  setTimeout(() => {
    moderator = document.querySelectorAll('.moderator');
  }, '300');

  if (sessionStorage.id_user !== undefined && sessionStorage.userRole !== undefined) {
    let redactor = document.getElementsByClassName(`redactor_${sessionStorage.id_user}`);
    UserWelcome.innerHTML = `Welcome ${sessionStorage.pseudo}`;
    setTimeout(() => {
      switchRole(redactor);
      if (sessionStorage.userRole == Moderator) {
        switchModerator(moderator);
      }
    }, '300');
  }
  setTimeout(() => {
    NavConfirm.innerHTML = `(JS) Articles successfully updated!`;
    navClearMsg(NavConfirm, UpdateTime);
    setTimeout(() => {
    NavConfirm.innerHTML = `(JS) Comments successfully updated!`;
    navClearMsg(NavConfirm, UpdateTime);
    }, '1000');
  }, '300');
  all_listeners();
}


// DISPLAY ALL COMMENTS IN LOOP : called by 'getAllArticlesSuccess(articles, displayMsg)'

function displayComments(id) {
  let data = {};
  data.id = id;
  let action;
  let func;
  func = getAllCommentsSuccess;
  if (sessionStorage.userRole == Moderator) {
    action = 'modo_displayAllComments';
  }
  else {
    action = 'displayAllComments';
  }
  sendCnxData(data, action, func);
}


// CALL ALL REQUIRED LISTENERS WITH SMALL DELAY
function all_listeners() {
  setTimeout(() => {
    let eyes = document.querySelectorAll('.commentsView');
    buildEyesListeners(eyes);
    
    if (sessionStorage.userRole !== undefined && sessionStorage.userRole !== undefined) {
      redactor_listeners();
      console.log('Redactor Listeners');
      if (sessionStorage.userRole == Moderator) {
        modo_listeners();
        console.log('Redactor & Moderator listeners OK');
      }
    }
  }, UpdateTime);
  setTimeout(() => {
    NavConfirm.innerHTML = `(JS) All Listeners operational!`;
    navClearMsg(NavConfirm, UpdateTime);
  }, '2200');
}


// BUILD LISTENERS ON ALL EYES ICONS
function buildEyesListeners(eyes) {
  let i = 0;
  for (elt of eyes) {
    i ++;
    let id = ShowHideComments + i;
    let aside = document.getElementById(id);
    elt.addEventListener('click', function () {
      aside.classList.toggle('hide');
    });
  }
}


// ------------------------------------------ //
//      GENERATE LOG-IN OR SIGN-UP POPUP      //
// ------------------------------------------ //
function createLogSignPopup(idPopup) {
  removePopup();
  build_log_sign_addArt_popup(idPopup);
  Main.classList.toggle('negative_index');
  let idForm = '';
  let action = '';
  let func;

  if (idPopup == LogIDPopup) {
    idForm = 'logInForm';
    action = 'logIn';
    func = getUserSuccess;
  }
  else if (idPopup == SignIDPopup) {
    idForm = 'signUpForm';
    action = 'signUp';
    func = insertUserSuccess;
  }
  popupHeader.innerHTML = buildPopupHeader(idPopup);
  popupBody.innerHTML = buildPopupBody(idPopup, idForm, 'null');

  document.querySelector('.close').addEventListener('click', () => {
    toggleMainPositiveZ_Index();
    document.getElementById(idPopup).remove();
  });

  document.querySelector('.permute').addEventListener('click', (e) => permutation(e));

  document.getElementById(idForm).addEventListener('submit', function (e) {
    e.preventDefault();
    let data = new FormData(e.target).entries();
    let formData = Object.fromEntries(data);
    verif(formData, action, func);
  });
}


// -------------------------//
//      TOOLS FUNCTIONS     //
// -------------------------//
// CLEAR NAV-MSG (const NavConfirm)
function navClearMsg(NavConfirm, time) {
  setTimeout (() => { NavConfirm.innerHTML = `` }, time);
}


// SPLIT & PARSE ID TO KEEP ONLY INTEGER PART
function splitAndParseToID(id) {
  let split_id = id.split('_');
  let id_split = parseInt(split_id[1]);
  return id_split;
}


// BUILD POPUP FOR 'LOG-IN' / 'SIGN-UP' AND 'ADD NEW ARTICLE' INPUTS
function build_log_sign_addArt_popup(idPopup) {
  let containerPopup = document.createElement('div');
  let popupHeader = document.createElement('div');
  let popupBody = document.createElement('div');
  containerPopup.id = idPopup;
  popupHeader.id = 'popupHeader';
  popupBody.id = "popupBody";
  containerPopup.classList.add(idPopup);
  popupHeader.classList.add('popupHeader');
  popupBody.classList.add('popupBody');
  let popupParts = {
    'container' : containerPopup,
    'header' : popupHeader,
    'body' : popupBody,
  };
  document.getElementById('container').appendChild(containerPopup);
  containerPopup.appendChild(popupHeader);
  containerPopup.appendChild(popupBody);
  return popupParts;
}


// REMOVE ANY 'LOG-IN' / 'SIGN-UP' INPUT POPUP IF ALREADY EXISTS
function removePopup() {
  toggleMainPositiveZ_Index();
  const LogPopup = document.getElementById(LogIDPopup);
  const SignPopup = document.getElementById(SignIDPopup);
  if (document.body.contains(LogPopup)) {
    LogPopup.remove();
  }
  else if (document.body.contains(SignPopup)) {
    SignPopup.remove();
  }
}


// TOGGLE POSITIVE Z-INDEX ON MAIN
function toggleMainPositiveZ_Index() {
  let main = Main;
  if (main.classList.contains('negative_index')) {
    main.classList.toggle('negative_index');
  }
}


// PERMUTE BETWEEN 'LOG IN' & 'SIGN IN' POPUP
function permutation(e) {
  if (e.target.innerText == "Log In") {
    createLogSignPopup(LogIDPopup);
  }
  else {
    createLogSignPopup(SignIDPopup);
  }
}


// SWITCH TO GUEST-ROLE AFTER LOG-OUT / TO REDACTOR-ROLE AFTER LOG-IN
function switchRole(elements) {
  let title;
  let hide = `hide`;
  let removeHide = hide;
  let contains_hide = hide;
  let redactorClass = document.getElementsByClassName('redactor');
  let eyesHover = document.getElementsByClassName('commentsView');
  let logSign = document.getElementsByClassName('logSign');

  if (sessionStorage.userRole === undefined) {
    title = `Show/Hide Comments`;
    toggleIfNot(elements, contains_hide, hide);
    toggleIfNot(redactorClass, contains_hide, removeHide);
    toggleIf(logSign, contains_hide, hide);
  }
  else if (sessionStorage.userRole == Redactor || sessionStorage.userRole == Moderator) {
    title = `Show/Hide Comments\nAdd Comment(s)`;
    toggleIf(elements, contains_hide, removeHide);
    toggleIf(redactorClass, contains_hide, removeHide);
    toggleIfNot(logSign, contains_hide, hide);
  }

  for (elm of eyesHover) {
    if (elm.title != title) {
      elm.title = title;
    }
  }
}


// DEFINE SESSION-STORAGE
function defineSessionStorage(data) {
  sessionStorage.id_user = data.id_account;
  sessionStorage.userRole = data.role;
  sessionStorage.pseudo = data.pseudo;
}


// -----------------------------------//
//      SENDING DATAS WITH FETCH      //
// -----------------------------------//
// VERIF-BRIDGE FOR FUNCTIONS THAT SEND NEW DATAS TO DATABASE
function verif(formData, action, func) {
  let ok = true;
  // GROS BOULOT DE VÉRIF A FAIRE ICI
  if(ok) {
    console.log('Action = ' + action);
    sendCnxData(formData, action, func);
  }
}


function sendCnxData(formData, action, func) {
  formData.action = action;
  let failure;
  let displayMsg = null;
  const FlogMsg = document.getElementById('flogMsg');
  const SignUpMsg = document.getElementById('signUpMsg');
  const UpdatePopupMsg = document.getElementById('articleMsg');
  const NewCommentMsg = document.getElementById('newCommentMsg');
  const ArticleToolMsg = document.getElementById(`art_msg_tools_${formData.id_article}`)
  
  switch (action) {
    // -----------------------------------//
    case 'displayAllArticles':
      failure = getAllArticlesFail;
      displayMsg = NavConfirm;
      break;
    // -----------------------------------//
    case 'modo_displayAllArticles':
      failure = getAllArticlesFail;
      displayMsg = NavConfirm;
      break;
    // -----------------------------------//
    case 'displayAllComments':
      failure = getAllCommentsFail;
      displayMsg = NavConfirm;
      break;
    // -----------------------------------//
    case 'modo_displayAllComments':
      failure = getAllCommentsFail;
      displayMsg = NavConfirm;
      break;
    // -----------------------------------//
    case 'logIn':
      failure = getUserFail;
      displayMsg = FlogMsg;
      break;
    // -----------------------------------//
    case 'signUp':
      failure = insertUserFail;
      displayMsg = SignUpMsg;
      break;
    // -----------------------------------//
    case 'addNewArticle':
      formData.id_user = parseInt(sessionStorage.id_user);
      formData.is_moderated = 0; // 0 : just for DEV (need = 1)
      failure = insertArticleFail;
      displayMsg = UpdatePopupMsg;
      break;
    // -----------------------------------//
    case 'getArticle':
      failure = getArticleFail;
      displayMsg = NavConfirm;
      break;
    // -----------------------------------//
    case 'moderator_getArticle':
      failure = getArticleFail;
      displayMsg = NavConfirm;
      break;
    // -----------------------------------//
    case 'updateArticle':
      failure = updateArticleFail;
      displayMsg = UpdatePopupMsg;
      break;
    // -----------------------------------//
    case 'deleteArticle':
      failure = deleteArticleFail;
      displayMsg = NavConfirm;
      break;
    // -----------------------------------//
    case 'moderator_deleteArticle':
      failure = modo_deleteArticleFail;
      displayMsg = ArticleToolMsg;
      break;
    // -----------------------------------//
    case 'addNewComment':
      formData.is_moderated = 0; // 0 : just for DEV (need = 1)
      failure = insertCommentFail;
      displayMsg = NewCommentMsg;
      break;
    // -----------------------------------//
    case 'getComment':
      failure = getCommentFail;
      displayMsg = NavConfirm;
      break;
    // -----------------------------------//
    case 'moderator_getComment':
      failure = getCommentFail;
      displayMsg = NavConfirm;
      break;
    // -----------------------------------//
    case 'updateComment':
      failure = updateCommentFail;
      displayMsg = UpdatePopupMsg;
      break;
    // -----------------------------------//
    case 'deleteComment':
      failure = deleteCommentFail;
      displayMsg = NavConfirm;
      break;
    // -----------------------------------//
    case 'moderator_deleteComment':
      failure = modo_deleteCommentFail;
      displayMsg = NavConfirm;
      break;
    // -----------------------------------//
    case 'art_switch_to_1':
      failure = art_switch_to_mod_Fail;
      displayMsg = NavConfirm;
      break;
    // -----------------------------------//
    case 'art_switch_to_0':
      failure = art_switch_to_mod_Fail;
      displayMsg = NavConfirm;
      break;
    // -----------------------------------//
    case 'comm_switch_to_1':
      failure = comm_switch_to_mod_Fail;
      displayMsg = NavConfirm;
      break;
    // -----------------------------------//
    case 'comm_switch_to_0':
      failure = comm_switch_to_mod_Fail;
      displayMsg = NavConfirm;
      break;
    // -----------------------------------//
    default:
      NavConfirm.innerHTML = `(JS) Error sendCnxData(...)!`;
      navClearMsg(NavConfirm, ClearTime);
      break;
  }

  let fetchData = {
    method: 'POST',
    body: JSON.stringify(formData),
    header: { 'Content-type': 'application/json' }
  };
  fetch('./php/controller.php', fetchData)
  .then((resp) => resp.json())
  .then((resp) => func(resp, displayMsg))
  .catch((error) => failure(error, displayMsg))
}


//  ------------------------------- //
//        SUCCESS / FAILURE         //
//  ------------------------------- //

// ---------- DISPLAY ALL ARTICLES __ getAllArticles()
// Success ----------
function getAllArticlesSuccess(articles, displayMsg) {
  displayMsg.innerHTML = '';
  let count = 1;
  PostContainer.innerHTML = '';
  for (art of articles) {
    let articleHtmlTemplate;
    let moderated = art.moderated;
    articleHtmlTemplate = vueGetAllArticles(art, moderated, count);
    PostContainer.innerHTML += articleHtmlTemplate;
    count ++;
    displayComments(art.id_article);
  }
}
// Failure ----------
function getAllArticlesFail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) getAllArticlesFail(error)!`;
  console.log(error+ '\ngetAllArticlesFail(error)');
  navClearMsg(displayMsg, ClearTime);
}

// ---------- DISPLAY ALL COMMENTS __ getAllComments($id)
// Success ----------
function getAllCommentsSuccess(artComments, displayMsg) {
  displayMsg.innerHTML = '';
  if (artComments[0] != undefined) {
    let artSelection = document.getElementById(`countComm_${artComments[0].article_id}`);
    let commCount = artComments.length;
    artSelection.innerHTML = `&nbsp;${commCount} &nbsp;comments`;
    for (comm of artComments) {
      let commentHtmlTemplate;
      let moderated = comm.moderated;
      let asideAttachComm = document.querySelector(`.article_${comm.article_id}`);
      commentHtmlTemplate = vueGetAllComments(comm, moderated);
      asideAttachComm.innerHTML += commentHtmlTemplate;
    };
  }
}
// Failure ----------
function getAllCommentsFail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) getAllCommentsFail(error)!`;
  console.log(error+ '\ngetAllCommentsFail(error)');
  navClearMsg(displayMsg, ClearTime);
}

// ---------- LOG-IN __ getUser($pseudo)
// Success ----------
function getUserSuccess(resp, displayMsg) {
  if (typeof resp === 'string' || resp instanceof String) {
    displayMsg.innerHTML = `(PHP) ${resp}`;
  }
  else {
    let msg = `(JS) Correctly logged as ${resp.pseudo}`;
    displayMsg.innerHTML = msg;
    setTimeout(() => {
      removePopup();
      defineSessionStorage(resp);
      displayArticles();
    }, '1500');
  }
}
// Failure ----------
function getUserFail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) getUserFail(error)!`;
  console.log(error + '\ngetUserFail(error)');
}

// ---------- SIGN-UP __ insertUser($receiveData)
// Success ----------
function insertUserSuccess(resp, displayMsg) {
  displayMsg.innerHTML = `(PHP) ${resp}`;
  if (resp == 'New user correctly registered!') {
    setTimeout(() => {
      removePopup();
    }, '1500');
  }
}
// Failure ----------
function insertUserFail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) insertUserFail(error)!`;
  console.log(error+ '\ninsertUserFail(error)');
}