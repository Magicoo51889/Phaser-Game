import Phaser from 'phaser'

// This code checks to see if a body is able to use the setVelocity feature in Phaser
export default function isBodyVel(body:any){
    if (body instanceof Phaser.Physics.Arcade.Sprite){
        body.setVelocity(0, 0);
    }
}