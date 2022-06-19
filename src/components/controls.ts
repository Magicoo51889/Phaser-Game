export default function controls(keys, cursors, body) {
  let forceMagnitude = 0.001;
  let angularForceMagnitude = 0.05;

  if (keys.W.isDown || cursors.up.isDown){
    console.log(body)
    this.body.setVelocity(forceMagnitude);

  }

  if (keys.A.isDown || cursors.left.isDown){
    this.body.setAngularVelocity(-angularForceMagnitude);
  } else if (keys.D.isDown || cursors.right.isDown){
    this.body.setAngularVelocity(angularForceMagnitude);
  }
}
