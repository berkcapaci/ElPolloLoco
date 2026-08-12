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
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);

    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        return;
      }
      if (this.isFrozen) {
        return;
      }

      if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x &&
        !this.world.isEndbossBlocking()
      ) {
        this.moveRight();
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playDeathAnimation();

        if (this.deathAnimationFinished) {
          this.img = this.deathImage;
        }

        return;
      }
      if (this.isFrozen) {
        return;
      }
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 100);
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

  jump() {
    this.speedY = 30;
  }
}
