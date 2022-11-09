

const DcnxlogOut = document.getElementById('logOut');
const CrossAddNewArticle = document.getElementById('add_art_cross');
const TextAddNewArticle = document.getElementById('add_art_text');
const NewArticleIDPopup = 'addNewArticlePopup';
const UpdateArticleIDPopup = 'updateArticlePopup';
const UpdateCommentIDPopup = 'updateCommentPopup';

CrossAddNewArticle.addEventListener('click', function openAddArticlePopup() {
  createUpdatePopup(NewArticleIDPopup, '');
});
TextAddNewArticle.addEventListener('click', function openAddArticlePopup() {
  createUpdatePopup(NewArticleIDPopup, '');
});
DcnxlogOut.addEventListener('click', () => logOutConfirm());

let confirmArtDelete = false;
let confirmCommDelete = false;

// ------------------------------------ //
//        LOG-OUT AND LISTENERS         //
// ------------------------------------ //
// LOG-OUT INPUT FUNCTION
function logOutConfirm() {
  removeUpdatePopup();
  removePopup();
  NavConfirm.innerHTML = `Log-Out confirmed`;
  setTimeout(() => {
    let redactor = document.getElementsByClassName(`redactor_${sessionStorage.id_user}`);
    NavConfirm.innerHTML = '';
    sessionStorage.clear();
    switchRole(redactor);
    displayArticles();
  }, '1500');
}


// BUILD REDACTOR LISTENERS
function redactor_listeners() {
  const artPencils = document.querySelectorAll(`.art_modify_${sessionStorage.id_user}`);
  const artTrashes = document.querySelectorAll(`.art_delete_${sessionStorage.id_user}`);
  const newComment = document.querySelectorAll('.sendCommentButton');
  const commPencils = document.querySelectorAll(`.comm_modify_${sessionStorage.id_user}`);
  const commTrashes = document.querySelectorAll(`.comm_delete_${sessionStorage.id_user}`);
  build_Art_Comm_Tool_Listeners(artTrashes, build_Delete_Article_Alerts, Articles);
  build_Art_Comm_Tool_Listeners(commTrashes, build_Delete_Comment_Alerts, Comments);

  build_Add_Comment_Listeners(newComment, addComment);

  build_Art_Comm_Tool_Listeners(artPencils, getArticle, Articles);  
  build_Art_Comm_Tool_Listeners(commPencils, getComment, Comments);
}


// ARTICLES/COMMENTS: BUILD LISTENERS ON REDACTOR-TOOLS AVAILABLE FOR ITS OWN ARTICLES/COMMENTS
// (All Pencils/Trashes)
function build_Art_Comm_Tool_Listeners(tools, func, Targets) {
  let domUserTargets = document.querySelectorAll(`${Targets}${sessionStorage.id_user}`);
  let i = 0;
  for (elt of tools) {
    let onTargetTool = domUserTargets[i];
    elt.addEventListener('click', () => func(onTargetTool));
    i ++;
  }
}


// BUILD LISTENERS ON ALL ADD-NEW-COMMENT SECTIONS
// (Textarea => Submit)
function build_Add_Comment_Listeners(elements, func) {
  let i = 0;
  for (elt of elements) {
    let id_art = splitAndParseToID(`${elements[i].id}`);
    let commentForm = document.getElementById(`addComment_${id_art}`);
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let data = new FormData(e.target).entries();
      let formData = Object.fromEntries(data);
      func(id_art, formData);
    });
    i ++;
  }
}


