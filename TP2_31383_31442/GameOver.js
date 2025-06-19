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
      font: '40px Arial',
      fill: '#ffffff',
      align: 'center'
    });
    text.setOrigin(0.5);

    const restartInfo = this.add.text(width / 2, height / 2 + 100, '\n\n\nClique no ecrã para jogar outra vez', {
      font: '18px Arial',
      fill: '#aaaaaa',
      align: 'center'
    });
    restartInfo.setOrigin(0.5);

    this.tweens.add({
    targets: restartInfo,
    alpha: 0,
    duration: 500,
    ease: 'Linear',
    yoyo: true,
    repeat: -1
  });


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
