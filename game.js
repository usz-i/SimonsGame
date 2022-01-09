
// Declares an array of variables for the buttons
var buttonColours = ["red", "blue", "green", "yellow"];

// Declares two empty arrays that get items pushed into them
var gamePattern = [];
var userClickedPattern = [];


// incrementation of the steps for the level as the game progresses

// A boolean to keep track of when the game starts and level to be incremented
var started = false;
var level = 0;

// function gameStarted(){
//
//   if (!started){    // if started is false
//     $("#level-title").text("Level " + level);
//     newSequence();
//     started = true;
//   }
//
// };
//
// $(document).on("keydown", gameStarted);


// Event Listener for key pressed to start the Game
$(document).keydown(function() {
  if (!started) {     // if started === false

    $("#level-title").text("Level " + level); // changes the game level
    // Calls the function to start a new sequence
    newSequence();
    // Declares the game as started
    started = true;
  }
});


// Event listener for a click function

$(".btn").on("click", function() {

  // Gets the id of the button clicked
  var userChosenColor = $(this).attr("id");

  //pushed the clicked color on the empty array to keep track of user pattern
  userClickedPattern.push(userChosenColor);

  // branches to the playSound function and passes the argument color to be played
  playSound(userChosenColor);

  // animates the color of the button pressed
  animatePress(userChosenColor);

  // Checks the answer of the clicked pattern based on the length - 1 to keep track of the index
  checkAnswer(userClickedPattern.length - 1);

  //console.log(userClickedPattern);

});

// step 2
function newSequence() {

  // declares the array to be empty
  userClickedPattern = [];

  // increments the level everytime the function is called
  level++;

  // changes the level
  $("#level-title").text("Level " + level);

  // generates a random number between 1 and 4
  var randomNumber = Math.floor(Math.random() * 4);

  // button[0] = randomChosencolour
  var randomChosencolour = buttonColours[randomNumber];

  // the random color gets pushed into the game pattern
  gamePattern.push(randomChosencolour);

  // this animates a fade in and fade out based on the opacity
  $("#" + randomChosencolour).fadeIn(100).fadeOut(100).fadeIn(100);

  // branches to the fucntion playSound and passes the chosen color as the sound
  playSound(randomChosencolour);

}

// function to check entered gamePattern

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { /// checking for the content that has been pushed into the arrays
    console.log("succes!");
    if (userClickedPattern.length === gamePattern.length) { // checks if the length of both array is the same
      setTimeout(function() { // sets a   timeout to call the function if true
        newSequence()
      }, 1000); // completed over 1000 miliseconds

    }
  } else {

    console.log("Wrong"); // else statement

    // var wrong = new Audio("sounds/wrong.mp3");
    // wrong.play();

    // branches to the playSound function and passes wrong as the parameter
    playSound("wrong");

    // adds class from the css on the fly to the function
    $("body").addClass("game-over");

    // sets a timeout function to remove the class after a period of time
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // changes the title
    $("#level-title").text("Game Over, Press Any Key to Restart!");

    // branches to the startOver function with no parameters
    startOver();
  }

}

//starting over the gamePattern by emptying all arrays and level = 0 and statred as false.

function startOver(){

  userClickedPattern = [];
  gamePattern = [];
  $("#level-title").text("Game Over, Press Any Key to Restart!");
  level = 0;
  started = false;

}
// sound function, gets passed an argument from the new sequence function based
// on what was clicked and then it concatenate the source for the sound. Big w
// Could have used switch for this also but this appears to be more effective as you
// refract the code more and re-use it

function playSound(color) {

  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

// this function animate the buttons by adding a class and then setting a timeout
//  to remove it after a 100 miliseconds

function animatePress(currentColor) {

  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}
