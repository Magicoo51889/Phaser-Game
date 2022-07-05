import Phaser from "phaser";

export default class Enemy extends Phaser.GameObjects.Sprite {
    scene: Phaser.Scene;
    target?: Phaser.GameObjects.Components.Transform;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, health: number) {
        super(scene, 0, 0, texture, health);
        this.x = x
        this.y = y
    }

    create(texture: string) {
        this.scene.add.sprite(this.x, this.y, texture);
        this.setOrigin(0,0.5)
        this.setScale(0.25);
        console.log("enemy loaded with the texture of: " + texture);
    }

    update(target:Phaser.GameObjects.Components.Transform) {
        console.log("finding target");

        // points towards the player
        if (!target){
            console.log("no target");
            return
        }
        
        console.log("target found");
        var angle = Phaser.Math.DEG_TO_RAD * Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y)
        this.setAngle(angle)
        console.log("rotating to " + angle);
    }
}