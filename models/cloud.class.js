class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 500;

  /**
   * Creates a new cloud at the given horizontal position.
   *
   * @param {number} x - The horizontal position of the cloud.
   */
  constructor(x) {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = x;
  }

  /**
   * Moves the cloud to the left.
   */
  animate() {
    this.moveLeft();
  }
}
