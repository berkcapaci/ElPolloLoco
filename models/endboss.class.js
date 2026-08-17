/**
 * Represents the endboss enemy.
 * Handles movement, attack states, damage, death animation
 * and spawning of small chickens.
 *
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  height = 350;
  width = 350;
  y = 100;
  energy = 400;

  offset = {
    top: 100,
    bottom: 100,
    left: 100,
    right: 100,
  };

  collisionOffsetX = 60;
  collisionOffsetY = 40;
  collisionWidth = 120;
  collisionHeight = 80;

  isEndbossDead = false;
  deathAnimationFinished = false;
  currentState = "WALK";

  alertDistance = 800;
  attackDistance = 220;
  attackApproachDistance = 140;

  startX = 5050;
  returnDistance = 900;
  bossSpeed = 5;

  alertFinished = false;
  attackCooldown = false;
  attackHit = false;
  attackHitFrame = 4;

  isFrozen = false;
  deathSoundPlayed = false;

  smallChickenCooldown = false;
  smallChickenInterval = 5000;

  /**
   * Walking animation images.
   *
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /**
   * Alert animation images.
   *
   * @type {string[]}
   */
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

  /**
   * Attack animation images.
   *
   * @type {string[]}
   */
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

  /**
   * Hurt animation images.
   *
   * @type {string[]}
   */
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /**
   * Death animation images.
   *
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates a new endboss.
   */
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

  /**
   * Reduces the endboss energy and changes its state.
   *
   * @param {number} damage - Amount of damage received.
   */
  hit(damage = 20) {
    this.energy -= damage;
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
    const hurtAnimation = setInterval(() => {
      if (this.isEndbossDead || this.isFrozen) {
        clearInterval(hurtAnimation);
        return;
      }
      this.playAnimation(this.IMAGES_HURT);
      if (this.currentImage >= this.IMAGES_HURT.length) {
        clearInterval(hurtAnimation);
        this.currentState = "WALK";
        this.currentImage = 0;
      }
    }, 200);
  }

  /**
   * Checks whether a throwable bottle collides with the endboss.
   *
   * @param {ThrowableObject} bottle - The thrown bottle.
   * @returns {boolean} Whether the bottle collides with the endboss.
   */
  isCollidingWithBottle(bottle) {
    return (
      bottle.x + bottle.width > this.x + this.collisionOffsetX &&
      bottle.x < this.x + this.collisionOffsetX + this.collisionWidth &&
      bottle.y + bottle.height > this.y + this.collisionOffsetY &&
      bottle.y < this.y + this.collisionOffsetY + this.collisionHeight
    );
  }

  /**
   * Returns Pepe's horizontal center position.
   *
   * @returns {number} Pepe's center position.
   */
  getCharacterCenter() {
    const character = this.world.character;
    return character.x + character.width / 2;
  }

  /**
   * Returns the horizontal center position of the endboss.
   *
   * @returns {number} Endboss center position.
   */
  getEndbossCenter() {
    return this.x + this.width / 2;
  }

  /**
   * Returns the horizontal distance between Pepe and the endboss.
   *
   * @returns {number} Horizontal distance between Pepe and endboss.
   */
  getDistanceToCharacter() {
    return Math.abs(this.getEndbossCenter() - this.getCharacterCenter());
  }

  /**
   * Starts the endboss animation and behavior intervals.
   * Controls walking, alert, attack, hurt and death states.
   */
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
      } else if (this.currentState === "ALERT") {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.currentState === "ATTACK") {
        this.playAnimation(this.IMAGES_ATTACK);
      } else if (this.currentState === "HURT") {
        this.playAnimation(this.IMAGES_HURT);
      }
    }, 200);

    setInterval(() => {
      if (!this.world || this.isEndbossDead || this.isFrozen) {
        return;
      }
      const distance = this.getDistanceToCharacter();
      if (
        distance <= this.alertDistance &&
        this.currentState === "WALK" &&
        !this.alertFinished
      ) {
        this.startAlert();
        return;
      }
      if (this.alertFinished && this.currentState === "WALK") {
        if (distance <= this.attackDistance) {
          this.startAttack();
        } else {
          this.moveBoss(this.getCharacterCenter());
        }
      }
    }, 1000 / 60);
  }

  /**
   * Starts the endboss alert animation.
   */
  startAlert() {
    this.currentState = "ALERT";
    this.currentImage = 0;
    this.world.soundManager.play("bossAlert");
    setTimeout(() => {
      if (!this.isEndbossDead && !this.isFrozen) {
        this.alertFinished = true;
        this.currentState = "WALK";
        this.currentImage = 0;
      }
    }, this.IMAGES_ALERT.length * 200);
  }

  /**
   * Moves the endboss towards Pepe until the attack distance is reached.
   *
   * @param {number} characterCenter - The center position of Pepe.
   */
  moveBoss(characterCenter) {
    const endbossCenter = this.getEndbossCenter();
    const distance = Math.abs(endbossCenter - characterCenter);
    if (distance <= this.attackDistance) {
      return;
    }
    if (characterCenter < endbossCenter) {
      this.x -= this.bossSpeed;
      this.otherDirection = false;
    } else if (characterCenter > endbossCenter && this.x < this.startX) {
      this.x += this.bossSpeed;
      this.otherDirection = true;
    }
  }

  /**
   * Moves the endboss closer to Pepe before applying attack damage.
   *
   * @param {number} characterCenter - The center position of Pepe.
   */
  moveCloserForAttack(characterCenter) {
    const endbossCenter = this.getEndbossCenter();
    const distance = Math.abs(endbossCenter - characterCenter);
    if (distance <= this.attackApproachDistance) {
      return;
    }
    const approachAmount = distance - this.attackApproachDistance;
    if (characterCenter < endbossCenter) {
      this.x -= approachAmount;
      this.otherDirection = false;
    } else {
      this.x += approachAmount;
      this.otherDirection = true;
    }
  }

  /**
   * Starts the endboss attack sequence.
   *
   * Moves closer to Pepe before attacking.
   * The attack hits after attackHitFrame * 100 ms
   * and the next attack is allowed after 500 ms.
   */
  startAttack() {
    if (this.attackCooldown || this.isEndbossDead || this.isFrozen) {
      return;
    }
    const characterCenter = this.getCharacterCenter();
    if (this.getDistanceToCharacter() > this.attackDistance) {
      return;
    }
    this.moveCloserForAttack(characterCenter);
    this.attackCooldown = true;
    this.attackHit = false;
    this.currentState = "ATTACK";
    this.currentImage = 0;
    this.world.soundManager.play("bossAttack");
    this.spawnSmallChicken();

    const attackFrameTime = this.attackHitFrame * 100;
    setTimeout(() => {
      if (!this.isEndbossDead && !this.isFrozen) {
        this.dealAttackDamage();
      }
    }, attackFrameTime);

    setTimeout(
      () => {
        if (!this.isEndbossDead && !this.isFrozen) {
          this.currentState = "WALK";
          this.currentImage = 0;
        }
        this.attackCooldown = false;
      },
      this.IMAGES_ATTACK.length * 100 + 500,
    );
  }

  /**
   * Spawns a small chicken near the endboss.
   */
  spawnSmallChicken() {
    if (this.smallChickenCooldown || this.isEndbossDead) {
      return;
    }
    this.smallChickenCooldown = true;
    const smallChicken = new SmallChicken(this.x - 10);
    smallChicken.world = this.world;
    this.world.level.enemies.push(smallChicken);
    setTimeout(() => {
      this.smallChickenCooldown = false;
    }, this.smallChickenInterval);
  }

  /**
   * Checks whether the endboss attack hits Pepe.
   *
   * Pepe receives 30 damage when he is within the attack range.
   */
  dealAttackDamage() {
    if (this.attackHit || !this.world || this.isFrozen || this.isEndbossDead) {
      return;
    }
    const attackHitRange = 160;
    if (this.getDistanceToCharacter() <= attackHitRange) {
      const character = this.world.character;
      character.hit(30);
      this.world.statusBar.setPercentage(character.energy);
      this.attackHit = true;
    }
  }
}
