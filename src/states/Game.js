// Create game

const game = new Phaser.Game(400, 730, Phaser.AUTO, 'game-wrapper', {
  preload: preload,
  create: create,
  update: update,
});

let player;
let healthPickup;
let background;
let laser; // To hold each laser
let lasers;
let laserTime = 0;
let enemies; // To hold all the enemies
let specialEnemies; // To hold special enemies
let score = 0;

let newHighscore = 0;
if (localStorage.getItem('High-Score')) {
  newHighscore = localStorage.getItem('High-Score'); // Use local storage to save highscore
}
const scoreText = document.querySelector('.score');
let health = 200;

// Loads all assets
function preload() {
  // Load all assets
  game.load.image('background', 'src/sprites/images/spacebg.gif');
  // Player ship
  game.load.image('playerShip', 'src/sprites/images/playerShip.gif');
  // Enemy ship
  game.load.image('enemyShip', 'src/sprites/images/enemy.png');
  // Special enemy ship
  game.load.image('specialEnemy', 'src/sprites/images/newEnemyShip.png');
  // Player shot
  game.load.image('laser', 'src/sprites/images/shot.png');
  // Health pickup
  game.load.image('healthPickup', 'src/sprites/images/heart2.gif');
  // Explosion
  game.load.spritesheet('explosion', 'src/sprites/images/explosion3.png', 32, 32);
  // Emotional support alien
  game.load.spritesheet('emotionalSupportAlien', 'src/sprites/images/emotionalSupportAlien.png', 35, 55);
  // Sounds
  game.load.audio('laserBlast', 'src/sprites/laserBlast.wav');
  game.load.audio('enemySplode', 'src/sprites/enemyExplode.wav');
  game.load.audio('healthGet', 'src/sprites/healthSound.wav');
  game.load.audio('playerDie', 'src/sprites/playerDie.wav');
  game.load.audio('gamePlay', 'src/sprites/GamePlaySoundTrack.mp3');
}

// This function holds all the game logic

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE); //add physics engine

  background = game.add.tileSprite(0, 0, 1000, 600, 'background');
  background.scale.x = 1;
  background.scale.y = 2;

  backgroundSoundTrack = game.sound.add('gamePlay');
  backgroundSoundTrack.play();
  backgroundSoundTrack.loopFull();
  backgroundSoundTrack.volume = 0.5;

  //set keys to keyboard input
  game.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT) && game.input.keyboard.addKey(Phaser.Keyboard.A);
  game.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT) && game.input.keyboard.addKey(Phaser.Keyboard.D);
  
  pause_label = game.add.text(window.innerWidth - 100, 20, 'Pause');
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        // When the pause button is pressed it pauses the game
        game.paused = true;

        // Then add the menu
        menu = game.add.sprite(window.innerWidth/2, window.innerHeight/2, 'menu');
        menu.anchor.setTo(0.5, 0.5);

        // And a label to illustrate which menu item was chosen. (This is not necessary)
        choiceLabel = game.add.text(window.innerWidth/2, window.innerHeight-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
        choiceLabel.anchor.setTo(0.5, 0.5);
    });

  emotionalSupportAlien = game.add.sprite(window.innerHeight + 10, window.innerWidth - 100, 'emotionalSupportAlien');

  //set player to playerShip
  //set player to game.add.sprite to enable body physics
  player = game.add.sprite(game.canvas.width / 2, game.canvas.height - 100, 'playerShip');
  player.scale.set(0.9);
  game.physics.arcade.enable(player, Phaser.Physics.ARCADE); //set player physics
  player.body.collideWorldBounds = true; //player cannot leave world bounds
  player.body.bounce.setTo(1);
  player.anchor.set(0.5, 1); //position player's anchor point to the middle of sprite
  player.body.immovable = true; //player wont move upon collision
  player.x = game.input.x || game.world.width * 0.5; //player starts in middle of screen
  player.body.velocity.x = 200; //set default x velocity to 200

  // Create enemy lasers
  lasers = game.add.group(); // Create group of lasers
  lasers.enableBody = true;
  game.physics.arcade.enable(lasers, Phaser.Physics.ARCADE);
  lasers.createMultiple(100, 'laser'); // Add 100 laser bullets to group
  lasers.setAll('anchor.x', 0.5);
  lasers.setAll('anchor.y', 0.5);
  lasers.setAll('scale.x', 0.5);
  lasers.setAll('scale.y', 0.5);
  lasers.setAll('outOfBoundsKill', true);
  lasers.setAll('checkWorldBounds', true);

  // Create enemies

  // Make enemy shoot lasers
  // Enemy movement and make enemy fire at random intervals

  enemies = game.add.group();
  enemies.enableBody = true;
  game.physics.arcade.enable(enemies, Phaser.Physics.ARCADE);
  enemies.createMultiple(500, 'enemyShip');
  enemies.scale.set(0.5);
  enemies.setAll('anchor.x', 0.5);
  enemies.setAll('anchor.y', 0.5);

  enemies.setAll('outOfBoundsKill', true);
  enemies.setAll('checkWorldBounds', true);
  enemies.setAll('angle', 180);

  deployEnemyShips();

  // Create special enemies (bosses)

  specialEnemies = game.add.group();
  specialEnemies.enableBody = true;
  game.physics.arcade.enable(specialEnemies, Phaser.Physics.ARCADE);
  specialEnemies.createMultiple(100, 'specialEnemy');
  specialEnemies.scale.set(0.5);
  specialEnemies.setAll('anchor.x', 0.5);
  specialEnemies.setAll('anchor.y', 0.5);
  specialEnemies.setAll('scale.x', 1.3);
  specialEnemies.setAll('scale.y', 1.3);
  specialEnemies.setAll('outOfBoundsKill', true);
  specialEnemies.setAll('checkWorldBounds', true);
  specialEnemies.setAll('angle', 180);  

  setInterval(function() {
    healthAppear();
  }, 5000);
}

