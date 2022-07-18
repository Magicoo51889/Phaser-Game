import Phaser from 'phaser';
import Entity from './entity'

let lasers;
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
        //let tween = this.scene.add.tween(this).to({x: this.x + 100}, 1000, Phaser.Math.Easing.Linear, true, 0, 1000, true);
        //tween.onLoop.add(this.descend, this);
    }

    descend() {
        this.y += 10;
    }

    lasers(lasers_texture:string){
        lasers = this.scene.add.group();
		lasers.enableBody = true;
		lasers.createMultiple(10, lasers_texture);
    }
}