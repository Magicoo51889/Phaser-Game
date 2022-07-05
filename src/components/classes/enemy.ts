import Phaser from "phaser";

export default class Enemy extends Phaser.GameObjects.Sprite {
    scene: Phaser.Scene;
    private target?: Phaser.GameObjects.Components.Transform;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, health: number) {
        super(scene, 0, 0, texture, health);
        this.x = x
        this.y = y
    }

    create(texture: string) {
        this.scene.add.image(this.x, this.y, texture);
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
        const tx = target.x
        const ty = target.y
        const x = this.x
        const y = this.y
        const rotation = Phaser.Math.Angle.Between(x, y, tx, ty)
        this.setRotation(rotation)
        console.log("rotating to " + rotation);
    }
}