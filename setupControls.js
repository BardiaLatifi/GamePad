// Import required modules
import { globVar } from "./globVar.js";
import { player } from "./controllerTest.js";

export const movement = { up: false, right: false, down: false, left: false };

const handleMovement = (direction, state) => {
  movement[direction] = state;
};


export function setupControls() {
  const touchArea = document.getElementById("touchArea");
  const coordinatesDisplay = document.getElementById("coordinates");
  const directionText = document.getElementById("directionText")

  let xRelative = 0;
  let yRelative = 0;

  let isInside = false;

  // ---------------------------
  // TOUCH AREA
  // ---------------------------
  function handleTouchArea(e) {
    // Only handle first touch in the touch area
    const touch = e.touches[0];
    const rect = touchArea.getBoundingClientRect();
    
    // Check if touch started within the touch area
    const isTouchInArea = e.target === touchArea;
    
    xRelative = Math.round(touch.clientX - rect.left);
    yRelative = Math.round(touch.clientY - rect.top);
    
    if (isTouchInArea) {
      coordinatesDisplay.textContent = `Touch at: ${xRelative}, ${yRelative}`;
      isInside = true;
      e.preventDefault(); // Prevent scrolling
    }
  }

  function handleTouchMove(e) {
    if (isInside) {
      const touch = e.touches[0];
      const rect = touchArea.getBoundingClientRect();
      xRelative = Math.round(touch.clientX - rect.left);
      yRelative = Math.round(touch.clientY - rect.top);
  
      // Calculate thresholds based on actual div size
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
  
      // Update movement states
      handleMovement("right", xRelative > centerX + 20);  // 10px dead zone
      handleMovement("left", xRelative < centerX - 20);
      handleMovement("down", yRelative > centerY + 30);
      handleMovement("up", yRelative < centerY - 30);
  
      // Optional: Update direction text
      directionText.textContent = [
        movement.up ? "up" : "",
        movement.down ? "down" : "",
        movement.left ? "left" : "",
        movement.right ? "right" : ""
      ].filter(Boolean).join("+") || "neutral";
  
      coordinatesDisplay.textContent = `Touch at: ${xRelative}, ${yRelative}`;
      e.preventDefault();
    }
  }
  
  function handleTouchEnd() {
    if (isInside) {
      coordinatesDisplay.textContent = "Exited";
      // Reset all movement states
      Object.keys(movement).forEach(direction => {
        handleMovement(direction, false);
      });
      directionText.textContent = "neutral";
      isInside = false;
    }
  }

  touchArea.addEventListener("touchstart", handleTouchArea);
  touchArea.addEventListener("touchmove", handleTouchMove);
  touchArea.addEventListener("touchend", handleTouchEnd);
  touchArea.addEventListener("touchcancel", handleTouchEnd);

  // ---------------------------
  // BUTTONS
  // ---------------------------

  class ButtonHandler {
    constructor() {
      this.actions = { A: null, B: null, C: null };
    }
  
    onButtonPress(button, callback) {
      this.actions[button] = callback;
    }
  
    handleButtonPress(button) {
      if (this.actions[button]) this.actions[button]();
    }
  }
  
  const buttons = new ButtonHandler();

    // Set up actions for each button
  buttons.onButtonPress("A", () => {
    if (globVar.currentEnv === "in-game") player.src = "./assets/act1.png";
  });

  buttons.onButtonPress("B", () => {
    if (globVar.currentEnv === "main-menu") console.log("ACCEPT");
    if (globVar.currentEnv === "in-game") player.src = "./assets/act2.png";
  });

  buttons.onButtonPress("C", () => {
    if (globVar.currentEnv === "main-menu") console.log("BACK");
    if (globVar.currentEnv === "in-game") player.src = "./assets/act3.png";
  });

  globVar.actBtn1.addEventListener("touchstart", () => buttons.handleButtonPress("A"));
  globVar.actBtn1.addEventListener("mousedown", () => buttons.handleButtonPress("A"));
  globVar.actBtn2.addEventListener("touchstart", () => buttons.handleButtonPress("B"));
  globVar.actBtn2.addEventListener("mousedown", () => buttons.handleButtonPress("B"));
  globVar.actBtn3.addEventListener("touchstart", () => buttons.handleButtonPress("C"));
  globVar.actBtn3.addEventListener("mousedown", () => buttons.handleButtonPress("C"));
}

