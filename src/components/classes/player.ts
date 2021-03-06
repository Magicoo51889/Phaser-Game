import Phaser from 'phaser';
import Entity from './entity';

export default class Player extends Entity{
    scene:Phaser.Scene;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:string){
        super(scene, x, y, texture);
        this.x = x;
        this.y = y;
        this.scene = scene;
    }

    create(texture){ // this is the method that is called so the player is created properly 
        this.setScale(0.25);
        this.setOrigin(0,0.5);
        console.log("Player texture loaded as: " + texture);
		
    }
}