// Update function changes things inside each frame (around 30-60 times per second)

function update() {
  if (game.input.activePointer.isDown) {
    playerMovement();
  }

  if (game.leftKey.isDown) {
    player.body.velocity.x = -200; // Move the player left when pressed
    fireLaser(); // Run the fire laser method
  } else if (game.rightKey.isDown) {
    player.body.velocity.x = 200; // Move the player right when pressed
    fireLaser(); // Run the fire laser method
  }

  // Add collision detection for enemyShips and bullets
  game.physics.arcade.collide(lasers, enemies, destroyEnemy);
  // Add collision detection for enemyShips and playerShip
  game.physics.arcade.collide(enemies, player, takeDamage);
  if (health <= 0) {
    killPlayer(); // Run the kill player method
  }
  // Add collision detection for specialEnemy and playerShip
  game.physics.arcade.collide(specialEnemies, player, takeDamage);
  game.physics.arcade.collide(lasers, specialEnemies, destroyEnemy);
  // Add collision for health pickup
  game.physics.arcade.collide(healthPickup, player, increaseHealth);

  background.tilePosition.y += 1;
}

// Function fireLaser
// First if statement checks if previous laser fired time has elapsed enough
// Laser is set to first laser in lasers group
// Second if condition sets position of laser to player body
// Velocity is set to shoot out laser
// Set laserTime to current time + 200 so player cannot shoot laser rapidly

function fireLaser() {
  if (game.time.now > laserTime) {
    laser = lasers.getFirstExists(false);
    if (laser) {
      laser.reset(player.x + 5, player.y - 80);
      laser.body.velocity.y = -400;

      laserTime = game.time.now + 250;
      laserBlastSE = game.sound.add('laserBlast'); // Adding laser sound effect
      laserBlastSE.play();
    }
  }
}

// Function deployEnemyShips adds enemies to the game space
let switchXSpawn = 0;
let switchToNewPattern = 0;
let enemyXSpawn = 200;
let ENEMY_X = 0;
let spawnSpecialEnemy = false;
function deployEnemyShips() {
  let ENEMY_SPEED = 300;
  let enemy = enemies.getFirstExists(false);
  if (enemy) {
    enemy.reset(enemyXSpawn, 0);
    enemy.body.velocity.x = ENEMY_X;
    enemy.body.velocity.y = ENEMY_SPEED;
    enemy.body.drag.x = 0;

    if (switchXSpawn === 0 && switchToNewPattern < 10) {
      spawnSpecialEnemy = false;
      game.time.events.add(300, function() {
        ENEMY_X = 0;
        enemyXSpawn = 200;
        switchXSpawn = 1;
        switchToNewPattern++;

        deployEnemyShips();
      });
    } else if (switchXSpawn === 1 && switchToNewPattern < 10) {
      game.time.events.add(300, function() {
        ENEMY_X = 0;
        enemyXSpawn = 100;
        switchXSpawn = 2;
        switchToNewPattern++;

        deployEnemyShips();
      });
    } else if (switchXSpawn === 2 && switchToNewPattern < 10) {
      game.time.events.add(300, function() {
        ENEMY_X = 0;
        enemyXSpawn = 300;
        switchXSpawn = 0;
        switchToNewPattern++;

        deployEnemyShips();
      });
    } else if (switchToNewPattern === 10) {
      game.time.events.add(250, function() {
        enemyXSpawn = 380;
        ENEMY_X = -80;

        game.time.events.add(2000, function() {
          switchToNewPattern = 20;
        });
        deployEnemyShips();
      });
    } else if (switchToNewPattern === 20) {
      game.time.events.add(250, function() {
        enemyXSpawn = 0;
        ENEMY_X = 80;

        game.time.events.add(2000, function() {
          switchToNewPattern = 30;
        });
        deployEnemyShips();
      });
    } else if (switchToNewPattern === 30) {
      spawnSpecialEnemy = true;
      switchXSpawn = 0;
      switchToNewPattern = 0;
      enemyXSpawn = 200;
      ENEMY_X = 0;

      deploySpecialEnemy();
    }
  }
}