// --------------------------- //
//      REDACTOR FUNCTIONS     //
// --------------------------- //
// ADD NEW ARTICLE WITH NEW POPUP
function createUpdatePopup(idPopup, data) {
  removeUpdatePopup();
  build_log_sign_addArt_popup(idPopup);
  Main.classList.toggle('negative_index');
  let idForm;
  let action;
  let func;

  if (idPopup == NewArticleIDPopup) {
    idForm = 'newArticleForm';
    action = 'addNewArticle';
    func = insertArticleSuccess;
    data = '';
    popupHeader.innerHTML =
      `<span class='newArticleHead'>ARTICLE INSERTION FORM</span>
      <span class='close hand'>X</span>`;
    popupBody.innerHTML =
      `<div id='newArticleWrap'>
        <form id='${idForm}' action='addNewArticle' method='POST'>
          <label for='title' name='title'>Title :&nbsp;</label>
          <input type='text' placeholder='max: 100 caracters' name='title' class='titleInputNewArticle' />
          <label for='content' name='content'>Content :&nbsp;</label>
          <textarea name='content' placeholder='write article here...' class='textNewArticle'></textarea>
          <input class='newArticleSubmit' type='submit' value='Valid New Article' />
          <p id='articleMsg' class='articleMsg'></p>
        </form>
      </div>`;
  }

  else if (idPopup == UpdateArticleIDPopup) {
    idForm = 'updateArticleForm';
    action = data.action;
    func = data.func;
    popupHeader.innerHTML =
      `<span class='updateArticleHead'>ARTICLE UPDATE FORM</span>
      <span class='close hand'>X</span>`;
    popupBody.innerHTML =
      `<div id='updateArticleWrap'>
        <form id='${idForm}' action='updateArticle' method='POST'>
          <label for='title' name='title'>Title :&nbsp;</label>
          <textarea name='title' class='titleInputupdateArticle'>${data.title}</textarea>
          <label for='content' name='content'>Content :&nbsp;</label>
          <textarea name='content' class='textupdateArticle'>${data.content}</textarea>
          <input class='updateArticleSubmit' type='submit' value='Valid Modifications' />
          <p id='articleMsg' class='articleMsg'></p>
        </form>
      </div>`;
  }

  else if (idPopup == UpdateCommentIDPopup) {
    idForm = 'updateCommentForm';
    action = data.action;
    func = data.func;
    popupHeader.innerHTML =
      `<span class='updateCommentHead'>COMMENT UPDATE FORM</span>
      <span class='close hand'>X</span>`;
      popupBody.innerHTML =
      `<div id='updateArticleWrap'>
        <form id='${idForm}' action='updateComment' method='POST'>
          <label for='content' name='content'>Content :&nbsp;</label>
          <textarea name='content' class='textupdateComment'>${data.content}</textarea>
          <input class='updateCommentSubmit' type='submit' value='Valid Modifications' />
          <p id='articleMsg' class='articleMsg'></p>
        </form>
      </div>`;
  }

  document.querySelector('.close').addEventListener('click', () => {
    toggleMainPositiveZ_Index();
    document.getElementById(idPopup).remove();
  });

  document.getElementById(idForm).addEventListener('submit', function (e) {
    e.preventDefault();
    let newData = new FormData(e.target).entries();
    let formData = Object.fromEntries(newData);

    if (idPopup == UpdateArticleIDPopup) {
      formData.id_article = data.id_article;
    }
    else if (idPopup == UpdateCommentIDPopup) {
      formData.id_comment = data.id_comment;
    }

    verif(formData, action, func);
  });
}


// GET ARTICLE : CALLED BY modifyArticle(userArticle)
function getArticle(userArticle) {
  let id_art = splitAndParseToID(`${userArticle.id}`);
  let data = {};
  let action;
  let func = updateArticle;
  if (sessionStorage.userRole == Moderator) {
    action = 'moderator_getArticle';
  } 
  else {
    action = 'getArticle';
  }
  data.id_article = id_art;
  data.action = action;
  sendCnxData(data, action, func);
}


// MODIFY ARTICLE WITH POPUP
function updateArticle(respData, displayMsg) {
  NavConfirm.innerHTML = "";
  NavConfirm.innerHTML = `(JS) getArticle(userArticle)!`;
  navClearMsg(NavConfirm, UpdateTime);

  if (typeof respData === 'string' || respData instanceof String) {
    displayMsg.innerHTML = `(PHP) ${respData}`;
    navClearMsg(displayMsg, UpdateTime);
  }
  else {
    let action = 'updateArticle';
    let id_article = respData.id_article;
    let title = respData.title;
    let content = respData.content;
    let func = updateArticleSuccess;
    let msg = `(JS) Correctly retrieved article ID: ${id_article}`;
    displayMsg.innerHTML = msg;
    navClearMsg(displayMsg, UpdateTime);

    let data = {};
    data.id_article = id_article;
    data.action = action;
    data.title = title;
    data.content = content;
    data.func = func;
    createUpdatePopup(UpdateArticleIDPopup, data);
  }
}


