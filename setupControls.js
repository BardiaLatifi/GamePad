// Import required modules
import { globVar } from "./globVar.js";
import { player } from "./controllerTest.js";

export const movement = { up: false, right: false, down: false, left: false };

const handleMovement = (direction, state) => {
  movement[direction] = state;
};

export function setupControls() {

      // Button to change image sources using pointer events
      globVar.actBtn1.addEventListener("pointerdown", () => player.src = "./assets/act1.png");
      globVar.actBtn2.addEventListener("pointerdown", () => player.src = "./assets/act2.png");
      globVar.actBtn3.addEventListener("pointerdown", () => player.src = "./assets/act3.png");
}