export default function screenWrap (sprite, scene) {
    if (sprite.x <= 0){
        sprite.x = scene.width;
        console.log("wrapping left")
    }
    else if (sprite.x >= scene.width){
        sprite.x = 0;
        console.log("wrapping right")
    }
}
