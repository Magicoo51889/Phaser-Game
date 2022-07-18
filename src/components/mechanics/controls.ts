export default function controls(keys, cursors, player) {

  // I will add these as options in the menu and pause menu so that people can select different sensitivites. 
  let lowSens = 60;
  let normSens = 90;
  let hiSens = 120;
  let angularForceMagnitude = window.innerWidth / normSens;

  // Could implement a sensitivity feature so that people can select what they prefer


  if (keys.A.isDown || cursors.left.isDown){
    console.log("A")
    player.x -= angularForceMagnitude  // subtracts the angular force from the player's x position
  } else if (keys.D.isDown || cursors.right.isDown){
    console.log("D")
    player.x += angularForceMagnitude  // adds the angular force to the player's x position
  }
  if (keys.T.isDown){
    console.log("reset")
    player.x = window.innerWidth / 2  // resets the player's x position to the center of the screen
  }
}
