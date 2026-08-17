/**
 * Controls the game world, including the character, enemies, collisions, camera, rendering, game states and game loop.
 */
class World {
  /** @type {Character} */
  character;
  /** @type {Level} */
  level;
  /** @type {MovableObject[]} */
  enemies;
  /** @type {HTMLCanvasElement} */
  canvas;
  /** @type {CanvasRenderingContext2D} */
  ctx;
  /** @type {Keyboard} */
  keyboard;
  /** @type {number} */
  camera_x = 0;
  /** @type {StatusBar} */
  statusBar;
  /** @type {ThrowableObject[]} */
  throwableObjects;
  /** @type {CoinCounter} */
  coinCounter;
  /** @type {BottleCounter} */
  bottleCounter;
  /** @type {EndbossBar} */
  endbossBar;
  /** @type {boolean} */
  canThrowBottle = true;
  /** @type {boolean} */
  gameWon = false;
  /** @type {boolean} */
  gameLost = false;
  /** @type {number|undefined} */
  gameInterval;
  /** @type {number|undefined} */
  animationFrameId;
  /** @type {number|undefined} */
  throwCooldownTimeout;
  /** @type {number|undefined} */
  loseScreenTimeout;
  /** @type {number|undefined} */
  winScreenTimeout;
  /** @type {boolean} */
  isStopped = false;
  /** @type {SoundManager} */
  soundManager;

  /** Creates a new game world. */
  constructor(canvas, keyboard, soundManager) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.level = createLevel1();
    this.character = new Character();
    this.enemies = this.level.enemies;
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

  /** Connects the character and enemies to the current world. */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /** Starts the main game loop. */
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

  /** Stops the game loop, animation frame and active timers. */
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

  /** Resumes the game and restarts the game loop. */
  resume() {
    this.isStopped = false;
    this.level.enemies.forEach((enemy) => {
      enemy.isFrozen = false;
    });
    this.draw();
    this.run();
  }

  /** Checks collisions between the character and enemies. */
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

  /** Checks whether the character collects a coin. */
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

  /** Checks whether the character collects a bottle. */
  checkBottleCollection() {
    const availableBottles = this.level.bottles;
    const collectedBottleIndex = availableBottles.findIndex((currentBottle) => {
      return this.character.isColliding(currentBottle);
    });
    if (collectedBottleIndex !== -1) {
      availableBottles.splice(collectedBottleIndex, 1);
      this.character.collectedBottles++;
      this.bottleCounter.currentBottleAmount = this.character.collectedBottles;
    }
  }

  /** Checks collisions between thrown bottles and enemies. */
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

  /** Creates and throws a bottle when the player presses D. */
  checkThrowObjects() {
    if (this.character.isFrozen) {
      return;
    }
    if (
      this.keyboard.D &&
      this.character.collectedBottles > 0 &&
      this.canThrowBottle
    ) {
      const bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 70,
      );
      bottle.world = this;
      this.throwableObjects.push(bottle);
      this.soundManager.play("bottleThrow");
      this.character.collectedBottles--;
      this.bottleCounter.currentBottleAmount = this.character.collectedBottles;
      this.canThrowBottle = false;
      this.throwCooldownTimeout = setTimeout(() => {
        this.canThrowBottle = true;
      }, 600);
    }
  }

  /** Returns the endboss from the current level. */
  getEndboss() {
    return this.level.enemies.find((enemy) => enemy instanceof Endboss);
  }

  /** Checks whether the endboss is visible on the screen. */
  isEndbossVisible() {
    const endboss = this.getEndboss();
    if (!endboss) {
      return false;
    }
    const screenX = endboss.x + this.camera_x;
    return screenX < this.canvas.width && screenX + endboss.width > 0;
  }

  /** Checks whether the endboss blocks the character's movement. */
  isEndbossBlocking() {
    const endboss = this.getEndboss();
    if (!endboss) {
      return false;
    }
    return this.character.x + this.character.width >= endboss.x - 20;
  }

  /** Draws the complete game world and HUD. */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgroundObjects);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.throwableObjects);
    this.addObjectToMap(this.level.coins);
    this.addObjectToMap(this.level.bottles);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinCounter);
    this.addToMap(this.bottleCounter);
    if (this.isEndbossVisible()) {
      this.endbossBar.draw(this.ctx);
    }
    this.animationFrameId = requestAnimationFrame(() => {
      if (!this.isStopped) {
        this.draw();
      }
    });
  }

  /** Adds multiple game objects to the map. */
  addObjectToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /** Adds a single game object to the map. */
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

  /** Flips an object horizontally. */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(2 * mo.x + mo.width, 0);
    this.ctx.scale(-1, 1);
  }

  /** Restores the canvas after flipping an object. */
  flipImageBack(mo) {
    this.ctx.restore();
  }

  /** Removes throwable objects that are marked for deletion. */
  removeMarkedThrowableObjects() {
    this.throwableObjects = this.throwableObjects.filter(
      (throwableObject) => !throwableObject.markedForDeletion,
    );
  }

  /** Removes dead chickens after their death animation duration. */
  removeDeadChickens() {
    const currentTime = new Date().getTime();
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (!enemy.isChickenDead) {
        return true;
      }
      return currentTime - enemy.deathTime < 500;
    });
  }

  /** Displays the win screen. */
  showWinScreen() {
    const winScreen = document.querySelector(".win-screen");
    if (!winScreen) {
      return;
    }
    winScreen.classList.remove("d-none");
  }

  /** Checks whether the player has defeated the endboss. */
  checkWinCondition() {
    const endboss = this.getEndboss();
    if (!endboss || this.gameWon) {
      return;
    }
    if (endboss.isEndbossDead && endboss.deathAnimationFinished) {
      this.handleGameWin();
    }
  }

  /** Handles the game win state. */
  handleGameWin() {
    this.gameWon = true;
    this.character.isFrozen = true;
    this.playWinSoundAfterBossDeath();
    this.scheduleWinScreen();
  }

  /** Plays the win sound after the endboss death sound has finished. */
  playWinSoundAfterBossDeath() {
    const bossDeathSound = this.soundManager.sounds.bossDeath;
    if (bossDeathSound.ended) {
      this.soundManager.play("win");
      return;
    }
    bossDeathSound.addEventListener(
      "ended",
      () => {
        if (!this.isStopped) {
          this.soundManager.play("win");
        }
      },
      { once: true },
    );
  }

  /** Displays the win screen after a short delay. */
  scheduleWinScreen() {
    this.winScreenTimeout = setTimeout(() => {
      if (!this.isStopped) {
        this.showWinScreen();
      }
    }, 1000);
  }

  /** Displays the lose screen. */
  showLoseScreen() {
    const loseScreen = document.getElementById("lose-screen");
    if (!loseScreen) {
      return;
    }
    loseScreen.classList.remove("d-none");
  }

  /** Checks whether the character has died. */
  checkLoseCondition() {
    if (this.gameLost) {
      return;
    }
    if (this.character.isDead()) {
      this.gameLost = true;
      this.soundManager.play("lose");
      const endboss = this.getEndboss();
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