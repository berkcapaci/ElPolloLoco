class EndbossBar extends DrawableObject {
  x = 430;
  y = 20;
  width = 200;
  height = 50;

  maxEnergy = 100;
  currentEnergy = 100;

  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  constructor() {
    super();

    this.loadImages(this.IMAGES);
    this.setEnergy(100);
  }

  setEnergy(energy) {
    this.currentEnergy = energy;

    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.currentEnergy >= 100) {
      return 5;
    }

    if (this.currentEnergy >= 80) {
      return 4;
    }

    if (this.currentEnergy >= 60) {
      return 3;
    }

    if (this.currentEnergy >= 40) {
      return 2;
    }

    if (this.currentEnergy >= 20) {
      return 1;
    }

    return 0;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
