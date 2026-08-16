/**
 * Creates coins arranged in a half-circle.
 *
 * @param {number} startX
 * @param {number} groundY
 * @param {number} width
 * @param {number} height
 * @param {number} itemAmount
 * @returns {Coin[]}
 */
function createCoinArc(startX, groundY, width, height, itemAmount) {
  let coins = [];

  for (let i = 0; i < itemAmount; i++) {
    let x = startX + (width / (itemAmount - 1)) * i;
    let angle = (Math.PI * i) / (itemAmount - 1);
    let y = groundY - Math.sin(angle) * height;
    coins.push(new Coin(x, y));
  }
  return coins;
}

function createBottleLine(startX, y, itemAmount, distance) {
  let bottles = [];
  for (let i = 0; i < itemAmount; i++) {
    let x = startX + i * distance;
    bottles.push(new Bottle(x, y));
  }
  return bottles;
}

function createRandomChickens(itemAmount, minX, maxX) {
  let chickens = [];
  for (let i = 0; i < itemAmount; i++) {
    let x = minX + Math.random() * (maxX - minX);
    chickens.push(new Chicken(x));
  }
  return chickens;
}

function createEnemies() {
  return [...createRandomChickens(20, 300, 4000), new Endboss()];
}

function createClouds() {
  return [
    new Cloud(0),
    new Cloud(700),
    new Cloud(1450),
    new Cloud(2200),
    new Cloud(2900),
    new Cloud(3650),
    new Cloud(4400),
  ];
}

function createBackgroundObjects() {
  return [
    new BackgroundObject("img/5_background/layers/air.png", -719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

    new BackgroundObject("img/5_background/layers/air.png", 719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      719 * 2,
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 2,
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      719 * 2,
    ),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      719 * 3,
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 3,
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      719 * 3,
    ),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      719 * 4,
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 4,
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      719 * 4,
    ),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 5),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      719 * 5,
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 5,
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      719 * 5,
    ),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 6),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      719 * 6,
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 6,
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      719 * 6,
    ),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 7),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      719 * 7,
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 7,
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      719 * 7,
    ),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 8),
  ];
}

function createLevelCoins() {
  return [
    ...createCoinArc(400, 200, 350, 100, 12),
    ...createCoinArc(1800, 200, 350, 100, 12),
    ...createCoinArc(3200, 200, 350, 100, 12),

    new Coin(4050, 300),
    new Coin(4100, 300),
    new Coin(4150, 300),
    new Coin(4200, 300),
    new Coin(4250, 300),
    new Coin(4300, 300),
    new Coin(4350, 300),
    new Coin(4400, 300),
    new Coin(4450, 300),
  ];
}

function createLevelBottles() {
  return [
    ...createBottleLine(400, 360, 9, 50),
    ...createBottleLine(1800, 360, 9, 50),
    ...createBottleLine(3200, 360, 9, 50),
    ...createBottleLine(4050, 360, 9, 50),
  ];
}

function createLevel1() {
  return new Level(
    createEnemies(),
    createClouds(),
    createBackgroundObjects(),
    createLevelCoins(),
    createLevelBottles(),
  );
}
