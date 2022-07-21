import 'phaser';

// game scenes
import Planet_1 from './scenes/playScene';

const config:GameConfig = {
    type: Phaser.AUTO,
    parent: 'game',
    width: window.innerWidth, // the width and height is scaled to the window
    height: window.innerHeight,
    resolution: 1, 
    backgroundColor: "#fcfff2", // this is a cream background
    physics: {
        default: 'arcade',
        arcade: {
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

export const game: Phaser.Game = new Phaser.Game(config);
