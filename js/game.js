let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
  document.querySelector(".start-screen").classList.add("d-none");

  document.querySelector(".win-screen").classList.add("d-none");
  document.querySelector(".lose-screen").classList.add("d-none");

  document.getElementById("canvas").style.display = "block";

  init();
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function restartGame() {
  if (world) {
    world.stop();
  }

  keyboard = new Keyboard();

  document.querySelector(".win-screen").classList.add("d-none");
  document.querySelector(".lose-screen").classList.add("d-none");

  canvas = document.getElementById("canvas");

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  init();
}

window.addEventListener("keydown", (e) => {
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
