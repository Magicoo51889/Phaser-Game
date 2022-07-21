import Phaser from 'phaser';

export default class Entity extends Phaser.GameObjects.Sprite{
    constructor(scene, x:number, y:number, texture:string){
        super(scene, x, y, texture);
        scene.add.existing(this); // this adds the class that's extended to the scene
    }
} 