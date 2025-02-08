import { globVar } from "./globVar.js";
import { setupControls, movement } from "./setupControls.js"
import { SpriteAnimator } from "./animations.js";
import { preloadImages } from "./initialize.js";

const gameAnimation = new SpriteAnimator(
  'canvas', 
  './assets/initialize/green-bg-sheet.png',
  48,        // Total frames
  12,        // FPS
);





export function mainMenu() {
  // Start both animations
  gameAnimation.fadeIn();
  globVar.optionBtn.addEventListener("mousedown", () => {
    gameAnimation.fadeOut();
    
  });

}
