class Chicken extends MovableObject {
  y = 365;
  height = 60;
  width = 60;
  energy = 0;
  isChickenDead = false;
  deathTime = 0;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
  ];

  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);

    this.x = x;
    this.speed = 0.15 + Math.random() * 0.5;

    this.animate();
  }

  hit(){
    this.energy = 0;
    this.isChickenDead = true;
    this.deathTime = new Date().getTime();
    this.loadImage(this.IMAGE_DEAD);
  }

  animate() {
    setInterval(() => {
      if(!this.isChickenDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if(!this.isChickenDead){
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
