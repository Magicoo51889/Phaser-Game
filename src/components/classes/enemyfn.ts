import Phaser from 'phaser';

export default function EnemyFn (x:number, y:number, texture:string, target: Phaser.GameObjects.Components.Transform) {
    this.enemy = this.add.sprite(x, y, texture);

    function set_Target() {
        this.target = target;
    }
    
    function update(t: any, dt: any): void {
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
        update(t, dt);
    }

    set_Target();
}
