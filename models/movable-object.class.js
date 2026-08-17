class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Applies gravity to the movable object at regular intervals.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isDead && this.isDead()) {
        return;
      }
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks whether the object is above the ground level.
   *
   * @returns {boolean} True if the object is above the ground.
   */
  isAboveGround() {
    return this.y < 225;
  }

  /**
   * Checks whether this object is colliding with another movable object.
   *
   * @param {MovableObject} mo - The object to check for a collision.
   * @returns {boolean} True if the objects are colliding.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces the object's energy and records the time of the last hit.
   */
  hit() {
    this.energy -= 5;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks whether the object was hurt within the last second.
   *
   * @returns {boolean} True if the object is currently hurt.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; //Dif in ms
    timepassed = timepassed / 1000; // Dif in seconds.
    return timepassed < 1;
  }

  /**
   * Checks whether the object's energy has reached zero.
   *
   * @returns {boolean} True if the object is dead.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Moves the object to the right according to its current speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left according to its current speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 30;
  }
}
