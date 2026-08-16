function openSettings() {
  document.querySelector(".start-screen").classList.add("d-none");
  document.getElementById("setting-screen").classList.remove("d-none");
}

function closeSettings() {
  document.getElementById("setting-screen").classList.add("d-none");
  document.querySelector(".start-screen").classList.remove("d-none");

  soundManager.playMusic();
}

function openControls() {
  document.querySelector(".start-screen").classList.add("d-none");
  document.getElementById("controls-screen").classList.remove("d-none");
}

function closeControls() {
  document.getElementById("controls-screen").classList.add("d-none");
  document.querySelector(".start-screen").classList.remove("d-none");

  soundManager.playMusic();
}

function openImpressum() {
  document.querySelector(".start-screen").classList.add("d-none");
  document.getElementById("impressum-screen").classList.remove("d-none");
}

function closeImpressum() {
  document.getElementById("impressum-screen").classList.add("d-none");
  document.querySelector(".start-screen").classList.remove("d-none");

  soundManager.playMusic();
}
