export default function screenWrap (sprite) { 
    if (sprite.x < 0){
        sprite.x = window.innerWidth;
        console.log("wrapping left")
    }
    else if (sprite.x > window.innerWidth){
        sprite.x = 0;
        console.log("wrapping right")
    }
}
