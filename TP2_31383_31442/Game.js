import global from './global/index.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  create() {
    this.game.global = global;

    this.createText(10, 10, `Score: ${this.game.global.score}`);
    this.createText(650, 10, `Level: ${this.game.global.level}`, 'right');
    this.createText(400, 10, `Lives: ${this.game.global.lives}`, 'center');
  }

  createText(x, y, text, align = 'left') {
    const txt = this.add.text(x, y, text, {
      font: '16px Arial',
      fill: '#ffffff'
    });

    if (align === 'center') txt.setOrigin(0.5, 0);
    else if (align === 'right') txt.setOrigin(1, 0);
    else txt.setOrigin(0, 0);
  }
}
