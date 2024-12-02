export const globVar = {

  // Analog Variables
  defaultPosition: {},
  dragObj: null,
  xOffset: 0,
  yOffset: 0,
  radius: 10, // example radius
  analogs: {
    direction: {
      dragObj: document.getElementById("directionAnalog"),
      baseID: "directionAnalogBase", // ensure you set this
      defaultPosition: {}
    },
    angle: {
      dragObj: document.getElementById("angleAnalog"),
      baseID: "angleAnalogBase", // ensure you set this
      defaultPosition: {}
    },
  },

  // Option Button Variablse
  plusBtn: document.getElementById("plusBtn"),
  minusBtn: document.getElementById("plusBtn"),
  homeBtn: document.getElementById("plusBtn"),
  screenShotBtn: document.getElementById("plusBtn"),

  // Direction Button Variablse
  upBtn: document.getElementById("upBtn"),
  rightBtn: document.getElementById("rightBtn"),
  leftBtn: document.getElementById("leftBtn"),
  downBtn: document.getElementById("downBtn"),

  // Action Button Variablse
  xBtn: document.getElementById("xBtn"),
  aBtn: document.getElementById("aBtn"),
  bBtn: document.getElementById("bBtn"),
  yBtn: document.getElementById("yBtn"),
};