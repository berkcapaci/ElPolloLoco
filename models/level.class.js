/**
 * Represents a game level and stores all objects belonging to it.
 */
class Level {
  /** @type {MovableObject[]} */
  enemies;

  /** @type {Cloud[]} */
  clouds;

  /** @type {BackgroundObject[]} */
  backgroundObjects;

  /** @type {Coin[]} */
  coins;

  /** @type {Bottle[]} */
  bottles;

  /** @type {number} */
  level_end_x = 5500;

  /**
   * Creates a new game level.
   *
   * @param {MovableObject[]} enemies - Enemies contained in the level.
   * @param {Cloud[]} clouds - Clouds contained in the level.
   * @param {BackgroundObject[]} backgroundObjects - Background objects of the level.
   * @param {Coin[]} coins - Coins contained in the level.
   * @param {Bottle[]} bottles - Bottles contained in the level.
   */
  constructor(enemies, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}