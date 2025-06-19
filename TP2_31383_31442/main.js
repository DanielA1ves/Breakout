import Boot from './Boot.js';
import Game from './Game.js';
import GameOver from './GameOver.js';
import Menu from './Menu.js';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#000000',
  scene: [Boot, Menu, Game, GameOver]
};



const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});