// DELETE ARTICLE
function deleteArticle(userArticle) {
  let id_article = splitAndParseToID(`${userArticle.id}`);

  // if (confirmArtDelete == true) {
    let data = {};
    let action;
    let func;
    if (sessionStorage.userRole == Moderator) {
      action = 'moderator_deleteArticle';
      func = modo_deleteArticleSuccess;
    }
    else if (sessionStorage.userRole == Redactor) {
      action = 'deleteArticle';
      func = deleteArticleSuccess;
    }
    data.id_article = id_article;
    data.action = action;
    sendCnxData(data, action, func);
  //   confirmArtDelete = false;
  // }
}


// ARTICLE : BUILD ALERT-TOOLS ON TRASH-ICONS ARTICLE
function build_Delete_Article_Alerts(userArticle) {
  let id_article = splitAndParseToID(`${userArticle.id}`);
  let pencil = document.getElementById(`art_modify_${id_article}`);
  let trash = document.getElementById(`art_delete_${id_article}`);
  let trash_modo = document.getElementById(`art_modo_delete_${id_article}`);
  let msgAlert = document.getElementById(`art_msg_tools_${id_article}`);
  let warning = document.getElementById(`warning_${id_article}`);
  let confirm = document.getElementById(`confirm_art_del_${id_article}`);
  let cancel = document.getElementById(`cancel_art_del_${id_article}`);

  if (msgAlert.innerHTML == '') {
    msgAlert.innerHTML = 'Are you sure you want to delete this article?';
  }
  else {
    msgAlert.innerHTML = '';
  }

  pencil.classList.toggle('negative_index');
  trash.classList.toggle('negative_index');
  trash_modo.classList.toggle('negative_index');

  
  msgAlert.classList.toggle('art_msg_tools_alert');
  warning.classList.toggle('hide');
  warning.classList.toggle('art_msg_tools_icon_alert');
  confirm.classList.toggle('hide');
  confirm.classList.toggle('art_msg_tools_confirm');
  cancel.classList.toggle('hide');
  cancel.classList.toggle('art_msg_tools_cancel');

  cancel.addEventListener('click', function () {
    build_Delete_Article_Alerts(userArticle);
  });

  confirm.addEventListener('click', function () {
    confirmArtDelete = true;
    msgAlert.classList.toggle('msg_tools_alert');
    deleteArticle(userArticle);
  });
}


// COMMENT : BUILD ALERT-TOOLS ON TRASH-ICONS COMMENT
function build_Delete_Comment_Alerts(userComment) {
  let id_comment = splitAndParseToID(`${userComment.id}`);
  let pencil = document.getElementById(`comm_modify_${id_comment}`);
  let trash = document.getElementById(`comm_delete_${id_comment}`);
  let trash_modo = document.getElementById(`comm_modo_delete_${id_comment}`);
  let warning = document.getElementById(`warning_${id_comment}`);
  let confirm = document.getElementById(`confirm_comm_del_${id_comment}`);
  let cancel = document.getElementById(`cancel_comm_del_${id_comment}`);

  pencil.classList.toggle('negative_index');
  trash.classList.toggle('negative_index');
  trash_modo.classList.toggle('negative_index');
  warning.classList.toggle('hide');
  warning.classList.toggle('comm_msg_tools_icon_alert');
  confirm.classList.toggle('hide');
  confirm.classList.toggle('comm_msg_tools_confirm');
  cancel.classList.toggle('hide');
  cancel.classList.toggle('comm_msg_tools_cancel');

  cancel.addEventListener('click', () => build_Delete_Comment_Alerts(userComment));

  confirm.addEventListener('click', function () {
    confirmCommDelete = true;
    deleteComment(userComment);
  })

}


// ADD COMMENT
function addComment(id_art, data) {
  console.log(id_art);
  console.log(data);
  let action = 'addNewComment';
  let func;
  func = insertCommentSuccess;
  data.id_article = id_art;
  data.id_user = parseInt(sessionStorage.id_user);
  console.log(data);

  verif(data, action, func);
  NavConfirm.innerHTML = `(JS) addComment(comment)!`;
  navClearMsg(NavConfirm, ClearTime);
}


