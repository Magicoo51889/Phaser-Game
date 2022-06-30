import { ENEMY_CATAGORY, PLAYER_CATEGORY, PLAYER_LASERS_CATEGORY } from "../../scenes/PlayScene"; // this is the unique key of the objects for collisions
import Phaser from "phaser";

export default class Enemy extends Phaser.GameObjects.Sprite {
    private target?: Phaser.GameObjects.Components.Transform;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, 0, 0, texture);
    }

    set_Target(target: Phaser.GameObjects.Components.Transform) {
        this.target = target;
    }

    update(t: any, dt: any): void {
        // points towards the player
        if (!this.target){
            return
        }
    
        const tx = this.target.x
        const ty = this.target.y
        const x = this.x
        const y = this.y
        const rotation = Phaser.Math.Angle.Between(x, y, tx, ty)
        this.setRotation(rotation)
    }
}