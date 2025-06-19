import global from './global/index.js';

export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'loading...', {
      font: '16px Arial',
      fill: '#dddddd',
      align: 'center'
    }).setOrigin(0.5);

    this.load.image('brick_amarelo', './imagens/brick_amarelo.png');
    this.load.image('brick_laranja', './imagens/brick_laranja.png');
    this.load.image('brick_roxo', './imagens/brick_roxo.png');
    this.load.image('brick_verde', './imagens/brick_verde.png');
    this.load.image('brick_vermelho', './imagens/brick_vermelho.png');
    this.load.image('plataforma', './imagens/plataforma.png');
    this.load.image('bola', './imagens/bola.png');
    this.load.image('menu', './imagens/Menu.png');
  }

  create() {
    this.registry.set('global', JSON.parse(JSON.stringify(global)));
    this.scene.start('Menu');
  }
}
