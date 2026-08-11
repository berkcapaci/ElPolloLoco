class EndbossBar {
  x = 430;
  y = 20;

  iconWidth = 40;
  iconHeight = 40;

  maxEnergy = 100;
  currentEnergy = 100;
  heartAmount = 10;

  img = new Image();

  constructor() {
    this.img.src = "img/7_statusbars/3_icons/icon_health_endboss.png";
  }

draw(ctx) {
        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.iconWidth,
            this.iconHeight
        );

        for (let i = 0; i < this.heartAmount; i++) {
            let heartX = this.x + 50 + i * 24;

            ctx.font = "24px Arial";

            ctx.fillStyle =
                i < this.currentEnergy / 10
                    ? "red"
                    : "gray";

            ctx.fillText("♥", heartX, this.y + 30);
        }
    }

    setEnergy(energy) {
        this.currentEnergy = energy;
    }
}
