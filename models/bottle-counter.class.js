/**
 * Displays the current amount of collected bottles.
 *
 * @extends DrawableObject
 */
class BottleCounter extends DrawableObject {
  width = 60;
  height = 60;
  currentBottleAmount = 0;

  /**
   * Creates a new BottleCounter.
   */
  constructor() {
    super();
    this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = 140;
    this.y = 48;
  }

  /**
   * Draws the bottle icon and the current bottle amount.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    super.draw(ctx);

    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(this.currentBottleAmount, this.x + 55, this.y + 32);
  }
}
