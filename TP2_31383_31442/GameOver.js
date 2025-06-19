import global from './global/index.js';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'Gameover' });
  }

  create() {
    const { width, height } = this.cameras.main;

    const g = this.registry.get('global');
    const message = `Game Over\n\nChegaste ao nível ${g.level} com ${g.score} pontos`;

    const text = this.add.text(width / 2, height / 2, message, {
      font: '24px Arial',
      fill: '#ffffff',
      align: 'center'
    });

    text.setOrigin(0.5);

    this.input.once('pointerdown', this.restartGame, this);
  }

  restartGame() {
    this.resetGlobalVariables();
    this.scene.start('Game');
  }

  resetGlobalVariables() {
    this.registry.set('global', JSON.parse(JSON.stringify(global)));
  }
}