// Import required modules
import { globVar } from "./globVar.js";
import { player } from "./controllerTest.js";

export const movement = { up: false, right: false, down: false, left: false };

const handleMovement = (direction, state) => {
  movement[direction] = state;
};

export function setupControls() {

      // Up button functionality
      globVar.upBtn.addEventListener("pointerdown", () => handleMovement('up', true));
      globVar.upBtn.addEventListener("pointerup", () => handleMovement('up', false));
      globVar.upBtn.addEventListener("pointerout", () => handleMovement('up', false));
  
      // Down button functionality
      globVar.downBtn.addEventListener("pointerdown", () => handleMovement('down', true));
      globVar.downBtn.addEventListener("pointerup", () => handleMovement('down', false));
      globVar.downBtn.addEventListener("pointerout", () => handleMovement('down', false));
  
      // Left button functionality
      globVar.leftBtn.addEventListener("pointerdown", () => handleMovement('left', true));
      globVar.leftBtn.addEventListener("pointerup", () => handleMovement('left', false));
      globVar.leftBtn.addEventListener("pointerout", () => handleMovement('left', false));
  
      // Right button functionality
      globVar.rightBtn.addEventListener("pointerdown", () => handleMovement('right', true));
      globVar.rightBtn.addEventListener("pointerup", () => handleMovement('right', false));
      globVar.rightBtn.addEventListener("pointerout", () => handleMovement('right', false));
  
      // Button to change image sources using pointer events
      globVar.act1Btn.addEventListener("pointerdown", () => player.src = "./assets/x.png");
      globVar.act2Btn.addEventListener("pointerdown", () => player.src = "./assets/a.png");
      globVar.act3Btn.addEventListener("pointerdown", () => player.src = "./assets/b.png");
      globVar.act4Btn.addEventListener("pointerdown", () => player.src = "./assets/y.png");

      // Option Buttons
}