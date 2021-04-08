/* global $ */
		'use strict'
		$(document).ready(function(){
			//////////////////////////////////////////////////////////////////
			//////////////////////////// SETUP ///////////////////////////////
			//////////////////////////////////////////////////////////////////

            var BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen
            var BOARD_HEIGHT = $('#board').height();  // Number: the maximum Y-Coordinate of the screen
            $(document).on('keydown', handleKeyDown);                        
            $(document).on('keyup', handleKeyUp);
            var KEY = {
                "w": 87,
                "up": 38,
                "s": 83,
                "down": 40
            };
            // Every 30 milliseconds, call the update Function (see below)
			setInterval(update, 30);
            ////////////////// GAME OBJECTS BELOW ///////////////
			function GameItem( x, y, speedX, speedY, id){
                return {
                    x: x,
                    y: y,
                    height: $(id).height(),
                    width: $(id).width(),
                    speedX: speedX,
                    speedY: speedY,
                    id: id
                };
            }
            
            ///////////// CODE BELOW HANDLES BALL /////////////
            var ball = GameItem(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3), "#ball");
            
            
            /////////// CODE BELOW HANDLES PADDLE 1 //////////////////
            var paddle1 = GameItem(20, 200, 0, 0, "#player1Paddle");
            

            //////////// CODE BELOW HANDLES PADDLE 2 /////////////////
            var paddle2 = GameItem(BOARD_WIDTH - 20 - $('#player2Paddle').width(), 200, 0, 0, "#player2Paddle");
            


            var randomNum = Math.floor(Math.random() * 10);
            var score1 = 0;
            var score2 = 0;
            //////////////////////////////////////////////////////////////////
			//////////////////////////// CORE LOGIC //////////////////////////
			//////////////////////////////////////////////////////////////////
           
            
            /* 
			This function will be called 20 times/second. Each time it is called,
			it should move the Ball to a new location. 
			*/
			function update() {
                moveBall();
                selectBall();
                bounce();
                selectPaddles();
                movePaddle();
                paddleBorders();
                ballPaddleCollision();
                resetBall();                
                increasePoints();
                drawPoints();
                endGame();
			}

			/* 
            This function will be called each time the ball hits a paddle. 
            Each time it is called, it should increase the speed total, and bounce the ball off the paddle.
			*/
            

         // DO NOT DELETE THIS LINE OF CODE. ALL JAVASCRIPT ABOVE HERE
        
            //////////////////////////////////////////////////////////////////
			//////////////////////////// HELPER FUNCTIONS ////////////////////
            //////////////////////////////////////////////////////////////////
            
            ////////// the code below is called to the update function ////////
            function endGame(){
                if (score1 === 11){
                    ball.speedX = 0;
                    ball.speedY = 0;
                }else if(score2 === 11){
                    ball.speedX = 0;
                    ball.speedY = 0;
                }
                
                if (score1 === 11){
                    alert("Player 1 wins");
                }else if(score2 === 11){
                    alert("Player 2 wins");
                }
            }
            function resetBall(){
            if (ball.x > BOARD_WIDTH) {
                ball.x = 220;
                ball.y = 220;
                ball.speedX = -3;
                ball.speedY = -3;
                score1++;
                }
			
			if (ball.x < -10) {
                ball.x = 220;
                ball.y = 220;
                ball.speedX = 3;
                ball.speedY = 3;
                score2++;
                }    
            }
            function increasePoints(){
                if (ball.x > BOARD_WIDTH - 1){
                    score1 += 1;
                }
                if (ball.x < -9){
                    score2 += 1;
                }
            }
            function drawPoints(){
                $("#player1Text").text(score1);
                $("#player2Text").text(score2);
            }
            ////////////// CODE BELOW HANDLES PADDLE CONTROLS ///////////////
            function movePaddle(){
                paddle1.y += paddle1.speedY;
                paddle2.y += paddle2.speedY;
            }
            function handleKeyDown(event) {
                 if(event.which === KEY.w){
                     paddle1.speedY = -5;
                }else if(event.which === KEY.s){
                     paddle1.speedY = 5;
                }else if(event.which === KEY.up){
                     paddle2.speedY = -5;
                }else if(event.which === KEY.down){
                     paddle2.speedY = 5;
                }
            }
            function handleKeyUp(event) {
                if(event.which === KEY.w){
                    paddle1.speedY = 0;
                }else if(event.which === KEY.s){
                    paddle1.speedY = 0;
                }else if(event.which === KEY.up){
                    paddle2.speedY = 0;
                }else if(event.which === KEY.down){
                    paddle2.speedY = 0;
                }
            }

            //////////// BELOW HANDLES PADDLES ////////////////////

            function selectPaddles(){
                $('#player1Paddle').css("top", paddle1.y);
                $('#player2Paddle').css("top", paddle2.y);
            }
            
            function paddleBorders(){
                //bounces paddles off top and bottom screen bounds
				if (paddle1.y > BOARD_HEIGHT - $("#player1Paddle").height()) {
					paddle1.y = BOARD_HEIGHT - $("#player1Paddle").height();
				}
				else if (paddle1.y < 0) {
					paddle1.y = 0;
                }
                
                if (paddle2.y > BOARD_HEIGHT - $("#player2Paddle").height()) {
					paddle2.y = BOARD_HEIGHT - $("#player2Paddle").height();
				}
				else if (paddle2.y < 0) {
					paddle2.y = 0;
				}
            }
            
            ///////////////// CODE BELOW HANDLES BALL ///////////////
            // randomly decides which way the ball moves
            function moveBall(){
                if(randomNum > 5){
                    ball.x += ball.speedX;
                }else {
                    ball.x -= ball.speedX;
                }
                if(randomNum > 5){
                    ball.y += ball.speedY;
                }else {
                    ball.y -= ball.speedY;
                }
            }
            function selectBall(){
                //allows box to move along X and Y axis
                $('#ball').css("left", ball.x);
                $('#ball').css("top", ball.y);
            }
            function bounce(){
                //bounces ball off top and bottom screen bounds
				if (ball.y > BOARD_HEIGHT - 20) {
					ball.speedY = -ball.speedY;
				}
				else if (ball.y < 5) {
					ball.speedY = -ball.speedY;
				}
            }
            ///////////// CODE BELOW HANDLES BALL AND PADDLES COLLISION//////
            function doCollide(obj1, obj2) {

                obj1.leftX = obj1.x + 13;
                obj1.topY = obj1.y;
                obj1.rightX = obj1.x + obj1.width - 13;
                obj1.bottomY = obj1.y + obj1.height;


                obj2.leftX = obj2.x;
                obj2.topY = obj2.y;
                obj2.rightX = obj2.x + obj2.width;
                obj2.bottomY = obj2.y + obj2.height;

                if (obj1.leftX < obj2.rightX &&
                obj1.rightX > obj2.leftX &&
                obj1.bottomY > obj2.topY &&
                obj1.topY < obj2.bottomY) {
                    return true;
                }
                else {
                    return false;
                }
            }
            function ballPaddleCollision(){
                    // if doCollid === true inverted speeds
                    if (doCollide(ball, paddle1)) {
                        ball.speedX *= -1;
                        increaseBallSpeed();
                        }
                        if (doCollide(ball, paddle2)) {
                        ball.speedX *= -1;
                        increaseBallSpeed();
                    }
            }
            // progressively makes the ball faster as it hits paddles
            function increaseBallSpeed() {
                if (ball.speedX >= 0) {
                    ball.speedX += .5;
                }
                else {
                    ball.speedX -= .5;
                }
                if (ball.speedY >= 0) {
                    ball.speedY += .5;
                }
                else {
                    ball.speedY -= .5;
                }
            }
            
        });    

			