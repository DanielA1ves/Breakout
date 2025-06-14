import Boot from './Boot.js';
import Game from './Game.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  scene: [Boot, Game]
};

const game = new Phaser.Game(config);
