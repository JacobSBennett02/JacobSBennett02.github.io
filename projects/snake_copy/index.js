/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var KEY = {
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40,
  }
  
  // Game Item Objects
  
  function GameItem(x, y, velX, velY, id) {
    return {
      x: x * 20,
      y: y * 20,
      prevX: x * 20,
      prevY: y * 20,
      width: $(id).width(),
      originalW: $(id).width(),
      height: $(id).height(),
      left: x * 20,
      right: (x * 20) + $(id).width(),
      top: y * 20,
      bottom: (y * 20) + $(id).height(),
      speedX: velX,
      speedY: velY,
      id: id
    };
  }

  var apple = GameItem(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), 0, 0, "#apple");
  repositionApple();

  var snakeHead = GameItem(5, 6, 20, 0, "#snakeHead");

  var snakeTotal = [snakeHead];

  for (var i = 0; i < 3; i++) {
    $('<div id="snakeBody' + i + '" class = "snake"></div>').insertAfter("#snakeHead");
    snakeTotal.push(GameItem(5, (snakeTotal[i].y / 20) + 1, 0, 0, "#snakeBody" + i))
  }

  var snakeLength = snakeTotal.length;

  var canLeft = false;
  var canRight = true;
  var canUp = true;
  var canDown = true;

  // one-time setup
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
    snakeLength = snakeTotal.length;
    redrawGameItem(snakeTotal);
    checkWalls(snakeTotal);
    checkSelf(snakeTotal);
    checkApple(snakeTotal, apple);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which == KEY.UP) {
      if (snakeHead.speedY == 0 && canUp) {
        snakeHead.speedY = -20;
        snakeHead.speedX = 0;
      }
    }
    if (event.which == KEY.DOWN) {
      if (snakeHead.speedY == 0 && canDown) {
        snakeHead.speedY = 20;
        snakeHead.speedX = 0;
      }
    }
    if (event.which == KEY.RIGHT) {
      if (snakeHead.speedX == 0 && canRight) {
        snakeHead.speedY = 0;
        snakeHead.speedX = 20;
      }
    }
    if (event.which == KEY.LEFT) {
      if (snakeHead.speedX == 0 && canLeft) {
        snakeHead.speedY = 0;
        snakeHead.speedX = -20;
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    alert("Game Over!")
    // turn off event handlers
    $(document).off();
  }

  function repositionApple() {
    apple = GameItem(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), 0, 0, "#apple");
    $(apple.id).css("left", apple.x);
    $(apple.id).css("top", apple.y);
  }

  function redrawGameItem(snake) {
    for (var i = 0; i < snakeLength; i++) {
      let obj = snake[i]

      if (obj == snake[0]) {
          obj.prevX = obj.x
          obj.x += obj.speedX;

          obj.prevY = obj.y
          obj.y += obj.speedY;
      }

      else {
        obj.prevX = obj.x;
        obj.x = snake[i - 1].prevX;
        obj.prevY = obj.y;
        obj.y = snake[i - 1].prevY;
        if ($(obj.id).css("z-index") == -2) {
          $(obj.id).css("z-index", 1)
        }
      }
      
      $(obj.id).css("left", obj.x);
      $(obj.id).css("top", obj.y);
    }
  }

  function checkWalls(snake) {
    let obj = snake[0];

    if (obj.x < 0 || obj.x > $("#board").width() - 20 || obj.y < 0 || obj.y > $("#board").height() - 20) {
      endGame();
    }
  }

  function checkSelf(snake) {
    let head = snake[0];

    for (var i = 1; i < snakeLength; i++) {
      if (head.x == snake[i].x && head.y == snake[i].y) {
        endGame();
      }
    }

    head.x > head.prevX ? canLeft = false : canLeft = true;
    head.x < head.prevX ? canRight = false : canRight = true;
    head.y > head.prevY ? canUp = false : canUp = true;
    head.y < head.prevY ? canDown = false : canDown = true;
  }
  
  function checkApple(snake, apple) {
    let head = snake[0];

    if (head.x == apple.x && head.y == apple.y) {
      addSegment();
      repositionApple();
    }
  }

  function addSegment () {
    $('<div id="snakeBody' + (snakeTotal.length - 1) + '" class = "snake" style= "z-index: -2;"></div>').insertAfter("#snakeHead");
    snakeTotal.push(GameItem(snakeTotal[snakeTotal.length - 1].prevX / 20, snakeTotal[snakeTotal.length - 1].prevY / 20, 0, 0, "#snakeBody" + (snakeTotal.length - 1)))
  }
}
