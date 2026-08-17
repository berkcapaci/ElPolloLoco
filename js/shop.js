/**
 * Indicates whether the shop was opened from the active game.
 */
let shopOpenedFromGame = false;

/**
 * Opens the shop and prepares the game state for shopping.
 */
function openShop() {
  const canvas = document.getElementById("canvas");
  const pauseScreen = document.getElementById("pause-screen");
  if (pauseScreen && !pauseScreen.classList.contains("d-none")) {
    return;
  }
  shopOpenedFromGame = !!world && canvas && canvas.style.display === "block";
  shopOpenedFromPausedGame = false;
  freezeGameForShop();
  hideStartScreen();
  showShopScreen();
  hideMobileControls();
  updateShopCoinAmount();
}

/**
 * Freezes the game and its enemies while the shop is open.
 */
function freezeGameForShop() {
  if (!shopOpenedFromGame) {
    return;
  }

  world.stop();

  world.level.enemies.forEach((enemy) => {
    enemy.isFrozen = true;
  });
}

/**
 * Hides the start screen.
 */
function hideStartScreen() {
  document.querySelector(".start-screen").classList.add("d-none");
}

/**
 * Displays the shop screen.
 */
function showShopScreen() {
  document.getElementById("shop-screen").classList.remove("d-none");
}

/**
 * Hides the mobile game controls while the shop is open.
 */
function hideMobileControls() {
  document.getElementById("mobile-controls").classList.remove("active");
}

/**
 * Updates the displayed coin balance in the shop.
 */
function updateShopCoinAmount() {
  const shopCoinAmount = document.getElementById("shop-coin-amount");

  if (!shopCoinAmount) {
    return;
  }

  if (!shopOpenedFromGame) {
    shopCoinAmount.textContent = "0";
    return;
  }

  const currentCoinAmount = world?.character?.collectedCoins ?? 0;
  shopCoinAmount.textContent = currentCoinAmount;
}

/**
 * Buys bottles using the character's collected coins.
 *
 * @param {number} amount - The number of bottles to purchase.
 * @param {number} price - The price of the bottle purchase.
 */
function buyBottle(amount, price) {
  if (!shopOpenedFromGame || !world || !world.character) {
    return;
  }

  const character = world.character;

  if (character.collectedCoins < price) {
    alert("Not enough coins!");
    return;
  }

  character.collectedCoins -= price;
  character.collectedBottles += amount;

  updateCounters();
  updateShopCoinAmount();
}

/**
 * Updates the coin and bottle counters with the character's current inventory.
 */
function updateCounters() {
  world.coinCounter.currentCoinAmount = world.character.collectedCoins;
  world.bottleCounter.currentBottleAmount = world.character.collectedBottles;
}

/**
 * Closes the shop and returns to the appropriate previous screen.
 */
function closeShop() {
  document.getElementById("shop-screen").classList.add("d-none");
  document.body.classList.remove("shop-open");
  if (shopOpenedFromGame && world) {
    resumeGameAfterShop();
    return;
  }
  showStartScreenAfterShop();
}

/**
 * Resumes the game and unfreezes all enemies after leaving the shop.
 */
function resumeGameAfterShop() {
  document.getElementById("mobile-controls").classList.add("active");

  world.level.enemies.forEach((enemy) => {
    enemy.isFrozen = false;
  });

  world.resume();
}

/**
 * Returns to the start screen after closing the shop.
 */
function showStartScreenAfterShop() {
  document.getElementById("mobile-controls").classList.remove("active");
  document.querySelector(".start-screen").classList.remove("d-none");
  soundManager.playMusic();
  shopOpenedFromGame = false;
}
