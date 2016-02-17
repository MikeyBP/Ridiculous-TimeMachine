//Setting up variables and json data, populating various texts
var cometHits = 0;
var animDuration = 11;
var userName;

$.getJSON("resource/description.json", function(json) {
  $("#descript").html(json.descript[0].text);
 });




//Start of youtube Player
// YouTube API script
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

//If player ready or stops, call functions
function onYouTubePlayerAPIReady() {
  // create the global player from the specific iframe (#video)
  player = new YT.Player('video', {
    events: {
      // call this function when player is ready to use
      'onReady': onPlayerReady,
      'onStateChange': onplayerStateChange
    }
  });
}

//Bind custom play button to play
function onPlayerReady(event) {
  
  // bind events
  var playButton = document.getElementById("playButton");
  playButton.addEventListener("click", function() {
    player.playVideo();
  });
  
}

//Start funkyAnimation on video stop
function onplayerStateChange(event) {
  if(event.data === 0) {          
      $("#video").remove();
      userName = getCookie("username");
      $("#startText").html("Welcome "+userName+"!<br />You have travelled 2230 years into the past to prevent a comet from destroying your home planet. Are You Ready?");
      funkyAnimation();
  }
}

//Play video and expand background
function playVideo(){
  $("#descript").remove();
  $("#playButton").remove();
  $("#video").animate({
    width: "50%",
    height: "50%",
    top: "25%",
    left: "25%"
}, 1000);
  $(".coverPage").animate({
    width: "100%",
    height: "100%",
    top: "0%",
    left: "0%"
}, 1000);
  $(".stars, .twinkling").animate({
    width: "100%",
    height: "100%",
    top: "0%",
    left: "0%"
}, 1000);
}

//End of youtube player


//Start of Login functions

//Login details are accepted
function _success(){
  $("#loginInput").remove();
  $("#loginButton").remove();
  $(".coverPage").fadeIn("slow");
  $("#policeLogo").fadeOut("slow");
}

//Toggle between login and register
function _toggle(){
  $("#loginInput").toggle();
  $("#loginButton").toggle();
  $("#registerInput").toggle();
  $("#registerButton").toggle();  
}


//highlight text when inout field selected with chrom fix
$("input").focus(function() {
    var $this = $(this);
    $this.select();
    $this.mouseup(function() {
        $this.unbind("mouseup");
        return false;
    });
});

//Give login button a Enter key listener
$('#loginInput').keypress(function (e) {
    if (e.which == 13 && !e.shiftKey) {
    	e.preventDefault();
		checkCookie();
    	$(this).blur();
    }
});

//Give register button a Enter key listener
$('#registerInput').keypress(function (e) {
    if (e.which == 13 && !e.shiftKey) {
    	e.preventDefault();
		register();
    	$(this).blur();
    }
});

//End of Login functions

//Start of animation/game

//Run my funky animation
function funkyAnimation(){
  $(".clouds").css("display","block");
  $(".dirt").delay(1000).queue(function (next) {$(this).toggleClass("dirt-change");;next();});
  $(".backgroundDirt").delay(1000).queue(function (next) {$(this).toggleClass("backgroundDirt-change");;next();});
  $(".sun").delay(3500).queue(function (next) {$(this).css("display","inline");;next();});
  $(".sun").delay(1000).queue(function (next) {$(this).css("animation-play-state","running");;next();});
  $(".coverPage").delay(3800).queue(function (next) {$(this).css("animation-play-state","running");;next();});
  $(".dirt").delay(2800).queue(function (next) {$(this).css("animation-play-state","running");;next();});
  $(".mayanTemple").delay(10000).queue(function (next) {$(this).css("animation-play-state","running");;next();});
  $("#startGame").delay(17000).queue(function (next) {$(this).fadeIn("slow");;next();});
}

//Start the game
function startGame() {
  $("#startGame").css("display","none");
  $(".comet").css("animation-play-state","running");
}

//If comet animation reaches end, GAME OVER
$(".comet").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
    function(e) {
    
    alert("We all Died. The Future is Over...");
    $(".comet").remove();
    });

//Click comet to increase "score", speed up animation, randomize position. If 10 comets clicked, you win
$(".comet").click(function(){
  cometHits++;
  animDuration--;
  durationString = animDuration + "s";
  var el     = $(this),  
     newone = el.clone(true);
           
  el.before(newone);
        
  $(this).remove();
  var randomX = Math.floor(Math.random()*(80-10+1)+10) + "%";
  var randomY = Math.floor(Math.random()*(50-10+1)+10) + "%";
  $(".comet").css({"left":randomX,"top":randomY,"width":"0%","height":"0%","-webkit-animation-duration":durationString});
  $(".cometImg").css({"width":"100%","height":"100%"});
  if (cometHits < 10){
    $(".comet").delay(1000).queue(function (next) {$(this).css("animation-play-state","running");;next();});  
  }
  else {
    $(".comet").remove();
    alert("Our Glorious Hero hath saved Us! Praise his Mighty Comet-Swatting Future-Bat, much greater than the dinky bats of 2015.");
  }
});

//The end