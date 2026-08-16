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
  canPlayJumpSound = true;
  deathSoundPlayed = false;
  idleTime = 0;
  idleThreshold = 15000;
  isSnoring = false;

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

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

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

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

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

  handleMovement() {
    if (
      this.world.keyboard.RIGHT &&
      this.x < this.world.level.level_end_x &&
      !this.world.isEndbossBlocking()
    ) {
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

  handleJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.world.soundManager.play("jump");
      this.canPlayJumpSound = false;
      this.resetIdleTime();
    }
    if (!this.world.keyboard.SPACE) {
      this.canPlayJumpSound = true;
    }
  }

  updateIdleTime() {
    const isMoving =
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.SPACE ||
      this.world.keyboard.D;
    if (isMoving || this.isAboveGround() || this.isHurt()) {
      this.resetIdleTime();
      return;
    }
    this.idleTime += 1000 / 60;
  }

  resetIdleTime() {
    this.idleTime = 0;
    if (this.isSnoring) {
      this.world.soundManager.stop("pepeSnore");
      this.isSnoring = false;
    }
  }

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
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
      return;
    }
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

  isCharacterCollectionCoin(coin) {
    const characterLeft = this.x;
    const characterRight = this.x + this.width;
    const characterTop = this.y + 70;
    const characterBottom = this.y + this.height;
    const coinLeft = coin.x + 20;
    const coinRight = coin.x + coin.width - 20;
    const coinTop = coin.y + 20;
    const coinBottom = coin.y + coin.height - 20;
    return (
      characterRight > coinLeft &&
      characterLeft < coinRight &&
      characterBottom > coinTop &&
      characterTop < coinBottom
    );
  }

  playDeathAnimation() {
    if (this.deathAnimationFinished) {
      return;
    }
    const path = this.IMAGES_DEAD[this.deathImageIndex];
    this.img = this.imageCache[path];
    if (this.deathImageIndex < this.IMAGES_DEAD.length - 1) {
      this.deathImageIndex++;
    } else {
      this.deathAnimationFinished = true;
      this.deathImage = this.img;
    }
  }

  die() {
    this.deathX = this.x;
    this.deathY = this.y;
  }

  moveLeft() {
    if (this.isFrozen) {
      return;
    }
    super.moveLeft();
  }

  moveRight() {
    if (this.isFrozen) {
      return;
    }
    super.moveRight();
  }

  checkChickenStomp() {
    if (!this.isAboveGround() || this.speedY >= 0) {
      return;
    }

    this.world.level.enemies.forEach((enemy) => {
      if (!this.isStompableEnemy(enemy)) {
        return;
      }

      const characterBottom = this.y + this.height;
      const enemyTop = enemy.y;

      const stompOffsetX = 30;
      const stompWidth = this.width - 60;

      const characterLeft = this.x + stompOffsetX;
      const characterRight = characterLeft + stompWidth;

      const enemyLeft = enemy.x;
      const enemyRight = enemy.x + enemy.width;

      const isHorizontallyOverlapping =
        characterRight > enemyLeft && characterLeft < enemyRight;

      const isLandingOnEnemy =
        characterBottom >= enemyTop && characterBottom <= enemyTop + 30;

      if (isHorizontallyOverlapping && isLandingOnEnemy) {
        enemy.hit();
        this.speedY = 20;
      }
    });
  }

  isStompableEnemy(enemy) {
    return (
      (enemy instanceof Chicken || enemy instanceof SmallChicken) &&
      !enemy.isChickenDead
    );
  }

  hit() {
    if (this.isDead()) {
      return;
    }
    super.hit();
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

  jump() {
    this.speedY = 30;
  }
}
