class Endboss extends MovableObject {
  height = 350;
  width = 350;
  y = 100;
  energy = 400;
  collisionOffsetX = 60;
  collisionOffsetY = 40;
  collisionWidth = 120;
  collisionHeight = 80;
  isEndbossDead = false;
  deathAnimationFinished = false;
  currentState = "WALK";
  alertDistance = 800;
  attackDistance = 250;
  startX = 5050;
  returnDistance = 900;
  bossSpeed = 3;
  alertFinished = false;
  attackCooldown = false;
  attackHit = false;
  attackHitFrame = 4;
  isFrozen = false;
  deathSoundPlayed = false;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = this.startX;
    this.animate();
  }

  hit() {
    this.energy -= 20;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isEndbossDead = true;
      this.currentState = "DEAD";
      this.currentImage = 0;
      if (!this.deathSoundPlayed) {
        this.world.soundManager.play("bossDeath");
        this.deathSoundPlayed = true;
      }
      return;
    }
    this.currentState = "HURT";
    this.currentImage = 0;
    this.world.soundManager.play("bossHurt");
    let hurtAnimation = setInterval(() => {
      this.playAnimation(this.IMAGES_HURT);
      if (this.currentImage >= this.IMAGES_HURT.length) {
        clearInterval(hurtAnimation);
        this.currentState = "WALK";
        this.currentImage = 0;
      }
    }, 200);
  }

  isCollidingWithBottle(bottle) {
    return (
      bottle.x + bottle.width > this.x + this.collisionOffsetX &&
      bottle.x < this.x + this.collisionOffsetX + this.collisionWidth &&
      bottle.y + bottle.height > this.y + this.collisionOffsetY &&
      bottle.y < this.y + this.collisionOffsetY + this.collisionHeight
    );
  }

  animate() {
    setInterval(() => {
      if (this.isEndbossDead) {
        if (!this.deathAnimationFinished) {
          this.playAnimation(this.IMAGES_DEAD);
          if (this.currentImage >= this.IMAGES_DEAD.length) {
            this.currentImage = this.IMAGES_DEAD.length - 1;
            this.deathAnimationFinished = true;
          }
        }
        return;
      }
      if (this.isFrozen) {
        return;
      }
      if (this.currentState === "WALK") {
        this.playAnimation(this.IMAGES_WALKING);
      }
      if (this.currentState === "ALERT") {
        this.playAnimation(this.IMAGES_ALERT);
      }
      if (this.currentState === "ATTACK") {
        this.playAnimation(this.IMAGES_ATTACK);
      }
      if (this.currentState === "HURT") {
        this.playAnimation(this.IMAGES_HURT);
      }
    }, 200);
    setInterval(() => {
      if (!this.world || this.isEndbossDead || this.isFrozen) {
        return;
      }
      const character = this.world.character;
      const distance = this.x - character.x;
      if (
        distance <= this.alertDistance &&
        this.currentState === "WALK" &&
        !this.alertFinished
      ) {
        this.currentState = "ALERT";
        this.currentImage = 0;
        this.world.soundManager.play("bossAlert");
        setTimeout(() => {
          if (!this.isEndbossDead) {
            this.alertFinished = true;
            this.currentState = "WALK";
            this.currentImage = 0;
          }
        }, this.IMAGES_ALERT.length * 200);
        return;
      }
      if (this.alertFinished && this.currentState === "WALK") {
        if (distance <= this.attackDistance) {
          this.startAttack();
        } else {
          this.moveBoss(distance);
        }
      }
    }, 1000 / 60);
  }

  moveBoss(distance) {
    if (distance <= this.attackDistance) {
      return;
    }
    if (distance <= this.returnDistance) {
      this.x -= this.bossSpeed;
      this.otherDirection = false;
      return;
    }
    if (this.x < this.startX) {
      this.x += this.bossSpeed;
      this.otherDirection = true;
    }
  }

  startAttack() {
    if (this.attackCooldown || this.isEndbossDead || this.isFrozen) {
      return;
    }
    this.attackCooldown = true;
    this.attackHit = false;
    this.currentState = "ATTACK";
    this.currentImage = 0;
    this.world.soundManager.play("bossAttack");
    const attackFrameTime = this.attackHitFrame * 200;
    setTimeout(() => {
      if (!this.isEndbossDead) {
        this.dealAttackDamage();
      }
    }, attackFrameTime);
    setTimeout(
      () => {
        if (!this.isEndbossDead) {
          this.currentState = "WALK";
          this.currentImage = 0;
        }
        this.attackCooldown = false;
      },
      this.IMAGES_ATTACK.length * 200 + 300,
    );
  }

  dealAttackDamage() {
    if (this.attackHit || !this.world || this.isFrozen) {
      return;
    }
    const character = this.world.character;
    const attackDistance = 180;
    const bossLeft = this.x;
    const characterRight = character.x + character.width;
    const distance = bossLeft - characterRight;
    if (distance <= attackDistance && distance >= -character.width) {
      character.hit();
      this.world.statusBar.setPercentage(character.energy);
      this.attackHit = true;
    }
  }
}
