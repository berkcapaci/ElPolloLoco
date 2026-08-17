class Bottle extends DrawableObject {
  width = 60;
  height = 60;
  offset = {
    top: 30,
    bottom: 30,
    left: 30,
    right: 30,
  };

  IMAGES_BOTTLE_ON_GROUND = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates a new bottle at the given position.
   *
   * @param {number} x - The horizontal position of the bottle.
   * @param {number} y - The vertical position of the bottle.
   */
  constructor(x, y) {
    super();

    this.loadImage(this.IMAGES_BOTTLE_ON_GROUND[0]);
    this.loadImages(this.IMAGES_BOTTLE_ON_GROUND);

    this.x = x;
    this.y = y;

    this.animate();
  }

  /**
   * Starts the bottle animation.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_ON_GROUND);
    }, 200);
  }
}
