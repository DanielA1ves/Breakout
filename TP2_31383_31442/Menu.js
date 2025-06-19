export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' });
  }

  create() {
    const { width, height } = this.cameras.main;
    this.add.image(0, 0, 'menu').setOrigin(0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    const title = this.add.text(width / 2, height / 2 - 300, 'BREAKOUT', {
      font: '48px Arial',
      fill: '#ffffff'
    });
    title.setOrigin(0.5);

    const startText = this.add.text(width / 2, height / 2 + 250, 'Clique para começar', {
    font: '24px Arial',
    fill: '#dddddd'
    });
    startText.setOrigin(0.5);


this.tweens.add({
  targets: startText,
  alpha: 0,
  duration: 500,
  ease: 'Linear',
  yoyo: true,
  repeat: -1
});


    this.input.once('pointerdown', () => {
      this.scene.start('Game');
    });
  }
}
