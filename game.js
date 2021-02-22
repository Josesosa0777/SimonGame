// debugger;
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started = false;
var level=0;

$(document).keydown(function() {
	if (!started) {
		// console.log(event.key);
		$("#level-title").text("Level "+level);
		// debugger;
		nextSequence();
		started = true;
	}
	
});


$(".btn").click(function() {
	// $("h1").css("color", "purple");
	// console.log(this)	
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	// debugger;
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length-1);
	// debugger;

});

function checkAnswer(currentLevel) {
	// debugger;
	if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
		console.log("success");
		if (userClickedPattern.length===gamePattern.length) {
			setTimeout(function() {  
				nextSequence(); 
			}, 1000);
		}
	}
	else {
		console.log("wrong");
		var audio2=new Audio("sounds/wrong.mp3"); 
		audio2.play();
		$("body").addClass("game-over");
		setTimeout(function() { 
			$("body").removeClass("game-over"); 
		}, 200);
		$("#level-title").text("Game Over, Press Any Key to Restart");
		startOver();
	}
}

function nextSequence() {
	userClickedPattern=[];
	level++;
	$("#level-title").text("Level "+level);
	var randomNumber=Math.floor(Math.random()*4);
	var randomChosenColour=buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	$("#"+randomChosenColour).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
	
}


function playSound(name) {
	var audio=new Audio("sounds/"+name+".mp3"); 
	audio.play();
}
	
function animatePress(currentColour) {
	// debugger;
	// $(currentColour).css("backgroundColor", "gray");
	$("#"+currentColour).addClass("pressed");
	setTimeout(function() {  
		$("#"+currentColour).removeClass("pressed"); 
	}, 100);

}

function startOver() {
	level=0;
	gamePattern=[];
	started=false;
}