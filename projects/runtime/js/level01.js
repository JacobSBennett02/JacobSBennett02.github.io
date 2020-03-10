var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 1400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY - 110},
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "sawblade", "x": 3400, "y": groundY },
                { "type": "sawblade", "x": 2600, "y": groundY - 110},
                { "type": "sawblade", "x": 2900, "y": groundY }
            ],
            "enemy":[
                { "type": "square", "x" :900, "y": groundY - 50},
                { "type": "square", "x" :1050, "y": groundY - 115},
                { "type": "square", "x" :1900, "y": groundY - 50},
                { "type": "square", "x" :2300, "y": groundY - 50},
                { "type": "square", "x" :2900, "y": groundY - 50},
                { "type": "square", "x" :3050, "y": groundY - 115},
                { "type": "square", "x" :3900, "y": groundY - 50},
                { "type": "square", "x" :4300, "y": groundY - 50}
            ],
            "wall":[
                { "type": "wall", "x" :1800, "y": groundY - 10}, 
                { "type": "wall", "x" :2200, "y": groundY - 10},
                { "type": "wall", "x" :2400, "y": groundY - 10},
                { "type": "wall", "x" :3800, "y": groundY - 10}, 
                { "type": "wall", "x" :4200, "y": groundY - 10},
                { "type": "wall", "x" :4400, "y": groundY - 10}
                ],
            "speeder":[
                { "type": "square", "x":3000, "y": groundY - 50},
                { "type": "square", "x":8000, "y": groundY - 50},
                { "type": "square", "x":12000, "y": groundY - 50},
                { "type": "square", "x":14400, "y": groundY - 50},
                { "type": "square", "x":14500, "y": groundY - 50},
                { "type": "square", "x":14600, "y": groundY - 50},
                { "type": "square", "x":14700, "y": groundY},
                { "type": "square", "x":14800, "y": groundY},
                { "type": "square", "x":15100, "y": groundY - 50},
                { "type": "square", "x":15200, "y": groundY - 50},
                { "type": "square", "x":15300, "y": groundY - 50},
                { "type": "square", "x":15400, "y": groundY - 100},
                { "type": "square", "x":15500, "y": groundY - 100},
                { "type": "square", "x":16300, "y": groundY},
                { "type": "square", "x":16400, "y": groundY},
                { "type": "square", "x":16700, "y": groundY - 100},
                { "type": "square", "x":17400, "y": groundY},
                { "type": "square", "x":17450, "y": groundY},
                { "type": "square", "x":17500, "y": groundY}
                ]
            
        };  
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x,y){       // defines sawblades
            var hitZoneSize = 25;
            var damageFromObstacle = 20;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);  
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            
        }
        createSawBlade(400,groundY - 110); 
        createSawBlade(1200,groundY);
        createSawBlade(1600,groundY - 110);
        
        for (var i = 0; i < levelData.gameItems.length; i++) {          // allows creation of sawblades
            
            var GameItemSawblade = levelData.gameItems[i];
            var sawbladeX = GameItemSawblade.x;
            var sawbladeY = GameItemSawblade.y;
            createSawBlade(sawbladeX, sawbladeY);
            
            
        }
        
        function createWall(x,y) {              // defines walls
            var hitZoneSize = 20;
            var damageFromObstacle = 30;
            var wallHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            wallHitZone.x = x;
            wallHitZone.y = y;
            game.addGameItem(wallHitZone);  
            var obstacleImage = draw.bitmap('img/wall.png');
            wallHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        };
            
        
        for (var i = 0; i < levelData.wall.length; i++) {      // allows creation of walls
            var eachElement = levelData.wall[i];
            var GameItemWall = levelData.wall[i];
            var wallX = GameItemWall.x;
            var wallY = GameItemWall.y;
            createWall(wallX, wallY);
        }
        
        function createEnemy(x,y){                                     // creates enemy
            var enemy =  game.createGameItem('enemy',25);           
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -2;           
            enemy.rotationalVelocity = 10;
            
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-50);
                enemy.shrink();
                
            };
    
            enemy.onProjectileCollision = function(){
                console.log("Halle has hit the enemy");
                game.increaseScore(100);
                enemy.fadeOut();
                
            };
        }
        //createEnemy(1900,groundY-50);
       // createEnemy(1000,groundY-50);
       // createEnemy(1300,groundY-115);

        for (var i = 0; i < levelData.enemy.length; i++) {      // allows creation of enemies
            var GameItemEnemy = levelData.enemy[i];
            var enemyX = GameItemEnemy.x;
            var enemyY = GameItemEnemy.y;
            createEnemy(enemyX, enemyY);
        }
        
        
        function createReward(x,y){                                     // defines reward
            var reward =  game.createGameItem('reward',12.5);           
            var greenSquare = draw.rect(25,25,'lightGreen');
            greenSquare.x = -12.5;
            greenSquare.y = -12.5;
            reward.addChild(greenSquare);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -2;           
            reward.rotationalVelocity = -10;
            
            reward.onPlayerCollision = function() {
                game.changeIntegrity(50);
                reward.fadeOut();
                game.increaseScore(500);
            };
        }   
        
        createReward(2050,groundY-130);
        createReward(4550,groundY-130);
        function createBonus(x,y){                                     // defines bonus
            var reward =  game.createGameItem('reward',6.25);           
            var greenSquare = draw.rect(12.5,12.5,'yellow');
            greenSquare.x = -6.25;
            greenSquare.y = -6.25;
            reward.addChild(greenSquare);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -2;           
            reward.rotationalVelocity = -10;
            
            reward.onPlayerCollision = function() {
                reward.fadeOut();
                game.increaseScore(1000);
            };
        }   
        
        createBonus(4120,groundY-130);
        
        function createSpeeder(x,y){                                     // defines speeder
            var speeder =  game.createGameItem('speeder',20);           
            var purpleSquare = draw.rect(40,40,'purple');
            purpleSquare.x = -20;
            purpleSquare.y = -20;
            speeder.addChild(purpleSquare);
            speeder.x = x;
            speeder.y = y;
            game.addGameItem(speeder);
            speeder.velocityX = -6;           
            speeder.rotationalVelocity = -10;
            
            speeder.onPlayerCollision = function() {
                game.changeIntegrity(-40);
                speeder.shrink();
            };
        
            speeder.onProjectileCollision = function(){
                console.log("Halle has hit the speeder");
                game.increaseScore(300);
                speeder.fadeOut();
                
            };
        } 
        
         for (var i = 0; i < levelData.speeder.length; i++) {      // allows creation of speeders
            var GameItemSpeeder = levelData.speeder[i];
            var speederX = GameItemSpeeder.x;
            var speederY = GameItemSpeeder.y;
            createSpeeder(speederX, speederY);
        }
        
         function createBoss(x,y){                                     // defines boss
            var boss =  game.createGameItem('boss',75);           
            var bossSquare = draw.rect(150,150,'darkRed');
            bossSquare.x = -75;
            bossSquare.y = -75;
            boss.addChild(bossSquare);
            boss.x = x;
            boss.y = y;
            game.addGameItem(boss);
            boss.velocityX = -1;           
            boss.rotationalVelocity = -3;
            
            boss.onPlayerCollision = function() {
                game.changeIntegrity(-100);
                boss.shrink();
            };
        
            
            boss.onProjectileCollision = function(){
                console.log("Halle has hit the boss");
                game.increaseScore(4400);
                boss.fadeOut();
            };
            
            
        }
            createBoss(3800, groundY-50);
        
        function createLazerWall(x,y){
            var lazerWallUpper = game.createGameItem('lazerWall',25);
            var lazerWallLower = game.createGameItem('lazerWall',25);
            var lazerWallUpperSquare = draw.rect(50,-500, 'teal');
            var lazerWallLowerSquare = draw.rect(50, 500, 'teal');
            lazerWallUpperSquare.x = -25;
            lazerWallUpperSquare.y = 25;
            lazerWallLowerSquare.x = -25;
            lazerWallLowerSquare.y = - 25;
            lazerWallUpper.addChild(lazerWallUpperSquare);
            lazerWallLower.addChild(lazerWallLowerSquare);
            lazerWallUpper.x = x;
            lazerWallUpper.y = y-200;
            lazerWallLower.x = x;
            lazerWallLower.y = y + 40;
            game.addGameItem(lazerWallUpper);
            game.addGameItem(lazerWallLower);
            lazerWallUpper.velocityX = -6;
            lazerWallLower.velocityX = -6;
            
            lazerWallUpper.onPlayerCollision = function() {
                game.changeIntegrity(-80);
            };
            lazerWallLower.onPlayerCollision = function() {
                game.changeIntegrity(-80);
            };
            
        }
        
        createLazerWall(15800,groundY-50);
        createLazerWall(14000,groundY);
        createLazerWall(15950,groundY-50);
        createLazerWall(16100,groundY);
        createLazerWall(17100,groundY-50);
        createLazerWall(17150,groundY-50);
        createLazerWall(17800,groundY);
        createLazerWall(17850,groundY);
        // DO NOT EDIT CODE BELOW HERE
    
    
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
