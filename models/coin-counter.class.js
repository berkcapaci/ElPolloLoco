class CoinCounter extends DrawableObject {
  width = 120;
  height = 120;
  currentCoinAmount = 0;

  constructor() {
    super();
    this.loadImage("img/8_coin/coin_1.png");
    this.x = -5;
    this.y = 20;
  }

  draw(ctx) {
    super.draw(ctx);

    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(this.currentCoinAmount,
        this.x + 95,
        this.y + 60
    );
  }
}
