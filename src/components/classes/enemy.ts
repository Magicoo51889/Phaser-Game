import { ENEMY_CATAGORY, PLAYER_CATEGORY, PLAYER_LASERS_CATEGORY } from "../../scenes/PlayScene"; // this is the unique key of the objects for collisions
import Phaser from "phaser";

export default class Enemy extends Phaser.GameObjects.Sprite {
    private target?: Phaser.GameObjects.Components.Transform;
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, health: number) {
        super(scene, 0, 0, texture);
        this.scene = scene;
    }

    create(texture: string) {
        this.scene.add.image(0, 0, texture);
        console.log("enemy created");

    }

    set_Target(target: Phaser.GameObjects.Components.Transform) {
        this.target = target;
        console.log("finding target");
    }

    update() {
        // points towards the player
        if (!this.target){
            console.log("no target");
            return
        }
        
        console.log("target found");
        const tx = this.target.x
        const ty = this.target.y
        const x = this.x
        const y = this.y
        const rotation = Phaser.Math.Angle.Between(x, y, tx, ty)
        this.setRotation(rotation)
        console.log("rotating to " + rotation);
    }
}