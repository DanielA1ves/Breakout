export default class Plataforma extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'plataforma');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setImmovable(true);
    this.setOrigin(0.5, 0.5);
    this.setScale(0.25);
  }

  update() {

  if (this.scene.input.activePointer.x === 0) return;

  this.x = this.scene.input.activePointer.x;

  if (this.x < this.displayWidth / 2) {
    this.x = this.displayWidth / 2;
    return;
  }

  const maxRight = this.scene.scale.width - this.displayWidth / 2;
  if (this.x > maxRight) {
    this.x = maxRight;
    return;
  }
  }


}
