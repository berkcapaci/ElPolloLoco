let canvas;
let world;
let keyboard = new Keyboard();
let soundManager = new SoundManager();

function startGame() {
  document.querySelector(".start-screen").classList.add("d-none");
  document.querySelector(".win-screen").classList.add("d-none");
  document.querySelector(".lose-screen").classList.add("d-none");
  document.getElementById("setting-screen").classList.add("d-none");
  document.getElementById("controls-screen").classList.add("d-none");
  document.getElementById("impressum-screen").classList.add("d-none");
  document.getElementById("shop-screen").classList.add("d-none");
  document.getElementById("pause-screen").classList.add("d-none");
  document.getElementById("canvas").style.display = "block";
  document.getElementById("mobile-controls").classList.add("active");
  init();
  soundManager.playMusic();
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, soundManager);
}

function restartGame() {
  if (world) {
    world.stop();
  }
  keyboard = new Keyboard();
  document.querySelector(".win-screen").classList.add("d-none");
  document.querySelector(".lose-screen").classList.add("d-none");
  document.getElementById("pause-screen").classList.add("d-none");
  document.getElementById("shop-screen").classList.add("d-none");
  canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  init();
  soundManager.playMusic();
}

function showMenu() {
  if (world) {
    world.stop();
  }
  keyboard = new Keyboard();
  document.querySelector(".win-screen").classList.add("d-none");
  document.querySelector(".lose-screen").classList.add("d-none");
  document.getElementById("pause-screen").classList.add("d-none");
  document.getElementById("shop-screen").classList.add("d-none");
  document.getElementById("setting-screen").classList.add("d-none");
  document.getElementById("controls-screen").classList.add("d-none");
  document.getElementById("impressum-screen").classList.add("d-none");
  document.getElementById("canvas").style.display = "none";
  document.getElementById("mobile-controls").classList.remove("active");
  document.querySelector(".start-screen").classList.remove("d-none");
  soundManager.playMusic();
}

function togglePause() {
  if (!world || world.gameWon || world.gameLost) {
    return;
  }
  const pauseScreen = document.getElementById("pause-screen");
  if (!pauseScreen) {
    return;
  }
  if (pauseScreen.classList.contains("d-none")) {
    pauseGame();
  } else {
    resumeGame();
  }
}

function pauseGame() {
  if (!world) {
    return;
  }
  const pauseScreen = document.getElementById("pause-screen");
  if (!pauseScreen) {
    return;
  }
  pauseScreen.classList.remove("d-none");
  world.stop();
}

function resumeGame() {
  if (!world) {
    return;
  }
  const pauseScreen = document.getElementById("pause-screen");
  if (!pauseScreen) {
    return;
  }
  pauseScreen.classList.add("d-none");
  world.resume();
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !e.repeat) {
    const startScreen = document.querySelector(".start-screen");
    if (startScreen && !startScreen.classList.contains("d-none")) {
      return;
    }
    if (world && !world.gameWon && !world.gameLost) {
      togglePause();
    }
    return;
  }
  if (e.keyCode === 83 && !e.repeat) {
    const pauseScreen = document.getElementById("pause-screen");
    if (pauseScreen && !pauseScreen.classList.contains("d-none")) {
      return;
    }
    keyboard.S = true;
    if (world && !world.gameWon && !world.gameLost) {
      const shopScreen = document.getElementById("shop-screen");
      if (shopScreen.classList.contains("d-none")) {
        openShop();
      } else {
        closeShop();
      }
    }
    return;
  }
  if (e.keyCode === 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode === 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode === 38) {
    keyboard.UP = true;
  }
  if (e.keyCode === 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode === 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode === 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode === 83) {
    keyboard.S = false;
  }
  if (e.keyCode === 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode === 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode === 38) {
    keyboard.UP = false;
  }
  if (e.keyCode === 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode === 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode === 68) {
    keyboard.D = false;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  setupVolumeControls();
  setupMuteButton();
  soundManager.playMusic();
});

function toggleFullscreen() {
  const gameContainer = document.querySelector(".game-container");
  if (!document.fullscreenElement) {
    gameContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function checkScreenOrientation() {
  const rotateScreen = document.getElementById("rotate-screen");
  if (!rotateScreen) {
    return;
  }
  const isMobileDevice = /Android|iPhone|iPad|iPod|Windows Phone|Pixel /i.test(
    navigator.userAgent,
  );
  if (!isMobileDevice) {
    rotateScreen.classList.add("d-none");
    return;
  }
  if (window.innerHeight > window.innerWidth) {
    rotateScreen.classList.remove("d-none");
  } else {
    rotateScreen.classList.add("d-none");
  }
}

function setupMobileControls() {
  const mobileControls = document.getElementById("mobile-controls");
  if (!mobileControls) {
    return;
  }
  const buttons = {
    "mobile-left": "LEFT",
    "mobile-right": "RIGHT",
    "mobile-jump": "SPACE",
    "mobile-throw": "D",
  };
  Object.entries(buttons).forEach(([buttonId, key]) => {
    const button = document.getElementById(buttonId);
    if (!button) {
      return;
    }
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      keyboard[key] = true;
    });
    button.addEventListener("pointerup", (event) => {
      event.preventDefault();
      keyboard[key] = false;
    });
    button.addEventListener("pointercancel", () => {
      keyboard[key] = false;
    });
    button.addEventListener("pointerleave", () => {
      keyboard[key] = false;
    });
  });
}

function handleOrientationChange() {
  checkScreenOrientation();
}

window.addEventListener("load", checkScreenOrientation);
window.addEventListener("resize", checkScreenOrientation);
window.addEventListener("orientationchange", handleOrientationChange);
window.addEventListener("load", setupMobileControls);

const modalCloseFunctions = {
  "setting-screen": closeSettings,
  "shop-screen": closeShop,
  "controls-screen": closeControls,
  "impressum-screen": closeImpressum,
};

document.addEventListener("click", (event) => {
  const overlay = event.target.closest(".click-outside-close");
  if (!overlay) {
    return;
  }
  if (event.target !== overlay) {
    return;
  }
  const closeFunction = modalCloseFunctions[overlay.id];
  if (closeFunction) {
    closeFunction();
  }
});
