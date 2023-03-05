

function buildPopupHeader(idPopup) {
  let popupHeader;
  switch (idPopup) {
  //--------------------------------------------------------------------------//
    case LogIDPopup:
      popupHeader = 
        `<span class='question'>Not registered yet ?  ==></span>
        <button class='permute hand'>Sign Up</button>
        <span class='close hand'>X</span>`;
      break;
  //--------------------------------------------------------------------------//
    case SignIDPopup:
      popupHeader = 
        `<span class='question'>Already registered ?  ==></span>
        <button class='permute hand'>Log In</button>
        <span class='close hand'>X</span>`;
      break;
  //--------------------------------------------------------------------------//
    case NewArticleIDPopup:
      popupHeader = 
        `<span class='newArticleHead'>ARTICLE INSERTION FORM</span>
        <span class='close hand'>X</span>`;
      break;
  //--------------------------------------------------------------------------//
    case UpdateArticleIDPopup:
      popupHeader = 
        `<span class='updateArticleHead'>ARTICLE UPDATE FORM</span>
        <span class='close hand'>X</span>`;
      break;
  //--------------------------------------------------------------------------//
    case UpdateCommentIDPopup:
      popupHeader = 
        `<span class='updateCommentHead'>COMMENT UPDATE FORM</span>
        <span class='close hand'>X</span>`;
      break;
  //--------------------------------------------------------------------------//
    default:
      popupHeader = 
        `<span class='updateCommentHead'>DEFAULT</span>
        <span class='close hand'>X</span>`;
      break;
  //--------------------------------------------------------------------------//
  }
  return popupHeader;
}

function buildPopupBody(idPopup, idForm, data) {
  let popupBody;
  switch (idPopup) {
  //------------------------------------------------------------------------------------------------//
    case LogIDPopup:
      popupBody = 
        `<div id='logInWrap'>
          <form id='logInForm' action='logIn' method='POST'>
            <label for='pseudo' name='pseudo'>Enter your Pseudo :&nbsp;</label>
            <input type='text' name='pseudo' />
            <label for='pwd' name='pwd'>Enter your Password :&nbsp;</label>
            <input type='password' name='pwd' class='inputPwdLog' />      
            <input id='logInSubmit' type='submit' value='Log In' />
            <p id='flogMsg' class='flogMsg'></p>
          </form>
        </div>`;
      break;
  //------------------------------------------------------------------------------------------------//
    case SignIDPopup:
      popupBody = 
        `<div id='signUpWrap'>
          <form id='signUpForm' action='signUp' method='POST'>
            <label for='firstname' name='firstname'>Your First Name :&nbsp;</label>
            <input type='text' name='firstname' />
            <label for='pseudo' name='pseudo'>Choose your Pseudo :&nbsp;</label>
            <input type='text' name='pseudo' />
            <label for='email' name='email'>Enter your Email :&nbsp;</label>
            <input type='email' name='email' />
            <label for='pwd' name='pwd'>Choose your Password :&nbsp;</label>
            <input type='password' name='pwd' />
            <label for='pwdConfirm' name='pwdConfirm'>Confirm your Password :&nbsp;</label>
            <input type='password' name='pwdConfirm' class='inputPwdConfirmSign' />
            <input id='signUpSubmit' type='submit' value='Sign Up' />
            <p id='signUpMsg' class='signUpMsg'></p>
          </form>
        </div>`;
      break;
  //------------------------------------------------------------------------------------------------//
    case NewArticleIDPopup:
      popupBody = 
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
      break;
  //------------------------------------------------------------------------------------------------//
    case UpdateArticleIDPopup:
      popupBody = 
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
      break;
  //------------------------------------------------------------------------------------------------//
    case UpdateCommentIDPopup:
      popupBody = 
        `<div id='updateArticleWrap'>
          <form id='${idForm}' action='updateComment' method='POST'>
            <label for='content' name='content'>Content :&nbsp;</label>
            <textarea name='content' class='textupdateComment'>${data.content}</textarea>
            <input class='updateCommentSubmit' type='submit' value='Valid Modifications' />
            <p id='articleMsg' class='articleMsg'></p>
          </form>
        </div>`;
      break;
  //------------------------------------------------------------------------------------------------//
    default:
      popupBody = 
        `<div>
          <form>
            <label for='content' name='content'>Content :&nbsp;</label>
            <textarea name='content' class='textupdateComment'>DEFAULT</textarea>
            <p id='articleMsg' class='articleMsg'></p>
          </form>
        </div>`;
      break;
  //------------------------------------------------------------------------------------------------//
  }
  return popupBody;
}