let specialCount = 0;
let specialEnemyXSpawn = 200;
function deploySpecialEnemy() {
  // Figure out how to get rid of normal enemies while special enemy is in play
  if (spawnSpecialEnemy) {
    let specialEnemy = specialEnemies.getFirstExists(false);

    if (specialEnemy && specialCount != 3) {
      specialEnemy.reset(specialEnemyXSpawn, 0);
      specialEnemy.body.velocity.y = 800;
      specialEnemy.body.drag.x = 0;
      game.time.events.add(500, function() {
        deploySpecialEnemy();
        if (specialEnemyXSpawn === 200) {
          specialEnemyXSpawn = 100;
        } else if (specialEnemyXSpawn === 100) {
          specialEnemyXSpawn = 300;
        } else if (specialEnemyXSpawn === 300) {
          specialEnemyXSpawn = 200;

          setInterval(function() {
            deployEnemyShips();
          }, 5000);
        }
      });
    }
  }
}

// Function destroyEnemy kills the laser and enemy upon collison
function destroyEnemy(enemy, laser) {
  enemy.kill();
  laser.kill();
  increaseScore();
  let explosion = game.add.sprite(enemy.x - 10, enemy.y - 10, 'explosion');
  explosion.scale.set(2);
  explosion.animations.add('boom');
  explosion.play('boom', 15, false, true);
  let soundExplode = game.sound.add('enemySplode');
  soundExplode.play();
}

//Function increaseScore increases the players score by 10
function increaseScore() {
  score += 10;
  scoreText.innerHTML = `Score: ${score}`;
  if (score > newHighscore) {
    newHighscore = score;
  }
  const highscore = document.querySelector('.highscore');
  highscore.innerHTML = `High Score: ${newHighscore}`;
  localStorage.setItem('High-Score', newHighscore); // Set highscore in local storage
}

//Function takeDamage reduces the players health on collision with an enemy
const healthText = document.querySelector('#health');
function takeDamage(player, enemy, specialEnemy) {
  let playerDeathSE = game.add.sound('playerDie');
  playerDeathSE.play();
  enemy.kill();
  health -= 100;
  healthText.innerHTML = `Health: ${health}`;
}

const gameOver = document.querySelector('.gameover');
const restart = document.querySelector('.restart');
//Function killPlayer removes the player from the game
function killPlayer() {
  let explosion = game.add.sprite(player.x - 50, player.y - 80, 'explosion');
  explosion.scale.set(4);
  explosion.animations.add('boom');
  explosion.play('boom', 15, false, true);
  player.kill();

  setInterval(function() {
    Phaser.GAMES[0].paused = true;
  }, 500);

  if (laser) {
    laser.kill();
  }

  restart.classList.remove('display-none');
  gameOver.style.display = 'initial';

  restart.addEventListener('click', function(e) {
    location.reload();
  });
}

function healthAppear() {
  let randomX = Math.floor(Math.random() * 600);
  healthPickup = game.add.sprite(randomX, 20, 'healthPickup');
  healthPickup.enableBody = true;
  game.physics.arcade.enable(healthPickup, Phaser.Physics.ARCADE);
  healthPickup.anchor.set(0.5, 1);

  healthPickup.body.immovable = false;
  healthPickup.body.velocity.x = 20;
  healthPickup.body.velocity.y = 200;
  healthPickup.game.outOfBoundsKill = false;
}

function increaseHealth(healthPickup) {
  healthPickup.kill();
  health += 50;
  increaseScore();
  let healthSoundSE = game.add.sound('healthGet');
  healthSoundSE.play();
  healthText.innerHTML = `Health: ${health}`;
  healthText.classList.add('glowText');
  setInterval(function() {
    healthText.classList.remove('glowText');
  }, 800);
}

function playerMovement() {
  if (game.time.now > 500) {
    game.input.activePointer.isDown = false;
    player.body.velocity.x = player.body.velocity.x * -1;
    fireLaser();
  }
}

//game.input.onDown.add(unpause, self);
// Method that handles the unpause event
function unpause(event){
    // Only act if paused
    if(game.paused){
        // Calculate the corners of the menu
        var x1 = window.innerWidth/2 - 270/2, x2 = window.innerWidth/2 + 270/2,
            y1 = window.innerHeight/2 - 180/2, y2 = window.innerHeight/2 + 180/2;
        // Check if the click was inside the menu
        if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
            // The choicemap is an array that will help us see which item was clicked
            var choicemap = ['one', 'two', 'three', 'four', 'five', 'six'];
            // Get menu local coordinates for the click
            var x = event.x - x1,
                y = event.y - y1;
            // Calculate the choice 
            var choice = Math.floor(x / 90) + 3*Math.floor(y / 90);
            // Display the choice
            choiceLabel.text = 'You chose menu item: ' + choicemap[choice];
        }
        else{
            // Remove the menu and the label
            menu.destroy();
            choiceLabel.destroy();
            // Unpause the game
            game.paused = false;
        }
    }
}