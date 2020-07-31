var gamepattern=[];
var userpickedpattern=[];
var level=0;
var colourseq = ["red","blue","green","yellow"];
var started =false;
$(document).keypress(function(){
  if(!started){
    $("h1").text("Level "+level);
    nextsequence();
    started=true;
  }
})
function nextsequence(){
 userpickedpattern=[];
 level++;
 $("#level-title").text("Level " + level);
    var randomnumber = Math.floor(Math.random()*4);
    var randomcolor = colourseq[randomnumber];
    gamepattern.push(randomcolor);
    $("#"+randomcolor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomcolor);


}
$(".btn").click(function(){

  var userpickedclr = $(this).attr("id");
  userpickedpattern.push(userpickedclr);
  animatepress(userpickedclr);

  playsound(userpickedclr);

checkanswer(userpickedpattern.length-1);
})


function playsound(sound){
  var audio = new Audio("sounds/"+sound+".mp3");
  audio.play();
}

function animatepress(color){

    $("."+color).addClass("pressed");
    setTimeout(
      function(){
        $("."+color).removeClass("pressed")
      },100
    )

}
function checkanswer(level){
  console.log(userpickedpattern);
  console.log(gamepattern);
  if(gamepattern[level]===userpickedpattern[level]){
    if(gamepattern.length===userpickedpattern.length){
      setTimeout(function(){
        nextsequence();
      },1000);
    }

  }
  else{

    playsound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver(){
  level=0;
  started=false;
  gamepattern=[];
}
