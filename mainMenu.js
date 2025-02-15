import { globVar } from "./globVar.js";
import { setupControls, movement } from "./setupControls.js"
import { SpriteAnimator, BlinkingFadeAnimator } from "./animations.js";
import { preloadImages } from "./initialize.js";

// Background for starting main menu
const greenBg = new SpriteAnimator(
  "canvas",
  "./assets/initialize/green-bg-sheet.png",
  48,        // Total frames
  12,        // FPS
);

// Blinking fade Press Option button
const popupImg = document.getElementById("popupImg");
const blinkAnimator = new BlinkingFadeAnimator();

export function mainMenu() {

  // green background sprite sheet animation
  greenBg.fadeIn();

  // Start blinking
  popupImg.style.display = "block";
  popupImg.src = "./assets/initialize/Press-Button.png"
  blinkAnimator.start(popupImg);

  globVar.optionBtn.addEventListener("click", () => {
    greenBg.fadeOut();
    // Stop blinking
    blinkAnimator.stop(
      setTimeout(() => {
        globVar.currentEnvHandler("in-game")
      }, 1500)
    );
  })

}
