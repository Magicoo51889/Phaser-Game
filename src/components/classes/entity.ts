import Phaser from 'phaser';

export default class Entity extends Phaser.GameObjects.Sprite{
    scene:Phaser.Scene;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:string){
        super(scene, x, y, texture);
        this.scene = scene;
    }
}