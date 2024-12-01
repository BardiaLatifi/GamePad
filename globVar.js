export const globVar = {
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
};