// GET COMMENT
function getComment(userComment) {
  let id_comm = splitAndParseToID(`${userComment.id}`);
  let data = {};
  let func;
  let action;
  func = updateComment;

  if (sessionStorage.userRole == Moderator) {
    action = 'moderator_getComment';
  } 
  else {
    action = 'getComment';
  }
  data.id_comment = id_comm;
  data.action = action;
  sendCnxData(data, action, func);
}


// MODIFY COMMENT
function updateComment(respData, displayMsg) {
  NavConfirm.innerHTML = "";
  NavConfirm.innerHTML = `(JS) getComment(userComment)!`;
  navClearMsg(NavConfirm, UpdateTime);

  if (typeof respData === 'string' || respData instanceof String) {
    displayMsg.innerHTML = `(PHP) ${respData}`;
    navClearMsg(displayMsg, UpdateTime);
  }
  else {
    let action = 'updateComment';
    let id_comment = respData.id_comment;
    let content = respData.content;
    let func = updateCommentSuccess;
    let msg = `(JS) Correctly retrieved comment ID: ${id_comment}`;
    displayMsg.innerHTML = msg;
    navClearMsg(displayMsg, UpdateTime);
    let data = {};
    data.id_comment = id_comment;
    data.action = action;
    data.content = content;
    data.func = func;
    createUpdatePopup(UpdateCommentIDPopup, data);
  }
}


// DELETE COMMENT
function deleteComment(userComment) {
  let id_comment = splitAndParseToID(`${userComment.id}`);

  if (confirmCommDelete == true) {
    let data = {};
    let action;
    let func;
    if (sessionStorage.userRole == Moderator) {
      action = 'moderator_deleteComment';
      func = modo_deleteCommentSuccess;
    }
    else if (sessionStorage.userRole == Redactor) {
      action = 'deleteComment';
      func = deleteCommentSuccess;
    }
    data.id_comment = id_comment;
    data.action = action;
    sendCnxData(data, action, func);
    confirmCommDelete = false;
  }
}


// ------------------------ //
//      TOOLS FUNCTIONS     //
// ------------------------ //
// REMOVE ANY NEW-ARTICLE-POPUP IF ALREADY EXISTS
function removeUpdatePopup() {
  toggleMainPositiveZ_Index();
  const AddNewArticlePopup = document.getElementById(NewArticleIDPopup);
  const UpdateArticlePopup = document.getElementById (UpdateArticleIDPopup);
  const UpdateCommentPopup = document.getElementById (UpdateCommentIDPopup);
  if (document.body.contains(AddNewArticlePopup)) {
    AddNewArticlePopup.remove();
  }
  else if (document.body.contains(UpdateArticlePopup)) {
    UpdateArticlePopup.remove();
  }
  else if (document.body.contains(UpdateCommentPopup)) {
    UpdateCommentPopup.remove();
  }
}


// // SWITCH TO REDACTOR ROLE JUST AFTER LOG-IN
// function switchRedactor(elements) {
//   if (sessionStorage.userRole == Redactor || sessionStorage.userRole == Moderator) {
//     let hide = `hide`;
//     let removeHide = hide;
//     let contains_hide = hide;
//     let redactorClass = document.getElementsByClassName('redactor');
//     let eyesHover = document.getElementsByClassName('commentsView');
//     let logSign = document.getElementsByClassName('logSign');
//     let title = `Show/Hide Comments\nAdd Comment(s)`;

//     toggleIf(elements, contains_hide, removeHide);
//     toggleIf(redactorClass, contains_hide, removeHide);
//     toggleIfNot(logSign, contains_hide, hide);

//     // for (elt of elements) {
//     //   if (elt.classList.contains('hide')) {
//     //     elt.classList.toggle('hide');
//     //   }
//     // }
//     // for (elt of redactorClass) {
//     //   if (elt.classList.contains('hide')) {
//     //     elt.classList.toggle('hide');
//     //   }
//     // }
//     // for (elt of logSign) {
//     //   if (!elt.classList.contains('hide')) {
//     //     elt.classList.toggle('hide');
//     //   }
//     // }
//     for (elm of eyesHover) {
//       if (elm.title != title) {
//         elm.title = title;
//       }
//     }
//   }
// }


//  ------------------------------- //
//        SUCCESS / FAILURE         //
//  ------------------------------- //

