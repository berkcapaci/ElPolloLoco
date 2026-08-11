class Endboss extends MovableObject {
  height = 350;
  width = 350;
  y = 100;

  energy = 100;
  isEndbossDead = false;
  currentState = "WALK";

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
    this.x = 5050;
    this.animate();
  }

  hit() {
    this.energy -= 10;

    if (this.energy <= 0) {
      this.energy = 0;
      this.isEndbossDead = true;
      this.currentState = "DEAD";
      this.currentImage = 0;
      return;
    }
    this.currentState = "HURT";
    this.currentImage = 0;

    let hurtAnimation = setInterval(() => {
        this.playAnimation(this.IMAGES_HURT);

        if(this.currentImage >= this.IMAGES_HURT.length) {
            clearInterval(hurtAnimation);
            this.currentState = "WALK";
            this.currentImage = 0;
        }
    } , 200);   
  }

  animate() {
    setInterval(() => {
      if (this.isEndbossDead) {
        this.playAnimation(this.IMAGES_DEAD);
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
    }, 200);
  }
}
