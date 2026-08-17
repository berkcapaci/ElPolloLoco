class Chicken extends MovableObject {
  y = 365;
  height = 60;
  width = 60;
  energy = 0;
  isChickenDead = false;
  deathTime = 0;
  isFrozen = false;
  collisionOffsetX = 0;
  collisionOffsetY = 0;
  collisionWidth = 60;
  collisionHeight = 60;
  attackOffsetX = 10;
  attackOffsetY = 5;
  attackWidth = 40;
  attackHeight = 50;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  /**
   * Creates a new chicken at the given horizontal position.
   *
   * @param {number} x - The horizontal position of the chicken.
   */
  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);

    this.x = x;
    this.speed = 0.15 + Math.random() * 0.5;

    this.animate();
  }

  /**
   * Kills the chicken and switches to its death image.
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
   * Starts the chicken movement and walking animation.
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
   * Checks whether the character is within the chicken's attack range.
   *
   * @param {Character} character - The character to check against.
   * @returns {boolean} True if the character is inside the attack range.
   */
  isCharacterInAttackRange(character) {
    const attackLeft = this.x + this.attackOffsetX;
    const attackRight = attackLeft + this.attackWidth;
    const attackTop = this.y + this.attackOffsetY;
    const attackBottom = attackTop + this.attackHeight;

    const characterLeft = character.x + character.offset.left;
    const characterRight =
      character.x + character.width - character.offset.right;
    const characterTop = character.y + character.offset.top;
    const characterBottom =
      character.y + character.height - character.offset.bottom;

    return (
      characterRight > attackLeft &&
      characterLeft < attackRight &&
      characterBottom > attackTop &&
      characterTop < attackBottom
    );
  }

  /**
   * Checks whether the chicken is colliding with a thrown bottle.
   *
   * @param {ThrowableObject} bottle - The bottle to check against.
   * @returns {boolean} True if the chicken is colliding with the bottle.
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
