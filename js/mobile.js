/**
 * Toggles fullscreen mode for the game container.
 */
function toggleFullscreen() {
  const gameContainer = document.querySelector(".game-container");

  if (!gameContainer) {
    return;
  }

  if (!document.fullscreenElement) {
    gameContainer.requestFullscreen().catch(() => {});
    return;
  }

  document.exitFullscreen().catch(() => {});
}

/**
 * Checks whether the current device is a mobile device.
 *
 * @returns {boolean} True if the device is mobile or tablet.
 */
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Windows Phone|Pixel /i.test(
    navigator.userAgent,
  );
}

/**
 * Checks the current screen orientation and updates the UI.
 */
function checkScreenOrientation() {
  const rotateScreen = document.getElementById("rotate-screen");
  const mobileControls = document.getElementById("mobile-controls");

  if (!rotateScreen || !mobileControls) {
    return;
  }

  if (!isMobileDevice()) {
    hideRotateScreen(rotateScreen);
    return;
  }

  updateOrientationScreen(rotateScreen);
  updateMobileControlsVisibility(mobileControls);
}

/**
 * Shows or hides the rotate screen.
 *
 * Phones require landscape orientation.
 * Tablets can be used in both orientations.
 *
 * @param {HTMLElement} rotateScreen - The rotate screen element.
 */
function updateOrientationScreen(rotateScreen) {
  const isPhone = isPhoneDevice();

  if (isPhone && window.innerHeight > window.innerWidth) {
    rotateScreen.classList.remove("d-none");
    return;
  }

  hideRotateScreen(rotateScreen);
}

/**
 * Hides the rotate screen.
 *
 * @param {HTMLElement} rotateScreen - The rotate screen element.
 */
function hideRotateScreen(rotateScreen) {
  rotateScreen.classList.add("d-none");
}

/**
 * Checks whether the current device is a phone.
 *
 * @returns {boolean} True if the device is a phone.
 */
function isPhoneDevice() {
  return /iPhone|iPod|Android.*Mobile|Windows Phone|Pixel /i.test(
    navigator.userAgent,
  );
}

/**
 * Updates the visibility of the mobile controls.
 *
 * Controls are only visible while the actual game is active.
 *
 * @param {HTMLElement} mobileControls - The mobile controls container.
 */
function updateMobileControlsVisibility(mobileControls) {
  const canvas = document.getElementById("canvas");
  const shopScreen = document.getElementById("shop-screen");
  const pauseScreen = document.getElementById("pause-screen");
  const startScreen = document.querySelector(".start-screen");

  if (!isMobileDevice()) {
    mobileControls.classList.remove("active");
    return;
  }

  if (!canvas || canvas.style.display !== "block") {
    mobileControls.classList.remove("active");
    return;
  }

  if (startScreen && !startScreen.classList.contains("d-none")) {
    mobileControls.classList.remove("active");
    return;
  }

  if (shopScreen && !shopScreen.classList.contains("d-none")) {
    mobileControls.classList.remove("active");
    return;
  }

  if (pauseScreen && !pauseScreen.classList.contains("d-none")) {
    mobileControls.classList.remove("active");
    return;
  }

  mobileControls.classList.add("active");
}

/**
 * Initializes all mobile game controls.
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

  updateMobileControlsVisibility(mobileControls);
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
 * Sets up a mobile menu button.
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

    const mobileControls = document.getElementById("mobile-controls");

    if (mobileControls) {
      updateMobileControlsVisibility(mobileControls);
    }
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

/**
 * Updates mobile controls after entering or leaving fullscreen.
 */
function handleFullscreenChange() {
  checkScreenOrientation();

  const mobileControls = document.getElementById("mobile-controls");

  if (mobileControls) {
    updateMobileControlsVisibility(mobileControls);
  }
}

window.addEventListener("load", checkScreenOrientation);
window.addEventListener("load", setupMobileControls);

window.addEventListener("resize", checkScreenOrientation);
window.addEventListener("orientationchange", handleOrientationChange);

document.addEventListener("fullscreenchange", handleFullscreenChange);
