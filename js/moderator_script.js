

// ------------------------------ //
//      FIRST TOOLS FUNCTIONS     //
// ------------------------------ //
function switchModerator(elements) {
  let hide = `hide`;
  let removeHide = hide;
  let contains_hide = hide;
  let artPencilUser = `art_modify_${sessionStorage.id_user}`;
  let commPencilUser = `comm_modify_${sessionStorage.id_user}`;
  let negativeIndex = `negative_index`;
  let isMod_0 = `is_mod_0`;
  let isMod_1 = `is_mod_1`;
  
  toggleIf(elements, contains_hide, removeHide);

  let articleTools = document.querySelectorAll(`.artTools`);
  let commentTools = document.querySelectorAll(`.commTools`);

  let articlePencils = document.querySelectorAll(`.art_pencil`);
  let articleTrashes = document.querySelectorAll(`.art_trash`);

  let commentPencils = document.querySelectorAll(`.comm_pencil`);
  let commentTrashes = document.querySelectorAll(`.comm_trash`);
  
  let modo_articleTrashes = document.querySelectorAll(`.art_modo_delete`);
  let modo_commentTrashes = document.querySelectorAll(`.comm_modo_delete`);

  let artSwitchOn = document.querySelectorAll(`#modo_art_switch_on`);
  let artSwitchOff = document.querySelectorAll(`#modo_art_switch_off`);

  let commSwitchOn = document.querySelectorAll(`#modo_comm_switch_on`);
  let commSwitchOff = document.querySelectorAll(`#modo_comm_switch_off`);

  toggleIf(articleTools, contains_hide, hide);
  toggleIf(commentTools, contains_hide, hide);

  toggleIfNot(articlePencils, artPencilUser, hide); //
  toggleIfNot(articleTrashes, contains_hide, hide);

  toggleIfNot(commentPencils, commPencilUser, hide); // 
  toggleIfNot(commentTrashes, contains_hide, hide);

  toggleIf(modo_articleTrashes, isMod_0, negativeIndex);
  toggleIf(modo_commentTrashes, isMod_0, negativeIndex);

  toggleIf(artSwitchOn, isMod_1, hide);
  toggleIf(artSwitchOff, isMod_0, hide);
  toggleIf(commSwitchOn, isMod_1, hide);
  toggleIf(commSwitchOff, isMod_0, hide);
}


function toggleIf(elements, thisClass, toggleClass) {
  for (elt of elements) {
    if (elt.classList.contains(thisClass)) {
      elt.classList.toggle(toggleClass);
    }
  }
}


function toggleIfNot(elements, thisClass, toggleClass) {
  for (elt of elements) {
    if (!elt.classList.contains(thisClass)) {
      elt.classList.toggle(toggleClass);
    }
  }
}


// ------------------------ //
//        LISTENERS         //
// ------------------------ //
function modo_listeners() {
  const modo_artTrashes = document.querySelectorAll(`.art_modo_delete`);
  const modo_commTrashes = document.querySelectorAll(`.comm_modo_delete`);
  const modo_art_switch_on = document.querySelectorAll(`.modo_art_switch_on`);
  const modo_art_switch_off = document.querySelectorAll(`.modo_art_switch_off`);
  const modo_comm_switch_on = document.querySelectorAll(`.modo_comm_switch_on`);
  const modo_comm_switch_off = document.querySelectorAll(`.modo_comm_switch_off`);
  const articles = document.querySelectorAll(`.article`);
  const comments = document.querySelectorAll(`.comments`);
  build_modo_Art_Comm_Tool_Listeners(modo_artTrashes, build_Delete_Article_Alerts, articles);
  build_modo_Art_Comm_Tool_Listeners(modo_commTrashes, build_Delete_Comment_Alerts, comments);
  build_modo_Art_Comm_Tool_Listeners(modo_art_switch_on, art_switch_is_Mod, articles);
  build_modo_Art_Comm_Tool_Listeners(modo_art_switch_off, art_switch_is_Mod, articles);
  build_modo_Art_Comm_Tool_Listeners(modo_comm_switch_on, comm_switch_is_Mod, comments);
  build_modo_Art_Comm_Tool_Listeners(modo_comm_switch_off, comm_switch_is_Mod, comments);
}


function build_modo_Art_Comm_Tool_Listeners(tools, func, Targets) {
  let i = 0;
  for (elt of tools) {
    let onTargetTool = Targets[i];
    elt.addEventListener('click', () => func(onTargetTool));
    i ++;
  }
}


// ----------------------- //
//      MODO FUNCTIONS     //
// ----------------------- //
function art_switch_is_Mod(article) {
  let id_art = splitAndParseToID(article.id);
  let set_mod;
  let is_mod_0 = 'article_0';
  let is_mod_1 = 'article_1';
  let data = {};
  let action;
  let func;
  if (article.classList.contains(is_mod_0)) {
    set_mod = splitAndParseToID(is_mod_1);
    action = 'art_switch_to_1';
    func = art_switch_to_1_Success;
  }
  else if (article.classList.contains(is_mod_1)) {
    set_mod = splitAndParseToID(is_mod_0);
    action = 'art_switch_to_0';
    func = art_switch_to_0_Success;
  }
  data.id_article = id_art;
  data.set_mod = set_mod;
  data.action = action;
  sendCnxData(data, action, func);
}


