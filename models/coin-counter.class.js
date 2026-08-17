/**
 * Displays the player's collected coin amount.
 *
 * @extends DrawableObject
 */
class CoinCounter extends DrawableObject {
  width = 120;
  height = 120;
  currentCoinAmount = 0;

  /**
   * Creates a new coin counter.
   */
  constructor() {
    super();
    this.loadImage("img/8_coin/coin_1.png");
    this.x = -5;
    this.y = 20;
  }

  /**
   * Draws the coin icon and the current coin amount.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    super.draw(ctx);

    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    ctx.fillText(this.currentCoinAmount, this.x + 95, this.y + 60);
  }
}
