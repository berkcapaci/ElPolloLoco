/**
 * Opens the sound settings screen and hides the start screen.
 */
function openSettings() {
  document.querySelector(".start-screen").classList.add("d-none");
  document.getElementById("setting-screen").classList.remove("d-none");
}

/**
 * Closes the sound settings screen and returns to the start screen.
 */
function closeSettings() {
  document.getElementById("setting-screen").classList.add("d-none");
  document.querySelector(".start-screen").classList.remove("d-none");

  soundManager.playMusic();
}

/**
 * Opens the controls screen and hides the start screen.
 */
function openControls() {
  document.querySelector(".start-screen").classList.add("d-none");
  document.getElementById("controls-screen").classList.remove("d-none");
}

/**
 * Closes the controls screen and returns to the start screen.
 */
function closeControls() {
  document.getElementById("controls-screen").classList.add("d-none");
  document.querySelector(".start-screen").classList.remove("d-none");

  soundManager.playMusic();
}

/**
 * Opens the impressum screen and hides the start screen.
 */
function openImpressum() {
  document.querySelector(".start-screen").classList.add("d-none");
  document.getElementById("impressum-screen").classList.remove("d-none");
}

/**
 * Closes the impressum screen and returns to the start screen.
 */
function closeImpressum() {
  document.getElementById("impressum-screen").classList.add("d-none");
  document.querySelector(".start-screen").classList.remove("d-none");

  soundManager.playMusic();
}
