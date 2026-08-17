let canvas;
let world;
let keyboard = new Keyboard();
let soundManager = new SoundManager();

const keyMap = {
  83: "S",
  39: "RIGHT",
  37: "LEFT",
  38: "UP",
  40: "DOWN",
  32: "SPACE",
  68: "D",
};

/**
 * Starts the game and switches from the menu to the game screen.
 */
function startGame() {
  hideMenuScreens();
  showGameScreen();
  init();
  soundManager.playMusic();
}

/**
 * Hides all menu, settings, shop, and game-over screens.
 */
function hideMenuScreens() {
  document.querySelector(".start-screen").classList.add("d-none");
  document.querySelector(".win-screen").classList.add("d-none");
  document.querySelector(".lose-screen").classList.add("d-none");
  document.getElementById("setting-screen").classList.add("d-none");
  document.getElementById("controls-screen").classList.add("d-none");
  document.getElementById("impressum-screen").classList.add("d-none");
  document.getElementById("shop-screen").classList.add("d-none");
  document.getElementById("pause-screen").classList.add("d-none");
}

/**
 * Displays the game canvas and activates the mobile controls.
 */
function showGameScreen() {
  document.getElementById("canvas").style.display = "block";
  document.getElementById("mobile-controls").classList.add("active");
}

/**
 * Initializes the game world using the canvas, keyboard, and sound manager.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, soundManager);
}

/**
 * Restarts the game without reloading the page.
 */
function restartGame() {
  stopCurrentGame();
  resetGameState();
  clearCanvas();
  init();
  soundManager.playMusic();
}

/**
 * Stops the currently running game and stops the character's snoring sound.
 */
function stopCurrentGame() {
  if (world) {
    world.stop();
  }
  soundManager.stop("pepeSnore");
}

/**
 * Resets the keyboard and hides all active game screens.
 */
function resetGameState() {
  keyboard = new Keyboard();
  document.querySelector(".win-screen").classList.add("d-none");
  document.querySelector(".lose-screen").classList.add("d-none");
  document.getElementById("pause-screen").classList.add("d-none");
  document.getElementById("shop-screen").classList.add("d-none");
  document.getElementById("setting-screen").classList.add("d-none");
  document.getElementById("controls-screen").classList.add("d-none");
  document.getElementById("impressum-screen").classList.add("d-none");
}

/**
 * Clears the complete game canvas.
 */
function clearCanvas() {
  canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Stops the current game and returns the player to the main menu.
 */
function showMenu() {
  stopCurrentGame();
  resetGameState();
  hideGameScreen();
  showStartScreen();
  soundManager.playMusic();
}

/**
 * Hides the game canvas and deactivates the mobile controls.
 */
function hideGameScreen() {
  document.getElementById("canvas").style.display = "none";
  document.getElementById("mobile-controls").classList.remove("active");
}

/**
 * Displays the main start screen.
 */
function showStartScreen() {
  document.querySelector(".start-screen").classList.remove("d-none");
}

/**
 * Toggles the pause state of the current game.
 */
function togglePause() {
  if (!world || world.gameWon || world.gameLost) {
    return;
  }
  const pauseScreen = getPauseScreen();
  if (!pauseScreen) {
    return;
  }
  if (pauseScreen.classList.contains("d-none")) {
    pauseGame();
  } else {
    resumeGame();
  }
}

/**
 * Returns the pause screen element.
 *
 * @returns {HTMLElement|null} The pause screen element or null if not found.
 */
function getPauseScreen() {
  return document.getElementById("pause-screen");
}

/**
 * Pauses the game and displays the pause screen.
 */
function pauseGame() {
  if (!world) {
    return;
  }
  const pauseScreen = getPauseScreen();
  if (!pauseScreen) {
    return;
  }
  pauseScreen.classList.remove("d-none");
  world.stop();
}

/**
 * Resumes the game and hides the pause screen.
 */
function resumeGame() {
  if (!world) {
    return;
  }
  const pauseScreen = getPauseScreen();
  if (!pauseScreen) {
    return;
  }
  pauseScreen.classList.add("d-none");
  world.resume();
}

/**
 * Handles the Escape key and toggles the pause state during gameplay.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by the user.
 */
function handleEscapeKey(event) {
  if (event.repeat) {
    return;
  }
  const startScreen = document.querySelector(".start-screen");
  const shopScreen = document.getElementById("shop-screen");
  if (startScreen && !startScreen.classList.contains("d-none")) {
    return;
  }
  if (shopScreen && !shopScreen.classList.contains("d-none")) {
    return;
  }
  if (world && !world.gameWon && !world.gameLost) {
    togglePause();
  }
}

/**
 * Handles the S key and toggles the shop during gameplay.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by the user.
 */
function handleShopKey(event) {
  if (event.repeat) {
    return;
  }
  const pauseScreen = document.getElementById("pause-screen");
  if (pauseScreen && !pauseScreen.classList.contains("d-none")) {
    return;
  }
  if (world && !world.gameWon && !world.gameLost) {
    toggleShop();
  }
}

/**
 * Opens or closes the shop depending on its current visibility.
 */
function toggleShop() {
  const shopScreen = document.getElementById("shop-screen");
  if (!shopScreen) {
    return;
  }
  if (shopScreen.classList.contains("d-none")) {
    openShop();
  } else {
    closeShop();
  }
}

/**
 * Handles a pressed game key and updates the keyboard state.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by the user.
 */
function handleGameKey(event) {
  const key = keyMap[event.keyCode];
  if (key) {
    keyboard[key] = true;
  }
}

/**
 * Handles a released game key and updates the keyboard state.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by the user.
 */
function handleGameKeyUp(event) {
  const key = keyMap[event.keyCode];
  if (key) {
    keyboard[key] = false;
  }
}

/**
 * Initializes volume controls, the mute button, and background music.
 */
function initializeGame() {
  setupVolumeControls();
  setupMuteButton();
  soundManager.playMusic();
}

/**
 * Closes a modal when the user clicks directly on its overlay.
 *
 * @param {MouseEvent} event - The click event triggered by the user.
 */
function handleModalClick(event) {
  const overlay = event.target.closest(".click-outside-close");
  if (!overlay || event.target !== overlay) {
    return;
  }
  const closeFunction = modalCloseFunctions[overlay.id];
  if (closeFunction) {
    closeFunction();
  }
}

const modalCloseFunctions = {
  "setting-screen": closeSettings,
  "shop-screen": closeShop,
  "controls-screen": closeControls,
  "impressum-screen": closeImpressum,
};

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    handleEscapeKey(e);
    return;
  }
  if (e.keyCode === 83) {
    handleShopKey(e);
    return;
  }
  handleGameKey(e);
});

window.addEventListener("keyup", (e) => {
  handleGameKeyUp(e);
});

window.addEventListener("DOMContentLoaded", initializeGame);
document.addEventListener("click", handleModalClick);
