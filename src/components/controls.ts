export default function controls(keys, cursors, player) {
  let angularForceMagnitude = 8;

  if (keys.A.isDown || cursors.left.isDown){
    console.log("A")
    player.x -= angularForceMagnitude
  } else if (keys.D.isDown || cursors.right.isDown){
    console.log("D")
    player.x += angularForceMagnitude
  }
  if (keys.T.isDown){
    console.log("reset")
    player.x = window.innerWidth / 2
  }
}
