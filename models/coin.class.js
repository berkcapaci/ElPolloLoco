class Coin extends DrawableObject {
  width = 100;
  height = 100;
  offset = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  };

  IMAGES_ROTATING_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * Creates a new coin at the given position.
   *
   * @param {number} x - The horizontal position of the coin.
   * @param {number} y - The vertical position of the coin.
   */
  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES_ROTATING_COIN[0]);
    this.loadImages(this.IMAGES_ROTATING_COIN);
    this.x = x;
    this.y = y;
    this.animate();
  }

  /**
   * Starts the rotating coin animation.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATING_COIN);
    }, 300);
  }
}
