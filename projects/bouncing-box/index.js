(function(){
    'use strict'
    /* global jQuery */

    //////////////////////////////////////////////////////////////////
    /////////////////// SETUP DO NOT DELETE //////////////////////////
    //////////////////////////////////////////////////////////////////
    
    var box = jQuery('.box');	// reference to the HTML .box element
    var board = jQuery('.board');	// reference to the HTML .board element
    var boardWidth = board.width();	// the maximum X-Coordinate of the screen
    var boardHeight = jQuery(window).height();
    // Every 50 milliseconds, call the update Function (see below)
    setInterval(update, 50);
    
    // Every time the box is clicked, call the handleBoxClick Function (see below)
    box.on('click', handleBoxClick);

    // moves the Box to a new position on the screen along the X-Axis
    function moveBoxTo(newPositionX, newPositionY) {
        box.css("left", newPositionX);
        box.css('top', newPositionY);
        
    }

    // changes the text displayed on the Box
    function changeBoxText(newText) {
        box.text(newText);
    }

    //////////////////////////////////////////////////////////////////
    /////////////////// YOUR CODE BELOW HERE /////////////////////////
    //////////////////////////////////////////////////////////////////
    
    // TODO 2 - Variable declarations 
    var randNumX = Math.random(0, boardWidth) * 100;
    var randNumY = Math.random(0, boardHeight) * 100 ;
    var positionX = 0;
    var points = 0;
    var speed = 10;
    var positionY = 0;
    var speedY = 10;
    /* 
    This Function will be called 20 times/second. Each time it is called,
    it should move the Box to a new location. If the box drifts off the screen
    turn it around! 
    */
    
    function update() {
        positionX = positionX + speed;
        positionY = positionY + speedY;
        moveBoxTo(positionX, positionY);
        if(positionX > boardWidth){
            speed = -speed;
        }
        if(positionX < 0){
            speed = -speed;
        }
        if(positionY > boardHeight){
            speedY = -speedY;
        }
        if(positionY < 0){
            speedY = -speedY;
        }
    };

    /* 
    This Function will be called each time the box is clicked. Each time it is called,
    it should increase the points total, increase the speed, and move the box to
    the left side of the screen.
    */
    function handleBoxClick() {
        positionX = randNumX;
        positionY = randNumY;
        points++;
        changeBoxText(points);
        speed = speed * 1.15;
        speedY = speedY * 1.15;
    };
})();

