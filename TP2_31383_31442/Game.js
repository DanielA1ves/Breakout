import global from './global/index.js';
import Brick from './objetos/brick.js';
import Plataforma from './objetos/plataforma.js';
import Ball from './objetos/bola.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game', physics: { arcade: {} } });
  }

  create() {
    this.global = this.registry.get('global');

    const width = this.cameras.main.width;

    this.scoreText = this.createText(20, 10, `Score: ${this.global.score}`, 'left');
    this.livesText = this.createText(width / 2, 10, `Lives: ${this.global.lives}`, 'center');
    this.levelText = this.createText(width - 20, 10, `Level: ${this.global.level}`, 'right');

    this.bricks = this.physics.add.staticGroup();
    this.generateBricks(this.bricks);

    this.setUpPaddle();
    this.setUpBall();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.on('pointerdown', this.releaseBall, this);

    this.physics.add.collider(this.ball, this.paddle, this.ballHitPaddle, null, this);
    this.physics.add.collider(this.ball, this.bricks, this.ballHitBrick, null, this);
    this.physics.world.checkCollision.down = false;
  }

  releaseBall() {
  if (!this.ballOnPaddle) return;

    this.ballOnPaddle = false;
    this.ball.setVelocity(0, -400);
  }


  createText(x, y, text, align = 'left') {
    const txt = this.add.text(x, y, text, {
      font: '16px Arial',
      fill: '#ffffff'
    });

    if (align === 'center') txt.setOrigin(0.5, 0);
    else if (align === 'right') txt.setOrigin(1, 0);
    else txt.setOrigin(0, 0);

    return txt;
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
    this.ball.setScale(0.07);
    this.putBallOnPaddle();
  }


  putBallOnPaddle() {
    this.ballOnPaddle = true;

    this.ball.setVelocity(0);
    this.ball.setPosition(
    this.paddle.x,
    this.paddle.y - this.paddle.displayHeight / 2 - this.ball.displayHeight / 2
  );
  }


  generateBricks(group) {
  const rows = 5;
  const columns = 10;
  const brickSpacingY = 80;
  const topMargin = 80;
  const scale = 0.22;

  const tempBrick = this.add.image(0, 0, 'brick_vermelho').setScale(scale);
  const brickWidth = tempBrick.displayWidth;
  tempBrick.destroy();

  const brickSpacingX = brickWidth + 70;
  const totalWidth = (columns - 1) * brickSpacingX;
  const startX = this.cameras.main.centerX - totalWidth / 2;

  const brickTextures = [
    'brick_vermelho',
    'brick_laranja',
    'brick_amarelo',
    'brick_verde',
    'brick_roxo',
  ];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const brickX = startX + x * brickSpacingX;
      const brickY = topMargin + y * brickSpacingY;

      const textureKey = brickTextures[y % brickTextures.length];
      const newBrick = new Brick(this, brickX, brickY, textureKey);
      newBrick.setScale(scale);
      newBrick.refreshBody();
      group.add(newBrick);
    }
  }
}

  update() {
    this.paddle.update(this.cursors);

    if (this.ballOnPaddle) {
      this.ball.setX(this.paddle.x);
    }

    if (!this.ballOnPaddle && this.ball.y > this.cameras.main.height) {
      this.ballLost();
    }

    this.physics.add.collider(
    this.ball,
    this.paddle,
    this.ballHitPaddle,
    null,
    this
  );

  this.physics.add.collider(
    this.ball,
    this.bricks,
    this.ballHitBrick,
    null,
    this
  );

}

ballHitPaddle(ball, paddle) {
  let diff = 0;

    if (ball.x < paddle.x) {
      diff = paddle.x - ball.x;
      ball.setVelocityX(-10 * diff);
    } else if (ball.x > paddle.x) {
      diff = ball.x - paddle.x;
      ball.setVelocityX(10 * diff);
    } else {
      ball.setVelocityX(2 + Math.random() * 8);
    }
  }

  ballHitBrick(ball, brick) {
  brick.disableBody(true, true);

  this.global.score += 10;
  this.registry.set('global', this.global);
  this.scoreText.setText(`Score: ${this.global.score}`);

  const remaining = this.bricks.getChildren().filter(b => b.active).length;
  if (remaining > 0) return;

  this.global.level += 1;
  this.levelText.setText(`Level: ${this.global.level}`);
  this.registry.set('global', this.global);

  if (this.global.level === 2) {
    this.paddle.setScale(0.15);
    this.paddle.refreshBody();
  }

  this.putBallOnPaddle();
  this.generateBricks(this.bricks);
}

  ballLost() {
  this.global.lives -= 1;
  this.livesText.setText(`Lives: ${this.global.lives}`);
  this.registry.set('global', this.global);

  if (this.global.lives === 0) {
    this.endGame();
    return;
  }

  this.ball.setVelocity(0);
  this.putBallOnPaddle();
}

  endGame() {
    this.scene.start('Gameover');
  }

}