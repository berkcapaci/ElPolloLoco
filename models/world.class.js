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
  soundManager;

  constructor(canvas, keyboard, soundManager) {
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
    this.soundManager = soundManager || new SoundManager();
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
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
    }, 1000 / 60);
  }

  stop() {
    this.isStopped = true;
    clearInterval(this.gameInterval);
    cancelAnimationFrame(this.animationFrameId);
    clearTimeout(this.throwCooldownTimeout);
    clearTimeout(this.loseScreenTimeout);
    clearTimeout(this.winScreenTimeout);

    this.level.enemies.forEach((enemy) => {
      enemy.isFrozen = true;
    });
  }

  resume() {
    this.isStopped = false;

    this.level.enemies.forEach((enemy) => {
      enemy.isFrozen = false;
    });

    this.draw();
    this.run();
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isChickenDead || enemy.isEndbossDead) {
        return;
      }
      let isColliding = false;
      if (enemy instanceof Chicken) {
        isColliding = enemy.isCharacterInAttackRange(this.character);
      } else {
        isColliding = this.character.isColliding(enemy);
      }
      if (isColliding) {
        if (this.character.isHurt()) {
          return;
        }
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCoinCollisions() {
    const availableCoins = this.level.coins;
    const collectedCoinIndex = availableCoins.findIndex((coin) => {
      return this.character.isCharacterCollectionCoin(coin);
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
        let isBottleCollision = false;
        if (enemy instanceof Endboss) {
          isBottleCollision = enemy.isCollidingWithBottle(bottle);
        } else if (enemy instanceof Chicken) {
          isBottleCollision = enemy.isCollidingWithBottle(bottle);
        } else {
          isBottleCollision = bottle.isColliding(enemy);
        }
        if (isBottleCollision) {
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
    if (this.character.isFrozen) {
      return;
    }
    if (
      this.keyboard.D &&
      this.character.collectedBottles > 0 &&
      this.canThrowBottle
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 70,
      );
      bottle.world = this;
      this.throwableObjects.push(bottle);
      this.soundManager.play("bottleThrow");
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

    if (endboss.isEndbossDead && endboss.deathAnimationFinished) {
      this.gameWon = true;
      this.character.isFrozen = true;

      this.winScreenTimeout = setTimeout(() => {
        if (!this.isStopped) {
          this.showWinScreen();
        }
      }, 1000);
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

      const endboss = this.level.enemies.find(
        (enemy) => enemy instanceof Endboss,
      );

      if (endboss) {
        endboss.isFrozen = true;
      }

      this.loseScreenTimeout = setTimeout(() => {
        if (!this.isStopped) {
          this.showLoseScreen();
        }
      }, 2000);
    }
  }
}
