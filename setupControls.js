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
      handleMovement("right", xRelative > centerX + 10);  // 10px dead zone
      handleMovement("left", xRelative < centerX - 10);
      handleMovement("down", yRelative > centerY + 10);
      handleMovement("up", yRelative < centerY - 10);
  
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

  function handleActionButton(e) {
    const button = e.target.closest(".action-button");
    if (!button) return;
  
    // Add visual feedback
    button.classList.add("active");
    
    switch(button.id) {
      case "actBtn1":
        player.src = "./assets/act1.png";
        break;
      case "actBtn2":
        player.src = "./assets/act2.png";
        break;
      case "actBtn3":
        player.src = "./assets/act3.png";
        break;
    }
    e.preventDefault();
  }
  function resetButtonStyle(e) {
    const button = e.target.closest(".action-button");
    if (button) button.classList.remove("active");
    e.preventDefault();
  }

  touchArea.addEventListener("touchstart", handleTouchArea);
  touchArea.addEventListener("touchmove", handleTouchMove);
  touchArea.addEventListener("touchend", handleTouchEnd);
  touchArea.addEventListener("touchcancel", handleTouchEnd);

  // ---------------------------
  // BUTTONS
  // ---------------------------

  // Update event listeners for buttons
  [globVar.actBtn1, globVar.actBtn2, globVar.actBtn3].forEach(button => {
    button.addEventListener("touchstart", handleActionButton);
    button.addEventListener("touchend", resetButtonStyle);
    button.addEventListener("touchcancel", resetButtonStyle);
  });
}