import controls from '../components/controls';

export default class Planet_1 extends Phaser.Scene {
	player: Phaser.GameObjects.Sprite;
	cursors: any;
	keys: any;

	playerHealthPoints: number;
	enemyHealthPoints: number

	constructor() {
    super({
			key: 'Planet_1' // this is the unique key of the scene for the main scene manager
		});
	}

	init() {
		this.playerHealthPoints = 100; // this is the player's health in percentage points
		this.enemyHealthPoints = 100; // this is the enemy's health in percentage points
	}
	
	preload() {
		this.load.tilemapTiledJSON('map', '/assets/tilemaps/desert.json'); // this is the tilemap data in JSON format
		this.load.image('Desert', '/assets/tilemaps/tmw_desert_spacing.png'); // this is the tilemap image
		this.load.image('player', '/assets/sprites/SpaceShip.png'); // this is the space ship sprite
	}

	create() {

		// This is the map that came with the boilerplate
		var map:Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: 'map' }); 
		var tileset:Phaser.Tilemaps.Tileset = map.addTilesetImage('Desert');
		var layer:Phaser.Tilemaps.StaticTilemapLayer = map.createStaticLayer(0, tileset, 0, 0);

		this.player = this.add.sprite(100, 100, 'player');
		this.player.setScale(0.25); // this shrinks the player sprite down to 25% of its original size

		this.cursors = this.input.keyboard.createCursorKeys(); // this creates teh cursor keys
    	this.keys = this.input.keyboard.addKeys("W,A,S,D"); // this is where I can assign certain keys to be used in the controls compoenent

		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    	this.cameras.main.startFollow(this.player, false); // this makes the camera follow the player
	}

	update(time: number, delta:number) {
		controls(this.keys, this.cursors, this.player);
	}
}