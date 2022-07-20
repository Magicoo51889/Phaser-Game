let bullets
let bulletTime = 0;

export default function controls(keys, cursors, player) {

  // I will add these as options in the menu and pause menu so that people can select different sensitivites. 
  let lowSens = 120;
  let normSens = 90;
  let hiSens = 60;
  let angularForceMagnitude = window.innerWidth / normSens;

  // Could implement a sensitivity feature so that people can select what they prefer


  if (keys.A.isDown || cursors.left.isDown){
    console.log("A")
    player.x -= angularForceMagnitude  // subtracts the angular force from the player's x position
  } else if (keys.D.isDown || cursors.right.isDown){
    console.log("D")
    player.x += angularForceMagnitude  // adds the angular force to the player's x position
  } else if (keys.W.isDown || cursors.up.isDown){
    //fireBullet();
    console.log("Shooting")
}

// function fireBullet() {
//   if (this.scene.time.now > bulletTime){
//     laser = bullets.getFirstExists(false);
  

//     if (laser){
//       laser.reset(player.x, player.y + 8);
//       laser.setVelocityY(-300);
//       bulletTime = this.scene.time.now + 200;
//     }
//   }
// }

// function resetBullet(laser) {
//   laser.kill();
}