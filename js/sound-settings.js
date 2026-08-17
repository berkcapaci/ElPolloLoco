/**
 * Initializes the music and effects volume controls.
 */
function setupVolumeControls() {
  const musicSlider = document.getElementById("music-volume");
  const effectsSlider = document.getElementById("effects-volume");
  const musicValue = document.getElementById("music-volume-value");
  const effectsValue = document.getElementById("effects-volume-value");
  if (!musicSlider || !effectsSlider || !musicValue || !effectsValue) {
    return;
  }
  loadSavedVolumes(musicSlider, effectsSlider, musicValue, effectsValue);
  setupMusicSlider(musicSlider, musicValue);
  setupEffectsSlider(effectsSlider, effectsValue);
}

/**
 * Loads the saved music and effects volume values from local storage.
 *
 * @param {HTMLInputElement} musicSlider - The music volume slider.
 * @param {HTMLInputElement} effectsSlider - The effects volume slider.
 * @param {HTMLElement} musicValue - The displayed music volume value.
 * @param {HTMLElement} effectsValue - The displayed effects volume value.
 */
function loadSavedVolumes(
  musicSlider,
  effectsSlider,
  musicValue,
  effectsValue,
) {
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
}

/**
 * Sets up the music volume slider and updates the music volume when changed.
 *
 * @param {HTMLInputElement} slider - The music volume slider.
 * @param {HTMLElement} valueDisplay - The displayed volume value.
 */
function setupMusicSlider(slider, valueDisplay) {
  slider.addEventListener("input", () => {
    const volume = Number(slider.value);
    valueDisplay.textContent = `${Math.round(volume * 100)}%`;
    soundManager.setMusicVolume(volume);
  });
}

/**
 * Sets up the effects volume slider and updates the effects volume when changed.
 *
 * @param {HTMLInputElement} slider - The effects volume slider.
 * @param {HTMLElement} valueDisplay - The displayed volume value.
 */
function setupEffectsSlider(slider, valueDisplay) {
  slider.addEventListener("input", () => {
    const volume = Number(slider.value);
    valueDisplay.textContent = `${Math.round(volume * 100)}%`;
    soundManager.setEffectsVolume(volume);
  });
}

/**
 * Initializes the mute button using the saved mute state.
 */
function setupMuteButton() {
  const muteButton = document.getElementById("mute-button");
  if (!muteButton) {
    return;
  }
  const savedMuteState = localStorage.getItem("isMuted");
  const isMuted = savedMuteState === "true";
  updateMuteButton(muteButton, isMuted);
}

/**
 * Updates the mute button icon according to the current mute state.
 *
 * @param {HTMLElement} button - The mute button.
 * @param {boolean} isMuted - Whether the sound is currently muted.
 */
function updateMuteButton(button, isMuted) {
  button.textContent = isMuted ? "🔇" : "🔊";
}

/**
 * Toggles the mute state and updates the mute button.
 */
function toggleMute() {
  const isMuted = soundManager.toggleMute();
  const muteButton = document.getElementById("mute-button");
  if (!muteButton) {
    return;
  }
  updateMuteButton(muteButton, isMuted);
}
