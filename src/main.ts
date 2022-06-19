import 'phaser';

// game scenes
import Planet_1 from './scenes/PlayScene';

const config:GameConfig = {
    type: Phaser.AUTO,
    parent: 'content',
    width: window.innerWidth, // the width and height is scaled to the window
    height: window.innerHeight,
    resolution: 1, 
    backgroundColor: "#18216D", // this is a dark blue background
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0
            },
            debug: true // this shows bounding boxes around sprites and bodie
        }
    },
    scene: [
      Planet_1
    ]
};

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}
window.onload = () => {
    var game = new Game(config);
};
