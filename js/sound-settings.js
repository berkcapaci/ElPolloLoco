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

function setupMusicSlider(slider, valueDisplay) {
  slider.addEventListener("input", () => {
    const volume = Number(slider.value);
    valueDisplay.textContent = `${Math.round(volume * 100)}%`;
    soundManager.setMusicVolume(volume);
  });
}

function setupEffectsSlider(slider, valueDisplay) {
  slider.addEventListener("input", () => {
    const volume = Number(slider.value);
    valueDisplay.textContent = `${Math.round(volume * 100)}%`;
    soundManager.setEffectsVolume(volume);
  });
}

function setupMuteButton() {
  const muteButton = document.getElementById("mute-button");
  if (!muteButton) {
    return;
  }
  const savedMuteState = localStorage.getItem("isMuted");
  const isMuted = savedMuteState === "true";
  updateMuteButton(muteButton, isMuted);
}

function updateMuteButton(button, isMuted) {
  button.textContent = isMuted ? "🔇" : "🔊";
}

function toggleMute() {
  const isMuted = soundManager.toggleMute();
  const muteButton = document.getElementById("mute-button");
  if (!muteButton) {
    return;
  }
  updateMuteButton(muteButton, isMuted);
}