function comm_switch_is_Mod(comment) {
  let id_comm = splitAndParseToID(comment.id);
  let set_mod;
  let is_mod_0 = 'comment_0';
  let is_mod_1 = 'comment_1';
  let data = {};
  let action;
  let func;
  if (comment.classList.contains(is_mod_0)) {
    set_mod = splitAndParseToID(is_mod_1);
    action = 'comm_switch_to_1';
    func = comm_switch_to_1_Success;
  }
  else if (comment.classList.contains(is_mod_1)) {
    set_mod = splitAndParseToID(is_mod_0);
    action = 'comm_switch_to_0';
    func = comm_switch_to_0_Success;
  }
  data.id_comment = id_comm;
  data.set_mod = set_mod;
  data.action = action;
  sendCnxData(data, action, func);
}


//  ------------------------------- //
//        SUCCESS / FAILURE         //
//  ------------------------------- //

// ---------- DELETE ARTICLE __ modo_deleteArticle($id)
// Success ----------
function modo_deleteArticleSuccess(resp, displayMsg) {
  displayMsg.innerHTML = `(PHP) ${resp}`;
  setTimeout(() => {
    navClearMsg(displayMsg, '3000');
    if (resp == `Article correctly deleted!`) {
      setTimeout(() => {
        displayArticles();
      }, ClearTime);
    }
  }, '4000');
}
// Failure ----------
function modo_deleteArticleFail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) modo_deleteArticleFail(error)!`;
  console.log(error+ '\nmodo_deleteArticleFail(error)');
  navClearMsg(displayMsg, ClearTime);
}


// ---------- DELETE COMMENT __ modo_deleteComment($id)
// Success ----------
function modo_deleteCommentSuccess(resp, displayMsg) {
  displayMsg.innerHTML = `(PHP) ${resp}`;
  setTimeout(() => {
    navClearMsg(displayMsg, LongTime);
    if (resp == `Comment correctly deleted!`) {
      setTimeout(() => {
        displayArticles();
      }, ClearTime);
    }
  }, '4000');
}
// Failure ----------
function modo_deleteCommentFail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) modo_deleteCommentFail(error)!`;
  console.log(error+ '\nmodo_deleteCommentFail(error)');
  navClearMsg(displayMsg, ClearTime);
}


// ---------- SWITCH ARTICLE TO 1 __ set_art_is_mod_to($id, $set)
// Success ----------
function art_switch_to_1_Success(resp, displayMsg) {
  displayMsg.innerHTML = `(PHP) ${resp}`;
  navClearMsg(displayMsg, ClearTime);
  if (resp == `Article correctly set to : is_mod_1!`) {
    setTimeout(() => {
      displayArticles();
    }, UpdateTime);
  }
}
// ---------- SWITCH ARTICLE TO 0 __ set_art_is_mod_to($id, $set)
// Success ----------
function art_switch_to_0_Success(resp, displayMsg) {
  displayMsg.innerHTML = `(PHP) ${resp}`;
  navClearMsg(displayMsg, ClearTime);
  if (resp == `Article correctly set to : is_mod_0!`) {
    setTimeout(() => {
      displayArticles();
    }, UpdateTime);
  }
}
// ---------- FAILURE FO SWITCH ARTICLE TO (1 & 0) __ set_art_is_mod_to($id, $set)
// Failure ----------
function art_switch_to_mod_Fail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) art_switch_to_Fail(error)!`;
  console.log(error+ '\nart_switch_to_Fail(error)');
  navClearMsg(displayMsg, ClearTime);
}


// ---------- SWITCH COMMENT TO 1 __ set_comm_is_mod_to($id, $set)
// Success ----------
function comm_switch_to_1_Success(resp, displayMsg) {
  displayMsg.innerHTML = `(PHP) ${resp}`;
  navClearMsg(displayMsg, ClearTime);
  if (resp == `Comment correctly set to : is_mod_1!`) {
    setTimeout(() => {
      displayArticles();
    }, UpdateTime);
  }
}
// ---------- SWITCH COMMENT TO 0 __ set_comm_is_mod_to($id, $set)
// Success ----------
function comm_switch_to_0_Success(resp, displayMsg) {
  displayMsg.innerHTML = `(PHP) ${resp}`;
  navClearMsg(displayMsg, ClearTime);
  if (resp == `Comment correctly set to : is_mod_0!`) {
    setTimeout(() => {
      displayArticles();
    }, UpdateTime);
  }
}
// ---------- FAILURE FO SWITCH ARTICLE TO (1 & 0) __ set_comm_is_mod_to($id, $set)
// Failure ----------
function comm_switch_to_mod_Fail(error, displayMsg) {
  displayMsg.innerHTML = `(JS) comm_switch_to_Fail(error)!`;
  console.log(error+ '\ncomm_switch_to_Fail(error)');
  navClearMsg(displayMsg, ClearTime);
}





window.onscroll = function() {myFunction()};
function myFunction() {
	currenttop = $(window).scrollTop();
	sectionheight = $('#home').height();

    if (currenttop < sectionheight) {
		toppx = currenttop + 'px';
		//$('#subscribediv').css("margin-top", toppx);
		$('#backgroundzone').css("background-image","url('mailing/home4.jpg')");
	}
	//if(currenttop >= sectionheight){
	//	$('#backgroundzone').css("background-image","url('images-final/mur.jpg')");
	//}
	if(currenttop >= (3*sectionheight)){
		$('#backgroundzone').css("background-image","url('images-final/protegee.jpg')");
	}
	
	
	$('section').each(function(){
		thistop = $('#'+this.id).offset().top;
        if (currenttop >= thistop-50 && currenttop < (thistop+sectionheight/2)) {
			$('nav a').removeClass('active');
			$('nav a.'+this.id).addClass('active');
			return false;
        }
    });
}
 function changeSection(sectionID) {
        $('html, body').animate({
            scrollTop: $('#' + sectionID).offset().top
        });

  }
