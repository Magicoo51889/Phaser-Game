import Phaser from "phaser";
import Entity from './entity'

export default class Enemy extends Entity {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super (scene, 0, 0, texture);
        this.x = x;
        this.y = y;
        this.scene = scene;
    }

    create(scene, texture: string){
        scene.add.sprite(this.x, this.y, texture);
        this.setOrigin(0,0.5);
        this.setScale(0.25);
        console.log("enemy loaded with the texture of: " + texture);

        // moves enemy side to side
        // let tween = this.scene.add.tween(this).to({x: this.x + 100}, 1000, Phaser.Math.Easing.Linear, true, 0, 1000, true);
        // tween.onLoop.add(this.descend, this);
    }

    descend() {
        this.y += 10;
    }
}