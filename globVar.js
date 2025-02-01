export const globVar = {
  // Environment
  currentEnv: "",
  
  currentEnvHandler: function (newEnv) {
    this.currentEnv = newEnv;
    document.dispatchEvent(new CustomEvent('envChange', { detail: newEnv }));
  },

  gamePad: document.getElementById("gamePad"),

  optionBtn: document.getElementById("optionBtn"),

  homeBtn: document.getElementById("homeBtn"),

  touchArea: document.getElementById("touchArea"),

  // Action Button Variables
  actBtn1: document.getElementById("actBtn1"),
  actBtn2: document.getElementById("actBtn2"),
  actBtn3: document.getElementById("actBtn3"),

  // CANVAS
  canvas: document.getElementById("canvas"),
  ctx: canvas.getContext("2d"),
  canvasWidth: canvas.width = 615,
  canvasHeight: canvas.height = 346,
};
