// Enemies our player must avoid\
var x;
var y;
var height = 60;
var width = 40;

//enemy object
var Enemy = function(x, y, speed) {
    
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + speed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < 500) {
        this.x = this.x + this.speed * dt  ;

    } else {
        this.x = -100;

    }

    // The objects are touching
    
    if (this.x < player.x + width && this.x + height > player.x &&
        this.y < player.y + height && this.y + width > player.y) {
        player.reset();
        player.lives--;
    }


};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 400;
    this.lives = 3;
    this.score = 0;
    //this.level = 1;
    this.players = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',

    ]

}
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
    this.gameOver();
    this.win();

};

//the player wins the game
Player.prototype.win = function() {
    if (this.y <= 0 && allStars.length == 0) {
        this.score = this.score + 30;
        this.reset();
        alert("Game Over. You Won!");
        this.lives = 3;
        this.score = 0;
        allStars = [stars, stars1, stars2];
        allExtralives = [extralife];

    } else if (this.y <= 0 && allStars.length !== 0) {
        this.reset();
        this.score = this.score + 30;
    }

}
//gameover once all lives are used up
Player.prototype.gameOver = function() {

    if (this.lives === 0) {
        alert("Game Over");
        this.reset();

        //player.handleInput();

        //this.handleInput();

        this.lives = 3;
        this.score = 0;
        
        allStars = [stars, stars1, stars2];
        //this.level=1;
        allExtralives = [extralife];
    }
};
//renders the player to the page

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillText("Lives: " + this.lives, 140, 45);
    ctx.fillText("Score: " + this.score, 140, 25);
    //ctx.fillText("Level: " + this.level, 140, 10);
};
//reset the player to starting point
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;

    //player.handleInput();
    //this.handleInput();

}
// Now instantiate your objects.

var enemy1 = new Enemy(-50, 240, 1);
var enemy2 = new Enemy(400, 150, 0.5);
var enemy3 = new Enemy(0, 60, 2);
var enemy4 = new Enemy(300, 240, 3);
var enemy5 = new Enemy(0, 150, 1);
var enemy6 = new Enemy(150, 60, 3);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// Place the player object in a variable called player

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
Player.prototype.handleInput = function(s) {
    
    if (s == 'down' && this.y < 400) {
        this.y += 90;
    } else if (s == 'up' && this.y > 0) {
        this.y -= 90;
    } else if (s == 'left' && this.x > 100) {
        this.x -= 90;
    } else if (s == 'right' && this.x < 350) {
        this.x += 90;
    }


    if (s == 'enter') {
        this.playerSwap();

    }
}

//stackoverflow.com/questions/8252607/constantly-loop-a-javascript-array-and-display-results-to-div
var index = 0;

Player.prototype.playerSwap = function() {
    index = (index + 1) % player.players.length;
    player.sprite = player.players[index];
};

//obstacle object. Obstacles in the game
var Obstacle = function(x, y) {
    this.sprite = 'images/Rock.png';
    this.y = y;
    this.x = x;

}

Obstacle.prototype.update = function() {

    // The objects are touching
    //var height = 60;
    //var width = 40;

    if (this.x < player.x + width && this.x + height > player.x &&
        this.y < player.y + height && this.y + width > player.y) {
        player.y += 90;

    }


}
//display obtacles to the game
Obstacle.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var obstacle1 = new Obstacle(0, 60);
var obstacle2 = new Obstacle(200, 240);
var obstacle3 = new Obstacle(400, 150);

var allObstacles = [obstacle1, obstacle2, obstacle3];



//stars object
var Stars = function(x, y, speed) {
    this.sprite = 'images/Star.png';
    this.y = y;
    this.x = x;
    this.speed = speed;

}

Stars.prototype.update = function(dt) {

    if (this.x < 500) {
        this.x += this.speed + Math.floor((Math.random() * 100) + 1) * dt;

    } else {
        this.x = -100;

    }
    // The objects are touching
    //var height = 60;
    //var width = 40;

    if (this.x < player.x + width && this.x + height > player.x &&
        this.y < player.y + height && this.y + width > player.y) {

        allStars.splice(index1, 1);
        player.score += 20;

    }
}
//render stars to the page
Stars.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var array1 = [0, 100, 200, 300, 400];
var random1 = array1[Math.floor(Math.random() * array1.length)]
var stars = new Stars(random1, 60, 1);
var stars1 = new Stars(random1, 150, 0.5);
var stars2 = new Stars(random1, 240, 0.1);



//stars array to be displayed to the page
var allStars = [stars, stars1, stars2];
//determine index of the collision between player and star
var index1 = allStars.indexOf(Stars);


//Stars.prototype.remove = function(){
//for(i=0; i < allStars.length; i--){
//allStars.splice(i,1);
//}
//}

//Extra Life object
var Extralife = function(x, y) {
    this.sprite = 'images/Heart.png';
    this.y = y;
    this.x = x;

}

Extralife.prototype.update = function() {

    // The objects are touching
    //var height = 60;
    //var width = 40;

    if (this.x < player.x + width && this.x + height > player.x &&
        this.y < player.y + height && this.y + width > player.y) {
        allExtralives = [];
        player.lives += 1;
    }


}
//render the extralife(heart) to the page
Extralife.prototype.render = function() {

ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var array2 = [0, 100, 200, 300, 400];
var random2 = array2[Math.floor(Math.random() * array2.length)];
var array = [60, 150, 240];
var random = array[Math.floor(Math.random() * array.length)];

var extralife = new Extralife(random2, random);
//all extralives array to be displayed to the page
allExtralives = [extralife];

//keyup functions
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
