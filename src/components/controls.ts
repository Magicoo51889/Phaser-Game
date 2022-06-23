import { Game, game } from "../main";

export default function controls(keys, cursors, player) {
  // let forceMagnitude = 1;
  let angularForceMagnitude = 8;

  // This might not be needed, but I'm leaving it here for now
  // if (keys.W.isDown || cursors.up.isDown){
  //   player.y += forceMagnitude
  // }

  // if (keys.SPACEBAR.isDown) {  // not yet implemented. But it will be the fire button to shoot. 
  //   player.shoot();
  // }

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
