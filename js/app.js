// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.speed);

    if(this.x > 550){
        this.restart();
    }

    //Collision Points
    if (this.y == player.y - 60 && (this.x > player.x - 20 && this.x < player.x + 20)){
        player.resetBug();
    }
    else if (this.y == player.y - 40 && (this.x > player.x - 20 && this.x < player.x + 20)){
        player.resetBug();
    }
    else if (this.y == player.y - 20 && (this.x > player.x - 20 && this.x < player.x + 20)){
        player.resetBug();
    }
    else if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)){
        player.resetBug();
    }
    else if (this.y == player.y + 20 && (this.x > player.x - 20 && this.x < player.x + 20)){
        player.resetBug();
    }
};

//Reset bugs left
Enemy.prototype.restart = function () {
    var yS = [220, 140, 60];
    var speedS = [400, 500, 600];
    this.x = x;
    this.y = yS[Math.floor(Math.random() * 3)];
    this.speed = speedS[Math.floor(Math.random() * 3)]
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed, myscore, bugscore) {
    this.x = 200;
    this.y = 400;
    this.speed = 300;
    this.myscore = 0;
    this.bugscore = 0;
    this.sprite = 'images/char-boy.png';
};

//update
Player.prototype.update = function () {
    this.x = this.x;
    this.y = this.y;
    this.speed = this.speed;
    this.myscore = this.myscore;
    this.bugscore = this.bugscore;
};

//render
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

//input
Player.prototype.handleInput = function(arrow) {
    if (arrow == 'up'){
        this.y = this.y - 20;
    }else if (arrow == 'right') {
        this.x = this.x + 20;
    }else if (arrow == 'down') {
        this.y = this.y + 20;
    }else if (arrow == 'left') {
        this.x = this.x - 20;
    };
//keeps player from moving off down
    if (this.y > 404) {
        this.y = 404;
    }
//resets
    else if (this.y < -5) {
        this.reset();
    };
//moving off left and right sides
    if (this.x < -15) {
        this.x = -15;
    }else if (this.x > 420) {
        this.x = 420;
    }
};

//if player reaches water function
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
    this.speed = 300;
    this.myscore = this.myscore + 1;
    console.log(this.myscore);
    document.getElementsByClassName('char-boy')[0].innerHTML = 'Char-boy' + this.myscore;
};

//if player hits a bug
Player.prototype.resetBug = function () {
    this.x = 200;
    this.y = 400;
    this.speed = 300;
    this.bugscore = this.bugscore + 1;
    console.log(this.bugscore);
    document.getElementsByClassName('bugs')[0].innerHTML = 'Bugs' + this.bugscore;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var yS = [220, 140, 60];
var speedS = [200, 300, 400];

    for (var i = 0; i < 4; i++) {
        var x = -100;
        var y = yS[Math.floor(Math.random() * 3)];
        var speed = speedS[Math.floor(Math.random() * 3)];
        var enemy = new Enemy(x, y, speed);
        allEnemies.push(enemy);
    }
// Place the player object in a variable called player
var player = new Player(x, y, speed);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
