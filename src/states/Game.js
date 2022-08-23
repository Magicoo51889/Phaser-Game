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
  let mouseClick;
  let leftKey;
  let rightKey;
  game.load.image('background', 'assets/images/spacebg.gif');
  //player ship
  game.load.image('playerShip', 'assets/images/spaceship.png');
  //enemy ship
  game.load.image('enemyShip', 'assets/images/enemy.png');
  //special enemy ship
  game.load.image('specialEnemy', 'assets/images/newEnemyShip.png');
  //player shot
  game.load.image('laser', 'assets/images/shot.png');
  //health pickup
  game.load.image('healthPickup', 'assets/images/heart2.png');
  //explosion
  game.load.spritesheet('explosion', 'assets/explosion3.png', 32, 32);
  //sounds
  game.load.audio('laserBlast', 'assets/laserNoise.wav');
  game.load.audio('enemySplode', 'assets/enemyExplode.wav');
  game.load.audio('healthGet', 'assets/healthSound.wav');
  game.load.audio('playerDie', 'assets/playerDie.wav');
}

// This funciton holds all the game logic

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE); //add physics engine

  background = game.add.tileSprite(0, 0, 1000, 600, 'background');
  background.scale.x = 1;
  background.scale.y = 2;
  //set keys to keyboard input

  game.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  game.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

  //set player to playerShip
  //set player to game.add.sprite to enable body physics
  player = game.add.sprite(game.canvas.width / 2, game.canvas.height - 100, 'playerShip');
  player.scale.set(0.25);
  game.physics.arcade.enable(player, Phaser.Physics.ARCADE); //set player physics
  player.body.collideWorldBounds = true; //player cannot leave world bounds
  player.body.bounce.setTo(1);
  player.anchor.set(0.5, 1); //position player's anchor point to the middle of sprite
  player.body.immovable = true; //player wont move upon collision
  player.x = game.input.x || game.world.width * 0.5; //player starts in middle of screen
  player.body.velocity.x = 200; //set default x velocity to 200

  // Create enemy lasers

  lasers = game.add.group(); //create group of lasers
  lasers.enableBody = true;
  game.physics.arcade.enable(lasers, Phaser.Physics.ARCADE);
  lasers.createMultiple(100, 'laser'); //add 100 laser bullets to group
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

// update function changes each frame

function update() {
  if (game.input.activePointer.isDown) {
    playerMovement();
  }

  if (game.leftKey.isDown) {
    player.body.velocity.x = -200;
    fireLaser();
  } else if (game.rightKey.isDown) {
    player.body.velocity.x = 200;
    fireLaser();
  }

  //add collision detection for enemyShips and bullets
  game.physics.arcade.collide(lasers, enemies, destroyEnemy);
  //add collision detection for enemyShips and playerShip
  game.physics.arcade.collide(enemies, player, takeDamage);
  if (health <= 0) {
    killPlayer();
  }
  //add collision detection for specialEnemy and playerShip
  game.physics.arcade.collide(specialEnemies, player, takeDamage);
  game.physics.arcade.collide(lasers, specialEnemies, destroyEnemy);
  //add collision for health pickup
  game.physics.arcade.collide(healthPickup, player, increaseHealth);

  background.tilePosition.y += 1;
  let j = 0;
  //update captain dialogue for score % 1000 = 0;
  if (score % 1000 === 0 && score !== 0 && j != 1) {
    const captainText = document.querySelector('.character-text');
    captainText.innerHTML = newPhrase();
  }
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

      laserTime = game.time.now + 200;
      let laserBlast = game.sound.add('laserBlast');
      laserBlast.play();
    }
  }
}


// Function deployEnemies adds enemies to the game space

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
  localStorage.setItem('High-Score', newHighscore); //set highscore in local storage
}

//Function takeDamage reduces the players health on collision with an enemy
const healthText = document.querySelector('#health');
function takeDamage(player, enemy, specialEnemy) {
  let playerDeath = game.add.sound('playerDie');
  playerDeath.play();
  const dogImage = document.querySelector('.player-image');
  dogImage.classList.add('saturate');
  setInterval(function() {
    dogImage.classList.remove('saturate');
  }, 100);
  setInterval(function() {
    dogImage.classList.add('saturate');
  }, 200);
  setInterval(function() {
    dogImage.classList.remove('saturate');
  }, 100);
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

//function new phrase returns a random phrase
function newPhrase() {
  const phrases = ['GOOD SHOOTING, PUP!', 'MORE ENEMIES INCOMING!', 'WHOA! KEEP IT UP!', 'THATS A GOOD BOY!'];

  var returnPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  return returnPhrase;
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
  let healthSound = game.add.sound('healthGet');
  healthSound.play();
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
