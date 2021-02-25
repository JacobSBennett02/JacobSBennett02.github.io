/* global $ */
		'use strict'
		$(document).ready(function(){
			//////////////////////////////////////////////////////////////////
			//////////////////////////// SETUP ///////////////////////////////
			//////////////////////////////////////////////////////////////////

            var BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen
            var BOARD_HEIGHT = $(window).height();  // Number: the maximum Y-Coordinate of the screen
			// Every 50 milliseconds, call the update Function (see below)
			setInterval(update, 50);

			// Every time the box is clicked, call the handleBoxClick Function (see below)
			$('#box').on('click', handleBoxClick);
            
            var positionY = 0;
            var positionX = 0;
            var speedY= 1;
			var speedX = 1;
            var points = 0;

            
            
            //////////////////////////////////////////////////////////////////
			//////////////////////////// CORE LOGIC //////////////////////////
			//////////////////////////////////////////////////////////////////
           
            
            /* 
			This Function will be called 20 times/second. Each time it is called,
			it should move the Box to a new location. If the box drifts off the screen
			turn it around! 
			*/
			function update() {
                moveBox();
                boxHitbox();
                bounce();
			}

			/* 
			This Function will be called each time the box is clicked. Each time it is called,
			it should increase the points total, increase the speed, and move the box to
			the left side of the screen.
			*/
			function handleBoxClick() {
                increaseBoxSpeed();
                Points();
                boxReset();
                changeColor()
			}


         // DO NOT DELETE THIS LINE OF CODE. ALL JAVASCRIPT ABOVE HERE
        
            //////////////////////////////////////////////////////////////////
			//////////////////////////// HELPER FUNCTIONS ////////////////////
            //////////////////////////////////////////////////////////////////
            

            ////////// the code below is called to the handleBoxClick function ////////

            function changeColor() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                var rgbString = "rgb(" + r + "," + g + "," + b + ")";
                $('#box').css("background-color", rgbString);
            } 
            function Points(){
                // increases points
				points += 1;
				$('#box').text(points);
            }
            function increaseBoxSpeed(){
                // increases speed
                speedX +=3;
                speedY +=3;    
            }
            function boxReset(){
                // reset the position of the box
                positionX = 0;
                positionY = 0;
            }
            
            ////////// the code below is called to the update function ////////
            
            function moveBox(){
                positionX += speedX;
                positionY += speedY;
            }
            function boxHitbox(){
                //allows box to move along X and Y axis
                $('#box').css("left", positionX);
                $('#box').css("top", positionY);
            }
            function bounce(){
                //bounces box off left and right screen bounds
				if (positionX > BOARD_WIDTH) {
					speedX = -speedX;
				}
				else if (positionX < 0) {
					speedX = -speedX;
                }
                
                //bounces box off top and bottom screen bounds
				if (positionY > BOARD_HEIGHT) {
					speedY = -speedY;
				}
				else if (positionY < 0) {
					speedY = -speedY;
				}
            }
        });    

			