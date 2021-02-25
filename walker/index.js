/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var BOARD_WIDTH = $('#board').width();	// the maximum X-Coordinate of the screen
  var BOARD_HEIGHT = $('#board').height();  // the maximum Y-Coordinate of the screen

  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
      "left": 37,
      "up": 38,
      "right": 39,
      "down": 40
  };

  var positionX = 0;
  var speedX = 0;
  var positionY = 0;
  var speedY = 0;
  // Game Item Objects
  

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    borderCollision();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.left){
        speedX = -5;
    }else if(event.which === KEY.up){
        speedY = -5;
    }else if(event.which === KEY.right){
        speedX = 5;
    }else if(event.which === KEY.down){
        speedY = 5;
    }
  }
  function handleKeyUp(event) {
    if(event.which === KEY.left){
        speedX = 0;
    }else if(event.which === KEY.up){
        speedY = 0;
    }else if(event.which === KEY.right){
        speedX = 0;
    }else if(event.which === KEY.down){
        speedY = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function borderCollision(){
                //bounces box off left and right screen bounds
				if (positionX > BOARD_WIDTH - $("#gameItem").width()) {
					positionX = BOARD_WIDTH - $("#gameItem").width();
				}
				else if (positionX < 0) {
					positionX = 0;
                }
                
                //bounces box off top and bottom screen bounds
				if (positionY > BOARD_HEIGHT - $("#gameItem").height()) {
					positionY = BOARD_HEIGHT - $("#gameItem").height();
				}
				else if (positionY < 0) {
					positionY = 0;
				}
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  function repositionGameItem(){
    positionX += speedX; // moves box along x-axis
    positionY += speedY; // moves box along y-axis
  }
  function redrawGameItem(){
      $("#gameItem").css("left", positionX); // allows box to move along x-axis
      $("#gameItem").css("top", positionY); // allows box to move along y-axis
  }
}
