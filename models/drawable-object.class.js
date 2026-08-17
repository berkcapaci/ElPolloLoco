class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  /**
   * Loads an image from the given path.
   *
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the current image on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws the object's collision frame.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {}

  /**
   * Loads multiple images into the image cache.
   *
   * @param {string[]} arr - An array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Plays the next image in an animation sequence.
   *
   * @param {string[]} images - An array of image paths used for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length; //let = i =7 & 6 => 1 , Rest 1
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
