import Phaser from 'phaser';
import Entity from './entity'

let lasers;
let timedEvent;
export default class Enemy extends Entity{
    scene:Phaser.Scene;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:string){
        super(scene, x, y, texture);
        this.x = x;
        this.y = y;
        this.scene = scene;
    }

    create(texture){ // this is the method that is called so the enemy is created properly
        this.setScale(0.5);
        this.setOrigin(0,0.5);
        console.log("Enemy texture loaded as: " + texture);

        //moves enemy side to side
    }

    descend() {
        this.y += 10;
    }

    // creates lasers for the enemy

    // lasers(lasers_texture:string){
    //     lasers = this.scene.add.group();
	// 	lasers.enableBody = true;
	// 	lasers.createMultiple(10, enemy_lasers_texture);
    // }
    update(timestamp: any, delta: any): void {
        const LEFT:number = 0;
        const RIGHT:number = window.innerWidth;
        
        this.setVelocity(0, 100);
    }
}