// ---------- ADD NEW ARTICLE __ insertArticle($receiveData)
// Success ----------
function insertArticleSuccess(resp, displayMsg) {
  displayMsg.innerHTML = `(PHP) ${resp}`;
  if (resp == 'Article correctly added!') {
    setTimeout(() => {
      removeUpdatePopup();
      displayArticles();
    }, '1500');
  }
}
// Failure ----------
function insertArticleFail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) insertArticleFail(error)!`;
  console.log(error+ '\ninsertArticleFail(error)');
  setTimeout(() => {
    displayMsg.innerHTML = ``;
  }, ClearTime);
}


// ---------- GET ARTICLE __ getArticle($id)
// Success =========> redirected on : updateArticle(respData, displayMsg)
// Failure ----------
function getArticleFail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) getArticleFail(error)!`;
  console.log(error+ '\ngetArticleFail(error)');
  navClearMsg(displayMsg, ClearTime);
}


// ---------- UPDATE ARTICLE __ updateArticle($receiveData)
// Success ----------
function updateArticleSuccess(resp, displayMsg) {
  displayMsg.innerHTML = `(PHP) ${resp}`;
  navClearMsg(displayMsg, ClearTime);
  if (resp == 'Article correctly updated!') {
    setTimeout(() => {
      removeUpdatePopup();
      displayArticles();
    }, ClearTime);
  }
}
// Failure ----------
function updateArticleFail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) updateArticleFail(error)!`;
  console.log(error+ '\nupdateArticleFail(error)');
  navClearMsg(displayMsg, ClearTime);
}


// ---------- DELETE ARTICLE __ set_article_is_mod_to_1($id)
// Success ----------
function deleteArticleSuccess(resp, displayMsg) {
  displayMsg.innerHTML = `(PHP) ${resp}`;
  setTimeout(() => {
    navClearMsg(displayMsg, '3000');
    if (resp == `Your request to delete this article</br>has been sent to a moderator!`) {
      setTimeout(() => {
        displayArticles();
      }, ClearTime);
    }
  }, '4000');
}
// Failure ----------
function deleteArticleFail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) deleteArticleFail(error)!`;
  console.log(error+ '\ndeleteArticleFail(error)');
  navClearMsg(displayMsg, ClearTime);
}


// ---------- ADD NEW COMMENT __ insertComment($receiveData)
// Success ----------
function insertCommentSuccess(resp, displayMsg) {
  displayMsg.innerHTML = `(PHP) ${resp}`;
  if (resp == 'Comment correctly added!') {
    setTimeout(() => {
      displayArticles();
    }, ClearTime);
  }
}
// Failure ----------
function insertCommentFail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) insertCommentFail(error)!`;
  console.log(error+ '\ninsertCommentFail(error)');
  setTimeout(() => {
    displayMsg.innerHTML = ``;
  }, ClearTime);
}


// ---------- GET COMMENT __ getComment($id)
// Success =========> redirected on : updateComment(respData, displayMsg)
// Failure ----------
function getCommentFail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) getCommentFail(error)!`;
  console.log(error+ '\ngetCommentFail(error)');
  navClearMsg(displayMsg, ClearTime);
}


// ---------- UPDATE COMMENT __ updateComment($receiveData)
// Success ----------
function updateCommentSuccess(resp, displayMsg) {
  displayMsg.innerHTML = `(PHP) ${resp}`;
  navClearMsg(displayMsg, ClearTime);
  if (resp == 'Comment correctly updated!') {
    setTimeout(() => {
      removeUpdatePopup();
      displayArticles();
    }, ClearTime);
  }
}
// Failure ----------
function updateCommentFail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) updateCommentFail(error)!`;
  console.log(error+ '\nupdateCommentFail(error)');
  navClearMsg(displayMsg, ClearTime);
}


// ---------- DELETE COMMENT __ set_comment_is_mod_to_1($id)
// Success ----------
function deleteCommentSuccess(resp, displayMsg) {
  displayMsg.innerHTML = `(PHP) ${resp}`;
  setTimeout(() => {
    navClearMsg(displayMsg, LongTime);
    if (resp == `Your request to delete this comment</br>has been sent to a moderator!`) {
      setTimeout(() => {
        displayArticles();
      }, '2500');
    }
  }, '4000');
}
// Failure ----------
function deleteCommentFail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) deleteCommentFail(error)!`;
  console.log(error+ '\ndeleteCommentFail(error)');
  navClearMsg(displayMsg, ClearTime);
}