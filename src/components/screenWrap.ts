export default function screenWrap (sprite, scene) { // when it goes to one edge it gets stuck as it is called every frame, so is always set at an edge. 
    if (sprite.x <= 0){
        sprite.x = scene.width;
        console.log("wrapping left")
    }
    else if (sprite.x >= scene.width){
        sprite.x = 0;
        console.log("wrapping right")
    }
}
