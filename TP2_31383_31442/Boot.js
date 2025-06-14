import config from './config.js';
import global from './global/index.js';

export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
    this.fontsReady = false;
  }

  preload() {
    if (config.webfonts && config.webfonts.length) {
      window.WebFont.load({
      google: {
        families: config.webfonts
      },
        active: () => {
        this.fontsReady = true;
      }
    });
    }

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'loading fonts', {
      font: '16px Arial',
      fill: '#dddddd',
      align: 'center'
    }).setOrigin(0.5);

    this.load.image('loaderBg', './assets/images/loader-bg.png');
    this.load.image('loaderBar', './assets/images/loader-bar.png');
  }

  create() {
    this.game.global = JSON.parse(JSON.stringify(global));
  }

  update() {
    if (!config.webfonts || config.webfonts.length === 0 || this.fontsReady) {
      this.scene.start('Game');
    }
  }
}
