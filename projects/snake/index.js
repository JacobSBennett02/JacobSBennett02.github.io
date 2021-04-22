/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var BOARD_WIDTH = $("#board").width();
  var BOARD_HEIGHT = $("#board").height();
  var KEY = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  };
  // Game Item Objects
    function GameItem(id, x, y, speedX, speedY){
        return{
            id: id,
            x: x,
            y: y,
            speedX: speedX,
            speedY: speedY
        }
    }
    var apple = GameItem("#apple", Math.floor(Math.random() * 20) * 20, Math.floor(Math.random() * 20)* 20, 0, 0);
    var snakeHead = GameItem("#snakeHead", 220, 220, 0, 0);
    //var snakeBody = GameItem("#snakeBody", )
    const snakeBody =[
        {x: snakeHead.x, y: snakeHead.y},

    ];
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    selectGameItems();
    moveSnake();
    boardBoundaries();
    checkApple();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.left && snakeHead.speedX === 0){
        snakeHead.speedX = -20;
        snakeHead.speedY = 0;
    }else if(event.which === KEY.right && snakeHead.speedX === 0){
        snakeHead.speedX = 20;
        snakeHead.speedY = 0;
    }else if(event.which === KEY.up && snakeHead.speedY === 0){
        snakeHead.speedY = -20;
        snakeHead.speedX = 0;
    }else if(event.which === KEY.down && snakeHead.speedY === 0){
        snakeHead.speedY = 20;
        snakeHead.speedX = 0;
    }
  }

  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function selectGameItems(){
      $("#apple").css("top", apple.y);
      $("#apple").css("left", apple.x);
      $("#snakeHead").css("top", snakeHead.y);
      $("#snakeHead").css("left", snakeHead.x);
  }
  function moveSnake(){
      snakeHead.y += snakeHead.speedY;
      snakeHead.x += snakeHead.speedX;
  }
  function boardBoundaries(){
      if(snakeHead.x > BOARD_WIDTH - $("#snakeHead").width() ||
        snakeHead.x < 0 ||
        snakeHead.y > BOARD_HEIGHT - $("#snakeHead").height() ||
        snakeHead.y < 0 ){
            endGame();
      }
  }
  function repositionApple() {
    apple = GameItem("#apple", Math.floor(Math.random() * 20) * 20, Math.floor(Math.random() * 20) * 20, 0, 0 );
    $(apple.id).css("left", apple.x);
    $(apple.id).css("top", apple.y);
  }
  
  function checkApple() {
    if (snakeHead.x === apple.x && snakeHead.y === apple.y) {
      addSegment();
      repositionApple();
    }
  }
  function addSegment() {
    
  }
  function moveSegment(){

  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    // turn off event handlers
    $(document).off();
  }
  
}
