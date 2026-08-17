/**
 * Displays the current health of the endboss.
 *
 * @extends DrawableObject
 */
class EndbossBar extends DrawableObject {
  x = 500;
  y = 10;
  width = 200;
  height = 60;

  maxEnergy = 400;
  currentEnergy = 400;

  /**
   * Images used for the different endboss energy levels.
   *
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  /**
   * Creates a new EndbossBar.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setEnergy(this.maxEnergy);
  }

  /**
   * Sets the current endboss energy and updates the displayed image.
   *
   * @param {number} energy - The current endboss energy.
   */
  setEnergy(energy) {
    this.currentEnergy = Math.max(0, Math.min(energy, this.maxEnergy));

    const path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the image index based on the current energy percentage.
   *
   * @returns {number} The index of the corresponding energy image.
   */
  resolveImageIndex() {
    const percentage = (this.currentEnergy / this.maxEnergy) * 100;

    if (percentage >= 100) {
      return 5;
    }

    if (percentage >= 80) {
      return 4;
    }

    if (percentage >= 60) {
      return 3;
    }

    if (percentage >= 40) {
      return 2;
    }

    if (percentage >= 20) {
      return 1;
    }

    return 0;
  }

  /**
   * Draws the endboss health bar on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}