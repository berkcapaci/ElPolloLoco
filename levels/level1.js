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
      let x = startX + (width / (itemAmount- 1)) * i;
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

  function createRandomChickens(itemAmount, minX, maxX){
    let chickens = [];
    for (let i = 0; i < itemAmount; i++) {
      let x = minX + Math.random() * (maxX - minX);
      chickens.push(new Chicken(x));
    }
    return chickens;
  }

const level1 = new Level(
 
  [
    ...createRandomChickens(12, 300, 2100),
    new Endboss()
  ],
  [new Cloud()],
  [
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
  ],

  [
    ...createCoinArc(100, 200, 350, 100, 11),
    ...createCoinArc(800, 200, 350, 100, 11),
    ...createCoinArc(1500, 200, 350, 100, 11),
    new Coin(350, 300),
    new Coin(450, 300),
    new Coin(550, 300),
    new Coin(600, 300),
    new Coin(1250, 300),
    new Coin(1450, 300),
    new Coin(1750, 300)
    
  ],

  [
    ...createBottleLine(100, 360, 25, 50),
    new Bottle(1200, 360),
    new Bottle(1250, 360),
    new Bottle(1300, 360),
    new Bottle(1350, 360),
    new Bottle(1400, 360),
    new Bottle(1450, 360),
    new Bottle(1500, 360),
    new Bottle(1550, 360),
    new Bottle(1600, 360),
    new Bottle(1650, 360),
    new Bottle(1700, 360),
    new Bottle(1750, 360),
    new Bottle(1800, 360),
    new Bottle(1850, 360),
    new Bottle(1900, 360)
  ],
);
