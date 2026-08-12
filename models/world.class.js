class World {
  character;
  level;
  enemies;
  clouds;
  backgroundObjects;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar;
  throwableObjects;
  coinCounter;
  bottleCounter;
  endbossBar;
  canThrowBottle = true;
  isChickenDead = false;
  gameWon = false;
  gameLost = false;
  gameInterval;
  animationFrameId;
  throwCooldownTimeout;
  loseScreenTimeout;
  winScreenTimeout;
  isStopped = false;
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.level = createLevel1();
    this.character = new Character();
    this.enemies = this.level.enemies;
    this.clouds = this.level.clouds;
    this.backgroundObjects = this.level.backgroundObjects;
    this.statusBar = new StatusBar();
    this.throwableObjects = [];
    this.coinCounter = new CoinCounter();
    this.bottleCounter = new BottleCounter();
    this.endbossBar = new EndbossBar();
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.world = this;
      }
    });
  }

  run() {
    this.gameInterval = setInterval(() => {
      if (this.isStopped) {
        return;
      }
      this.checkCollisions();
      this.checkCoinCollisions();
      this.checkBottleCollection();
      this.checkBottleCollision();
      this.checkThrowObjects();
      this.removeMarkedThrowableObjects();
      this.removeDeadChickens();
      this.checkWinCondition();
      this.checkLoseCondition();
    }, 200);
  }

  stop() {
    this.isStopped = true;

    clearInterval(this.gameInterval);
    cancelAnimationFrame(this.animationFrameId);
    clearTimeout(this.throwCooldownTimeout);
    clearTimeout(this.loseScreenTimeout);
    clearTimeout(this.winScreenTimeout);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isChickenDead || enemy.isEndbossDead) {
        return;
      }
      if (this.checkJumpOnEnemy(enemy)) {
        return;
      }
      if (this.character.isColliding(enemy)) {
        if (this.character.isHurt()) {
          return;
        }
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        if (enemy instanceof Endboss) {
        }
      }
    });
  }

  checkJumpOnEnemy(enemy) {
    if (!(enemy instanceof Chicken)) {
      return false;
    }
    let characterBottom = this.character.y + this.character.height;
    let chickenTop = enemy.y;
    let isFalling = this.character.speedY < 0;
    let isAboveChicken =
      this.character.x + this.character.width > enemy.x - 30 &&
      this.character.x < enemy.x + enemy.width + 30;
    let isLandingOnChicken =
      characterBottom >= chickenTop && characterBottom <= chickenTop + 60;
    if (isFalling && isAboveChicken && isLandingOnChicken) {
      enemy.hit();
      this.character.speedY = 20;
      return true;
    }
    return false;
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

  checkBottleCollection() {
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

  checkBottleCollision() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.isBroken) {
        return;
      }

      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          bottle.breakBottle();
          enemy.hit();

          if (enemy instanceof Endboss) {
            this.endbossBar.setEnergy(enemy.energy);
          }
        }
      });
    });
  }

  checkThrowObjects() {
    if (
      this.keyboard.D &&
      this.character.collectedBottles > 0 &&
      this.canThrowBottle
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
      );
      this.throwableObjects.push(bottle);
      this.character.collectedBottles--;
      this.bottleCounter.currentBottleAmount = this.character.collectedBottles;
      this.canThrowBottle = false;
      setTimeout(() => {
        this.canThrowBottle = true;
      }, 600);
    }
  }

  isEndbossVisible() {
    const endboss = this.level.enemies.find(
      (enemy) => enemy instanceof Endboss,
    );
    if (!endboss) {
      console.log("NO ENDBOSS FOUND");
      return false;
    }
    const screenX = endboss.x + this.camera_x;
    return screenX < this.canvas.width && screenX + endboss.width > 0;
  }

  isEndbossBlocking() {
    const endboss = this.level.enemies.find(
      (enemy) => enemy instanceof Endboss,
    );

    if (!endboss) {
      return false;
    }

    return this.character.x + this.character.width >= endboss.x - 20;
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
    if (this.isEndbossVisible()) {
      this.endbossBar.draw(this.ctx);
    }
    // Draw() wird immer wieder aufgerufen.
    let self = this;
    this.animationFrameId = requestAnimationFrame(() => {
      if (!this.isStopped) {
        this.draw();
      }
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

    this.ctx.translate(2 * mo.x + mo.width, 0);
    this.ctx.scale(-1, 1);
  }

  flipImageBack(mo) {
    this.ctx.restore();
  }

  removeMarkedThrowableObjects() {
    this.throwableObjects = this.throwableObjects.filter(
      (throwableObject) => !throwableObject.markedForDeletion,
    );
  }

  removeDeadChickens() {
    const currentTime = new Date().getTime();
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (!enemy.isChickenDead) {
        return true;
      }
      return currentTime - enemy.deathTime < 500;
    });
  }

  showWinScreen() {
    const winScreen = document.querySelector(".win-screen");
    if (!winScreen) {
      return;
    }
    winScreen.classList.remove("d-none");
  }

  checkWinCondition() {
    const endboss = this.level.enemies.find(
      (enemy) => enemy instanceof Endboss,
    );

    if (!endboss || this.gameWon) {
      return;
    }

    if (endboss.isEndbossDead) {
      this.gameWon = true;

      this.winScreenTimeout = setTimeout(() => {
        if (!this.isStopped) {
          this.showWinScreen();
        }
      }, 2000);
    }
  }

  showLoseScreen() {
    const loseScreen = document.getElementById("lose-screen");

    if (!loseScreen) {
      return;
    }

    loseScreen.classList.remove("d-none");
  }

  checkLoseCondition() {
    if (this.gameLost) {
      return;
    }
    if (this.character.isDead()) {
      this.gameLost = true;
      this.loseScreenTimeout = setTimeout(() => {
        if (!this.isStopped) {
          this.showLoseScreen();
        }
      }, 2000);
    }
  }
}
