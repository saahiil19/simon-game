var buttonColours = ["red" , "blue", "green" , "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
        if(!started){
                $("#level-title").text("level "+level);
                nextSeq();
        started = true;
    }
});



$(".btn").click(function(){
    var userChosenColour  = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playsound(userChosenColour);
    checkAns(userClickedPattern.length-1);
});

function checkAns(currentlevel){
    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
        // console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSeq();
            }, 1000);
        }
    }else{
        playsound("wrong");
        $("body").addClass("game-over");

        $("#level-title").text("Game Over, Press Any Key to Restart"); 
        setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
        startover();
    }
}
function nextSeq(){

    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);

    var randnum =Math.floor(Math.random()*4) ;   
    var randchosencolor = buttonColours[randnum];
    gamePattern.push(randchosencolor);
    $("#"+randchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);      
    playsound(randchosencolor);
    
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
          $("#" + currentColor).removeClass("pressed");
        }, 100);
  }
function playsound(sound){
    var audio = new Audio(sound + ".mp3");
    audio.play();
}
function startover(){
    level=0;
    gamePattern=[];
    started=false;
}