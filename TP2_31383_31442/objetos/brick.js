export default class Brick extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, textureKey, tintHex = null) {
    super(scene, x, y, textureKey);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setImmovable(true);
    this.setOrigin(0.5);

    if (tintHex) {
      this.setTint(tintHex);
    }
  }
}
