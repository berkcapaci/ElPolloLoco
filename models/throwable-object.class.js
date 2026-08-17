class ThrowableObject extends MovableObject {
  isBroken = false;
  markedForDeletion = false;
  throwInterval;
  rotationInterval;
  splashInterval;

  IMAGES_ROTATING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates a new throwable bottle.
   *
   * @param {number} x - The horizontal starting position of the bottle.
   * @param {number} y - The vertical starting position of the bottle.
   * @param {boolean} otherDirection - Determines whether the bottle is thrown in the opposite direction.
   * @param {World} world - The current game world.
   */
  constructor(x, y, otherDirection, world) {
    super().loadImage("img/7_statusbars/3_icons/icon_salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATING);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 60;
    this.world = world;
    this.throw();
  }

  /**
   * Checks whether the bottle is above the ground.
   *
   * @returns {boolean} True if the bottle is above the ground.
   */
  isAboveGround() {
    return this.y < 350;
  }

  /**
   * Breaks the bottle and starts the splash animation.
   */
  breakBottle() {
    if (this.isBroken) {
      return;
    }
    this.isBroken = true;
    clearInterval(this.throwInterval);
    clearInterval(this.rotationInterval);
    if (this.world) {
      this.world.soundManager.play("bottleBreak");
    }
    this.currentImage = 0;
    this.splashInterval = setInterval(() => {
      if (this.currentImage < this.IMAGES_SPLASH.length) {
        this.img = this.imageCache[this.IMAGES_SPLASH[this.currentImage]];
        this.currentImage++;
      } else {
        clearInterval(this.splashInterval);
        this.markedForDeletion = true;
      }
    }, 100);
  }

  /**
   * Throws the bottle and starts its movement, gravity, and rotation animation.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();

    this.throwInterval = setInterval(() => {
      if (!this.isAboveGround()) {
        this.breakBottle();
        return;
      }
      this.x += 10;
    }, 25);

    this.rotationInterval = setInterval(() => {
      if (!this.isBroken) {
        this.playAnimation(this.IMAGES_ROTATING);
      }
    }, 100);
  }
}
