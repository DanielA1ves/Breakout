import global from './global/index.js';
import Brick from './objetos/brick.js';
import Plataforma from './objetos/plataforma.js';
import Paddle from './objetos/plataforma.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game', physics: { arcade: {} } });
  }

  create() {
    this.game.global = global;

    const width = this.cameras.main.width;

    this.createText(20, 10, `Score: ${this.game.global.score}`, 'left');
    this.createText(width / 2, 10, `Lives: ${this.game.global.lives}`, 'center');
    this.createText(width - 20, 10, `Level: ${this.game.global.level}`, 'right');

    this.bricks = this.physics.add.staticGroup();
    this.generateBricks(this.bricks);

    this.setUpPaddle();
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.paddle.update(this.cursors);
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

  setUpPaddle() {
    this.paddle = new Plataforma(
      this,
      this.cameras.main.centerX,
      this.cameras.main.height - 100
    );
  }

  setUpBall() {
    const startX = this.cameras.main.centerX;
    const startY = this.cameras.main.height - 130;

    this.ball = new Ball(this, startX, startY);
    this.ball.setVelocity(150, -150);
  }

  generateBricks(group) {
    const rows = 5;
    const columns = 12;
    const xOffset = 1;
    const topMargin = 80;
    const brickSpacingX = -125;
    const brickSpacingY = 85;
    const brickTextures = [
      'brick_vermelho',
      'brick_laranja',
      'brick_amarelo',
      'brick_verde',
      'brick_roxo',
    ];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const brickX = xOffset + x * brickSpacingX;
        const brickY = topMargin + y * brickSpacingY;

        const textureKey = brickTextures[y % brickTextures.length];
        const newBrick = new Brick(this, brickX, brickY, textureKey);
        newBrick.setScale(0.22);
        group.add(newBrick);
      }
    }

    const totalWidth = columns * brickSpacingX;
  group.children.iterate(child => {
    child.x += (this.cameras.main.width / 2 - totalWidth / 2);
  });
  }
}
