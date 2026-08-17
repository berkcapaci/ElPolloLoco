/** * Represents the playable Pepe character. */
class Character extends MovableObject {
  height = 200;
  y = 120;
  speed = 10;
  otherDirection = false;
  deathImageIndex = 0;
  deathAnimationFinished = false;
  deathX = 0;
  deathY = 0;
  world;
  collectedCoins = 0;
  collectedBottles = 0;
  isFrozen = false;
  deathSoundPlayed = false;
  idleTime = 0;
  idleThreshold = 15000;
  isSnoring = false;
  isJumping = false;

  offset = {
    top: 50,
    bottom: 20,
    left: 20,
    right: 20,
  };

  /** * Idle animation images. */
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /** * Long idle animation images. */
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /** * Walking animation images. */
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  /** * Jumping animation images. */
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  /** * Death animation images. */
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
  ];

  /** * Hurt animation images. */
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  /** * Creates a new Character instance. */
  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  /** * Starts the character movement and animation intervals. */
  animate() {
    setInterval(() => {
      if (this.isDead() || this.isFrozen || this.world?.isStopped) {
        return;
      }
      this.handleMovement();
      this.handleJump();
      this.checkChickenStomp();
      this.updateIdleTime();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      this.updateAnimation();
    }, 100);
  }

  /** * Handles horizontal character movement. */
  handleMovement() {
    if (this.canMoveRight()) {
      this.moveRight();
      this.otherDirection = false;
      this.resetIdleTime();
    }

    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      this.resetIdleTime();
    }
  }

  /** * Checks whether Pepe can move to the right. */
  canMoveRight() {
    return (
      this.world.keyboard.RIGHT &&
      this.x < this.world.level.level_end_x &&
      !this.world.isEndbossBlocking()
    );
  }

  /** * Handles the character jump input. */
  handleJump() {
    if (!this.world.keyboard.SPACE || this.isAboveGround()) {
      return;
    }
    this.jump();
    this.world.soundManager.play("jump");
    this.resetIdleTime();
  }

  /** * Updates the idle timer based on player activity. */
  updateIdleTime() {
    const keyboard = this.world.keyboard;
    const isMoving =
      keyboard.RIGHT || keyboard.LEFT || keyboard.SPACE || keyboard.D;

    if (isMoving || this.isAboveGround() || this.isHurt()) {
      this.resetIdleTime();
      return;
    }

    this.idleTime += 1000 / 60;
  }

  /** * Resets the idle timer and stops snoring if necessary. */
  resetIdleTime() {
    this.idleTime = 0;

    if (!this.isSnoring) {
      return;
    }

    this.world.soundManager.stop("pepeSnore");
    this.isSnoring = false;
  }

  /** * Selects the correct character animation based on the current state. */
  updateAnimation() {
    if (this.isDead()) {
      this.playDeathAnimation();
      return;
    }

    if (this.isFrozen) {
      return;
    }

    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      return;
    }

    if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
      return;
    }

    if (this.isJumping) {
      this.setFirstJumpImage();
      return;
    }

    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
      return;
    }

    this.playIdleAnimation();
  }

  /** * Sets the first jump image after landing. */
  setFirstJumpImage() {
    this.isJumping = false;
    const firstJumpImage = this.IMAGES_JUMPING[0];
    this.img = this.imageCache[firstJumpImage];
  }

  /** * Plays the appropriate idle animation and starts snoring after a long idle period. */
  playIdleAnimation() {
    if (this.idleTime >= this.idleThreshold) {
      this.playAnimation(this.IMAGES_LONG_IDLE);

      if (!this.isSnoring) {
        this.world.soundManager.play("pepeSnore");
        this.isSnoring = true;
      }

      return;
    }

    this.playAnimation(this.IMAGES_IDLE);
  }

  /** * Plays the character death animation frame by frame. */
  playDeathAnimation() {
    if (this.deathAnimationFinished) {
      return;
    }

    const path = this.IMAGES_DEAD[this.deathImageIndex];
    this.img = this.imageCache[path];

    if (this.deathImageIndex < this.IMAGES_DEAD.length - 1) {
      this.deathImageIndex++;
      return;
    }

    this.deathAnimationFinished = true;
    this.deathImage = this.img;
  }

  /** * Stores the character position when death occurs. */
  die() {
    this.deathX = this.x;
    this.deathY = this.y;
  }

  /** * Moves the character to the left unless frozen. */
  moveLeft() {
    if (!this.isFrozen) {
      super.moveLeft();
    }
  }

  /** * Moves the character to the right unless frozen. */
  moveRight() {
    if (!this.isFrozen) {
      super.moveRight();
    }
  }

  /** * Checks whether the character lands on an enemy from above. */
  checkChickenStomp() {
    if (!this.isAboveGround() || this.speedY >= 0) {
      return;
    }

    this.world.level.enemies.forEach((enemy) => {
      if (this.isStompableEnemy(enemy) && this.isLandingOnEnemy(enemy)) {
        enemy.hit();
        this.speedY = 20;
      }
    });
  }

  /** * Checks whether an enemy can be stomped by the character. */
  isStompableEnemy(enemy) {
    return (
      (enemy instanceof Chicken || enemy instanceof SmallChicken) &&
      !enemy.isChickenDead
    );
  }

  /** * Checks whether Pepe is landing on an enemy. */
  isLandingOnEnemy(enemy) {
    const characterBottom = this.y + this.height;
    const characterLeft = this.x + 30;
    const characterRight = characterLeft + this.width - 60;
    const enemyTop = enemy.y;
    const enemyLeft = enemy.x;
    const enemyRight = enemy.x + enemy.width;

    const isHorizontallyOverlapping =
      characterRight > enemyLeft && characterLeft < enemyRight;

    return (
      isHorizontallyOverlapping &&
      characterBottom >= enemyTop &&
      characterBottom <= enemyTop + 30
    );
  }

  /** * Applies damage to the character and handles the death state. */
  hit(damage) {
    if (this.isDead()) {
      return;
    }

    super.hit(damage);
    this.resetIdleTime();

    if (this.energy > 0) {
      this.world.soundManager.play("pepeHurt");
      return;
    }

    if (!this.deathSoundPlayed) {
      this.world.soundManager.play("pepeDeath");
      this.deathSoundPlayed = true;
    }
  }

  /** * Makes the character jump. */
  jump() {
    this.speedY = 30;
    this.isJumping = true;
    this.currentImage = 0;
    const firstJumpImage = this.IMAGES_JUMPING[0];
    this.img = this.imageCache[firstJumpImage];
  }
}