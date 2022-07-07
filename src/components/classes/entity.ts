import Phaser from 'phaser';

export default class Entity extends Phaser.Physics.Matter.MatterSprite{
    constructor(scene, x:number, y:number, texture:string){
        super(scene.physics.world, x, y, texture);
        scene.add.existing(this);
    }
}