function vueGetAllArticles(art, moderated, count) {
  articleHtmlTemplate = 
  `<article class='article article_${art.id_account} article_${moderated}' id='article_${art.id_article}'>
  <header>
    <h3 class='h3'>${art.title}</h3>
    <p class='artTools redactor_${art.id_account} hide'>
      <img src='./assets/svg/warning-svgrepo-com.svg' alt='warning' title='Warning!' class='hide' id='warning_${art.id_article}'>
      <img src='./assets/svg/pencil-svgrepo-com.svg' alt='edit' title='Modify' class='pencil hand art_modify_${art.id_account} art_pencil is_mod_${moderated}' id='art_modify_${art.id_article}'>
      <img src='./assets/svg/trash-svgrepo-com.svg' alt='delete' title='Delete' class='trash hand art_delete_${art.id_account} art_trash is_mod_${moderated}' id='art_delete_${art.id_article}'>
      <img src='./assets/svg/trash-svgrepo-com.svg' alt='delete' title='Delete' class='trash hand art_modo_delete is_mod_${moderated} moderator hide' id='art_modo_delete_${art.id_article}'>
    </p>
  </header>
  <div class='post'>
    <div class='article_img'><img src='./assets/jpg/Article_${count}.jpg' alt='img' class='article_1'></div>
      <p class='content'>${art.content}</p>
      
      <p id='art_msg_tools_${art.id_article}' class='redactor_${art.id_account}'></p>
      <img src='./assets/svg/confirm-svgrepo-com.svg' alt='confirm' title='Confirm: Warning!\nYour article will be DEFINITELY deleted!!' id='confirm_art_del_${art.id_article}' class='hand hide'>
      <img src='./assets/svg/cancel-close-svgrepo-com.svg' alt='cancel' title='Cancel' id='cancel_art_del_${art.id_article}' class='hand hide'>
  </div>
  <footer class='postFooter'>
    <div class='author'>
      <p>${art.pseudo} | ${art.created_at}</p>
    </div>

    <img id='modo_art_switch_on' src='./assets/svg/switch_on-svgrepo-com.svg' alt='switch-on' class='moderator hide hand is_mod_${moderated} modo_art_switch_on'>
    <img id='modo_art_switch_off' src='./assets/svg/switch_off-svgrepo-com.svg' alt='switch-off' class='moderator hide hand is_mod_${moderated} modo_art_switch_off'>

    <div title='Show/Hide Comments' class='commentsView hand'>
      <img src='./assets/svg/eye-svgrepo-com.svg' alt='see' class='eye'>
      <span id='countComm_${art.id_article}'>&nbsp;0 comments</span>
    </div>
  </footer>
</article>

<aside class='hide article_${art.id_article}' id='${ShowHideComments}${count}'>
  <div class='addComment redactor hide'>
    <h4>Add New Comment</h4>
    <form id='addComment_${art.id_article}' class='formComment'>
      <div class='add'>
        <textarea name='content' class='textNewComment' placeholder='Write a new comment here'></textarea>
      </div>
      <div class='sendComment'>
        <div id='newCommentMsg'></div>
        <button id='sendComment_${art.id_article}' class='sendCommentButton hand' type='submit'>Send Comment</button>
      </div>
    </form>
  </div>
</aside>`;
return articleHtmlTemplate;
}

function vueGetAllComments(comm, moderated) {
  commentHtmlTemplate = 
  `<div class='comments comment_${comm.account_id} comment_${moderated}' id='comment_${comm.id_comment}'>
  <img src='./assets/svg/warning-svgrepo-com.svg' alt='warning' title='Warning!' class='hide' id='warning_${comm.id_comment}'>
  <img src='./assets/svg/confirm-svgrepo-com.svg' alt='confirm' title='Confirm: Warning!\nYour comment will be DEFINITELY deleted!!' 
    id='confirm_comm_del_${comm.id_comment}' class='hand hide'>
  <img src='./assets/svg/cancel-close-svgrepo-com.svg' alt='cancel' title='Cancel' id='cancel_comm_del_${comm.id_comment}' class='hand hide'>
  <img id='modo_comm_switch_on' src='./assets/svg/switch_on-svgrepo-com.svg' alt='switch-on' class='moderator hide hand is_mod_${moderated} modo_comm_switch_on'>
  <img id='modo_comm_switch_off' src='./assets/svg/switch_off-svgrepo-com.svg' alt='switch-off' class='moderator hide hand is_mod_${moderated} modo_comm_switch_off'>
<p class='dateAuthor'>
  <span class='authorComm'>${comm.pseudo} | ${comm.created_at}</span>
  <span class='redactor_${comm.account_id} commTools hide'>
    <img src='./assets/svg/pencil-svgrepo-com.svg' alt='edit' title='Modify' class='pencil hand comm_modify_${comm.account_id} comm_pencil is_mod_${moderated}' 
      id='comm_modify_${comm.id_comment}'>
    <img src='./assets/svg/trash-svgrepo-com.svg' alt='delete' title='Delete' class='trash hand comm_delete_${comm.account_id} comm_trash is_mod_${moderated}' 
      id='comm_delete_${comm.id_comment}'>
    <img src='./assets/svg/trash-svgrepo-com.svg' alt='delete' title='Delete' class='trash hand comm_modo_delete is_mod_${moderated} moderator hide' 
      id='comm_modo_delete_${comm.id_comment}'>
  </span>
</p>
<p class='textComment'>${comm.content}</p>
</div>`;
return commentHtmlTemplate;
}