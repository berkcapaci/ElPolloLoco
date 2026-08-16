let shopOpenedFromGame = false;

function openShop() {
  const canvas = document.getElementById("canvas");
  shopOpenedFromGame = !!world && canvas && canvas.style.display === "block";
  freezeGameForShop();
  hideStartScreen();
  showShopScreen();
  hideMobileControls();
  updateShopCoinAmount();
}

function freezeGameForShop() {
  if (!shopOpenedFromGame) {
    return;
  }
  world.stop();
  world.level.enemies.forEach((enemy) => {
    enemy.isFrozen = true;
  });
}

function hideStartScreen() {
  document.querySelector(".start-screen").classList.add("d-none");
}

function showShopScreen() {
  document.getElementById("shop-screen").classList.remove("d-none");
}

function hideMobileControls() {
  document.getElementById("mobile-controls").style.display = "none";
}

function updateShopCoinAmount() {
  const shopCoinAmount = document.getElementById("shop-coin-amount");
  if (!shopCoinAmount) {
    return;
  }
  const currentCoinAmount = world?.character?.collectedCoins ?? 0;
  shopCoinAmount.textContent = currentCoinAmount;
}

function buyBottle(amount, price) {
  if (!world || !world.character) {
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

function updateCounters() {
  world.coinCounter.currentCoinAmount = world.character.collectedCoins;
  world.bottleCounter.currentBottleAmount = world.character.collectedBottles;
}

function closeShop() {
  document.getElementById("shop-screen").classList.add("d-none");
  if (shopOpenedFromGame && world) {
    resumeGameAfterShop();
    return;
  }
  showStartScreenAfterShop();
}

function resumeGameAfterShop() {
  document.getElementById("mobile-controls").style.display = "block";
  world.level.enemies.forEach((enemy) => {
    enemy.isFrozen = false;
  });
  world.resume();
}

function showStartScreenAfterShop() {
  document.getElementById("mobile-controls").style.display = "none";
  document.querySelector(".start-screen").classList.remove("d-none");
  soundManager.playMusic();
}
