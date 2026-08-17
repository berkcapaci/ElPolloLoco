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

/** Starts the game and switches from the menu to the game screen. */
function startGame() {
  hideMenuScreens();
  showGameScreen();
  init();
  soundManager.playMusic();
}

/** Hides all menu, settings, shop, and game-over screens. */
function hideMenuScreens() {
  const screenSelectors = [
    ".start-screen",
    ".win-screen",
    ".lose-screen",
    "#setting-screen",
    "#controls-screen",
    "#impressum-screen",
    "#shop-screen",
    "#pause-screen",
  ];

  screenSelectors.forEach((selector) => {
    document.querySelector(selector)?.classList.add("d-none");
  });
}

/** Displays the game canvas and activates the mobile controls. */
function showGameScreen() {
  document.getElementById("canvas").style.display = "block";

  const mobileControls = document.getElementById("mobile-controls");

  if (mobileControls) {
    mobileControls.classList.add("active");
  }

  checkScreenOrientation();
}

/** Initializes the game world using the canvas, keyboard, and sound manager. */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, soundManager);
}

/** Restarts the game without reloading the page. */
function restartGame() {
  stopCurrentGame();
  resetGameState();
  clearCanvas();
  init();
  showGameScreen();
  soundManager.playMusic();
}

/** Stops the currently running game and stops the character's snoring sound. */
function stopCurrentGame() {
  world?.stop();
  soundManager.stop("pepeSnore");
}

/** Resets the keyboard and hides all active game screens. */
function resetGameState() {
  keyboard = new Keyboard();
  hideMenuScreens();
}

/** Clears the complete game canvas. */
function clearCanvas() {
  canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/** Stops the current game and returns the player to the main menu. */
function showMenu() {
  stopCurrentGame();
  resetGameState();
  hideGameScreen();
  showStartScreen();
  soundManager.playMusic();
}

/** Hides the game canvas and deactivates the mobile controls. */
function hideGameScreen() {
  document.getElementById("canvas").style.display = "none";

  const mobileControls = document.getElementById("mobile-controls");

  if (mobileControls) {
    mobileControls.classList.remove("active");
  }
}

/** Displays the main start screen. */
function showStartScreen() {
  document.querySelector(".start-screen")?.classList.remove("d-none");
}

/** Toggles the pause state of the current game. */
function togglePause() {
  if (!world || world.gameWon || world.gameLost) {
    return;
  }

  const pauseScreen = getPauseScreen();

  if (!pauseScreen) {
    return;
  }

  pauseScreen.classList.contains("d-none") ? pauseGame() : resumeGame();
}

/** Returns the pause screen element. */
function getPauseScreen() {
  return document.getElementById("pause-screen");
}

/** Pauses the game and displays the pause screen. */
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

/** Resumes the game and hides the pause screen. */
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

/** Handles the Escape key during active gameplay. */
function handleEscapeKey(event) {
  if (event.repeat || !world || !isGameplayActive()) {
    return;
  }

  togglePause();
}

/** Checks whether the game is currently in active gameplay. */
function isGameplayActive() {
  const screens = [
    document.querySelector(".start-screen"),
    document.querySelector(".win-screen"),
    document.querySelector(".lose-screen"),
    document.getElementById("shop-screen"),
    document.getElementById("pause-screen"),
    document.getElementById("setting-screen"),
    document.getElementById("controls-screen"),
    document.getElementById("impressum-screen"),
  ];

  return !screens.some((screen) => isScreenVisible(screen));
}

/** Checks whether a screen is currently visible. */
function isScreenVisible(screen) {
  return screen && !screen.classList.contains("d-none");
}

/** Handles the S key and toggles the shop during gameplay. */
function handleShopKey(event) {
  if (event.repeat || !world || !isGameplayActive()) {
    return;
  }

  toggleShop();
}

/** Opens or closes the shop depending on its current visibility. */
function toggleShop() {
  const shopScreen = document.getElementById("shop-screen");

  if (!shopScreen) {
    return;
  }

  shopScreen.classList.contains("d-none") ? openShop() : closeShop();
}

/** Handles a pressed game key and updates the keyboard state. */
function handleGameKey(event) {
  if (!isGameplayActive()) {
    return;
  }

  const key = keyMap[event.keyCode];

  if (key) {
    keyboard[key] = true;
  }
}

/** Handles a released game key and updates the keyboard state. */
function handleGameKeyUp(event) {
  const key = keyMap[event.keyCode];

  if (key) {
    keyboard[key] = false;
  }
}

/** Initializes volume controls, the mute button, and background music. */
function initializeGame() {
  setupVolumeControls();
  setupMuteButton();
  soundManager.playMusic();
}

/** Closes a modal when the user clicks directly on its overlay. */
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

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    handleEscapeKey(event);
    return;
  }

  if (event.keyCode === 83) {
    handleShopKey(event);
    return;
  }

  handleGameKey(event);
});

window.addEventListener("keyup", handleGameKeyUp);
window.addEventListener("DOMContentLoaded", initializeGame);
document.addEventListener("click", handleModalClick);