let canvas;
let world;
let keyboard = new Keyboard();
let shopOpenedFromGame = false;

function startGame() {
  document.querySelector(".start-screen").classList.add("d-none");
  document.querySelector(".win-screen").classList.add("d-none");
  document.querySelector(".lose-screen").classList.add("d-none");
  document.getElementById("canvas").style.display = "block";
  document.getElementById("mobile-controls").style.display = "block";
  init();

  world.soundManager.playMusic();
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function restartGame() {
  if (world) {
    world.stop();
    world.soundManager.stopMusic();
  }

  keyboard = new Keyboard();

  document.querySelector(".win-screen").classList.add("d-none");
  document.querySelector(".lose-screen").classList.add("d-none");

  canvas = document.getElementById("canvas");

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  init();

  world.soundManager.playMusic();
}

function showMenu() {
  if (world) {
    world.stop();
    world.soundManager.stopMusic();
  }

  keyboard = new Keyboard();

  document.querySelector(".win-screen").classList.add("d-none");
  document.querySelector(".lose-screen").classList.add("d-none");

  document.getElementById("canvas").style.display = "none";
  document.getElementById("mobile-controls").style.display = "none";
  document.querySelector(".start-screen").classList.remove("d-none");
}

function openSettings() {
  document.querySelector(".start-screen").classList.add("d-none");
  document.getElementById("settings-screen").classList.remove("d-none");
}

function closeSettings() {
  document.getElementById("settings-screen").classList.add("d-none");
  document.querySelector(".start-screen").classList.remove("d-none");
}

function setupVolumeControls() {
  const musicSlider = document.getElementById("music-volume");
  const effectsSlider = document.getElementById("effects-volume");

  const musicValue = document.getElementById("music-volume-value");
  const effectsValue = document.getElementById("effects-volume-value");

  if (!musicSlider || !effectsSlider || !musicValue || !effectsValue) {
    return;
  }

  const savedMusicVolume = localStorage.getItem("musicVolume");
  const savedEffectsVolume = localStorage.getItem("effectsVolume");

  if (savedMusicVolume !== null) {
    musicSlider.value = savedMusicVolume;
    musicValue.textContent = `${Math.round(Number(savedMusicVolume) * 100)}%`;
  }

  if (savedEffectsVolume !== null) {
    effectsSlider.value = savedEffectsVolume;
    effectsValue.textContent = `${Math.round(Number(savedEffectsVolume) * 100)}%`;
  }

  musicSlider.addEventListener("input", () => {
    const volume = Number(musicSlider.value);
    const percentage = Math.round(volume * 100);

    musicValue.textContent = `${percentage}%`;

    if (world && world.soundManager) {
      world.soundManager.setMusicVolume(volume);
    }
  });

  effectsSlider.addEventListener("input", () => {
    const volume = Number(effectsSlider.value);
    const percentage = Math.round(volume * 100);

    effectsValue.textContent = `${percentage}%`;

    if (world && world.soundManager) {
      world.soundManager.setEffectsVolume(volume);
    }
  });
}

function openControls() {
  document.querySelector(".start-screen").classList.add("d-none");
  document.getElementById("controls-screen").classList.remove("d-none");
}

function closeControls() {
  document.getElementById("controls-screen").classList.add("d-none");
  document.querySelector(".start-screen").classList.remove("d-none");
}

function openImpressum() {
  document.querySelector(".start-screen").classList.add("d-none");
  document.getElementById("impressum-screen").classList.remove("d-none");
}

function closeImpressum() {
  document.getElementById("impressum-screen").classList.add("d-none");
  document.querySelector(".start-screen").classList.remove("d-none");
}

function openShop() {
  if (world) {
    world.stop();
  }
  document.querySelector(".start-screen").classList.add("d-none");
  document.getElementById("shop-screen").classList.remove("d-none");
  document.getElementById("mobile-controls").style.display = "none";
  updateShopCoinAmount();
}

function updateShopCoinAmount() {
  const shopCoinAmount = document.getElementById("shop-coin-amount");
  if (!shopCoinAmount) {
    return;
  }
  const currentCoinAmount = world?.character?.collectedCoins ?? 0;
  shopCoinAmount.textContent = currentCoinAmount;
}

function closeShop() {
  document.getElementById("shop-screen").classList.add("d-none");
  document.getElementById("mobile-controls").style.display = "block";
  if (world) {
    world.resume();
  }
}

function toggleMute() {
  if (!world || !world.soundManager) {
    return;
  }
  const isMuted = world.soundManager.toggleMute();
  const muteButton = document.getElementById("mute-button");
  muteButton.textContent = isMuted ? "🔇" : "🔊";
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 83 && !e.repeat) {
    keyboard.S = true;

    if (world && !world.gameWon && !world.gameLost) {
      openShop(true);
    }
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  setupVolumeControls();
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
