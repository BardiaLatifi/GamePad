export const globVar = {
  // Environment
  currentEnv: "",
  
  currentEnvHandler: function (newEnv) {
    this.currentEnv = newEnv;
    document.dispatchEvent(new CustomEvent('envChange', { detail: newEnv }));
  },

  // Option Button Variablse
  rightOptionBtn: document.getElementById("plusBtn"),
  leftOptionBtn: document.getElementById("leftOptionBtn"),
  leftHomeBtn: document.getElementById("leftHomeBtn"),
  rightHomeBtn: document.getElementById("rightHomeBtn"),

  // Direction Button Variablse
  upBtn: document.getElementById("upBtn"),
  rightBtn: document.getElementById("rightBtn"),
  leftBtn: document.getElementById("leftBtn"),
  downBtn: document.getElementById("downBtn"),

  // Action Button Variablse
  act1Btn: document.getElementById("act1Btn"),
  act2Btn: document.getElementById("act2Btn"),
  act3Btn: document.getElementById("act3Btn"),
  act4Btn: document.getElementById("act4Btn"),

  // CANVAS
  canvas: document.getElementById("canvas"),
  ctx: canvas.getContext("2d"),
  canvasWidth: canvas.width = 615,
  canvasHeight: canvas.height = 346,
};
