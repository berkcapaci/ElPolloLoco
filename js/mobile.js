/**
 * Toggles fullscreen mode for the game container.
 */
function toggleFullscreen() {
  const gameContainer = document.querySelector(".game-container");

  if (!document.fullscreenElement) {
    gameContainer.requestFullscreen();
    return;
  }

  document.exitFullscreen();
}

/**
 * Checks whether the device is mobile and updates the orientation screen.
 */
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

  updateOrientationScreen(rotateScreen);
}

/**
 * Shows or hides the rotate screen depending on the device orientation.
 *
 * @param {HTMLElement} rotateScreen - The rotate screen element.
 */
function updateOrientationScreen(rotateScreen) {
  if (window.innerHeight > window.innerWidth) {
    rotateScreen.classList.remove("d-none");
    return;
  }

  rotateScreen.classList.add("d-none");
}

/**
 * Initializes all mobile game controls and maps them to keyboard actions.
 */
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
    setupMobileButton(buttonId, key);
  });

  setupMobileMenuButton("mobile-shop", toggleShop);
  setupMobileMenuButton("mobile-pause", togglePause);
}

/**
 * Sets up pointer events for a mobile control button.
 *
 * @param {string} buttonId - The button ID.
 * @param {string} key - The keyboard property controlled by the button.
 */
function setupMobileButton(buttonId, key) {
  const button = document.getElementById(buttonId);

  if (!button) {
    return;
  }

  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    keyboard[key] = true;
  });

  button.addEventListener("pointerup", (event) => {
    event.preventDefault();
    event.stopPropagation();
    keyboard[key] = false;
  });

  button.addEventListener("pointercancel", () => {
    keyboard[key] = false;
  });

  button.addEventListener("pointerleave", () => {
    keyboard[key] = false;
  });

  button.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}

/**
 * Sets up a mobile button that triggers a menu action.
 *
 * @param {string} buttonId - The button ID.
 * @param {Function} action - The menu action.
 */
function setupMobileMenuButton(buttonId, action) {
  const button = document.getElementById(buttonId);

  if (!button) {
    return;
  }

  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    action();
  });

  button.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}

/**
 * Handles device orientation changes.
 */
function handleOrientationChange() {
  checkScreenOrientation();
}

window.addEventListener("load", checkScreenOrientation);
window.addEventListener("resize", checkScreenOrientation);
window.addEventListener("orientationchange", handleOrientationChange);
window.addEventListener("load", setupMobileControls);
