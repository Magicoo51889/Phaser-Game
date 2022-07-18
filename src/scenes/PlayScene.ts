import controls from '../components/mechanics/controls';
import screenWrap from '../components/mechanics/screenWrap';
import Enemy from '../components/classes/enemy';
import Player from '../components/classes/player';

let lasers;
export default class Planet_1 extends Phaser.Scene {
	player: any;
	cursors: any;
	keys: any;
	enemy1: any;
	lasers: any;

	public playerHealthPoints: number;
	public enemyHealthPoints: number;
	public enemiesRemaining: number;

	constructor() {
    	super({key: 'Planet_1'}); // this is the unique key of the scene for the main scene manager
	}

	init() {
		this.playerHealthPoints = 100; // this is the player's health in percentage points
		this.enemyHealthPoints = 100; // this is the enemy's health in percentage points
		this.enemiesRemaining = 3; // this is the number of enemies remaining in the level
	}
	
	preload() {
		this.load.image('background', './assets/sprites/Sky.png'); // this is the background image
		this.load.image('player', './assets/sprites/SpaceShip.png'); // this is the space ship sprite
		this.load.image('enemy', './assets/sprites/Enemy.png'); // this is the enemy sprite
		this.load.image('laser', './assets/Laser.png'); // this is the laser image
	}

	create() {
		// Note that the background must be the first thing to be added in create() as otherwise it will be infront of the other sprites
		var background = this.add.image(0, 0, 'background');
		background.setScale((window.innerWidth/ background.width)*2, (window.innerHeight/ background.height)*2);

		// load player class and create player
		this.player = new Player(this, window.innerWidth / 2, (window.innerHeight / 4) * 3, 'player')
		this.player.create('player');
		
		// load enemy class and create enemy
		this.enemy1 = new Enemy(this, window.innerWidth / 2, (window.innerHeight / 4), 'enemy');
		this.enemy1.create('enemy');

		console.log("x: " + this.enemy1.x);
		console.log("y: " + this.enemy1.y);

		this.cursors = this.input.keyboard.createCursorKeys(); // this creates the cursor keys
    	this.keys = this.input.keyboard.addKeys("W,A,S,D,T"); // this is where I can assign certain keys to be used in the controls component
		this.cameras.main.setBounds(0, 0, window.innerWidth, window.innerHeight); // this sets the bounds of the camera

		// creating lasers
		this.enemy1.lasers('lasers');

	}

	update(time: number, delta:number) { // time is time, delta is the time from the last frame
		controls(this.keys, this.cursors, this.player);
		screenWrap(this.player);
		
	}
}

// Useful links:
// - https://github.com/photonstorm/phaser-examples/blob/master/examples/games/invaders.js