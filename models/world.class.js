class World {
  character = new Character();
  level = level1;

  enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  statusBar = new StatusBar();
  throwableObjects = [];
  coinCounter = new CoinCounter();
  bottleCounter = new BottleCounter();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCoinCollisions() {
    let availableCoins = this.level.coins;

    let collectedCoinIndex = availableCoins.findIndex((currentCoin) => {
      return this.character.isColliding(currentCoin);
      // (currentCoin) => this.character.isColliding(currentCoin) we can write it like this as well.
    });
    if (collectedCoinIndex !== -1) {
      availableCoins.splice(collectedCoinIndex, 1);
      this.character.collectedCoins++;
      this.coinCounter.currentCoinAmount = this.character.collectedCoins;
    }
  }

  checkBottleCollisions(){
    let availableBottles = this.level.bottles;

    let collectedBottleIndex = availableBottles.findIndex((currentBottle) => {
      return this.character.isColliding(currentBottle);
    });
    if (collectedBottleIndex !== -1) {
      availableBottles.splice(collectedBottleIndex, 1);
      this.character.collectedBottles++;
      this.bottleCounter.currentBottleAmount = this.character.collectedBottles;
    }
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.character.collectedBottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
      );
      this.throwableObjects.push(bottle);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.backgroundObjects);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.throwableObjects);
    this.addObjectToMap(this.level.coins);
    this.addObjectToMap(this.level.bottles);

    // This allows Pepe to walk past the bottle.
    this.addToMap(this.character);    

    this.ctx.translate(-this.camera_x, 0);

   // HUD elements (Heads-up display) are drawn last so they always appear in front of the game world.
    this.addToMap(this.statusBar);       
    this.addToMap(this.coinCounter);
    this.addToMap(this.bottleCounter);
    //this.addToMap(this.bottleCounter);   //coming soon.

    // Draw() wird immer wieder aufgerufen.
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
