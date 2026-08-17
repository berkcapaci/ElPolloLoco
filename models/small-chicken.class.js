class SmallChicken extends MovableObject {
  y = 380;
  height = 45;
  width = 45;
  energy = 0;

  isChickenDead = false;
  deathTime = 0;
  isFrozen = false;

  collisionOffsetX = 0;
  collisionOffsetY = 0;
  collisionWidth = 45;
  collisionHeight = 45;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  /**
   * Creates a new small chicken at the given horizontal position.
   *
   * @param {number} x - The horizontal position of the small chicken.
   */
  constructor(x) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    this.x = x;
    this.speed = 2.5;

    this.animate();
  }

  /**
   * Kills the small chicken and switches to its death image.
   */
  hit() {
    this.energy = 0;
    this.isChickenDead = true;
    this.deathTime = new Date().getTime();

    if (this.world) {
      this.world.soundManager.play("chickenDeath");
    }

    this.loadImage(this.IMAGE_DEAD);
  }

  /**
   * Starts the small chicken movement and walking animation.
   */
  animate() {
    setInterval(() => {
      if (this.isFrozen || this.isChickenDead) {
        return;
      }

      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (this.isFrozen || this.isChickenDead) {
        return;
      }

      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

  /**
   * Checks whether the small chicken is colliding with a thrown bottle.
   *
   * @param {ThrowableObject} bottle - The bottle to check against.
   * @returns {boolean} True if the small chicken is colliding with the bottle.
   */
  isCollidingWithBottle(bottle) {
    return (
      bottle.x + bottle.width > this.x + this.collisionOffsetX &&
      bottle.x < this.x + this.collisionOffsetX + this.collisionWidth &&
      bottle.y + bottle.height > this.y + this.collisionOffsetY &&
      bottle.y < this.y + this.collisionOffsetY + this.collisionHeight
    );
  }
}
