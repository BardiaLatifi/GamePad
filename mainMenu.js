import { globVar } from "./globVar.js";
import { setupControls, movement } from "./setupControls.js"
import { animateSpriteSheet, blinkingFade } from "./animation.js";
import { preloadImages } from "./initialize.js";

    
// Defining variables
let isAnimating = true;
let highlightedItem = "";
let selectedItem = "";
const bGImg = new Image();
bGImg.src = ""; // Default Background Image
bGImg.width = globVar.canvasWidth;
bGImg.height = globVar.canvasHeight;
const delay = 0;

setupControls();

export function drawBGImg() {
  const canvasId = "canvas";
  const spriteSheetSrc = "./assets/initialize/green-bg-sheet.png";
  const totalFrames = 48;
  const fps = 10;
  const x = 0;
  const y = 0;

  if (isAnimating) {
    animateSpriteSheet(canvasId, spriteSheetSrc, totalFrames, fps, x, y);
  }

}

export function pressOptionBtn() {
  //creation the second canvas
  const canvasCont = document.getElementById("canvasCont")
  const canvas2 = document.createElement("canvas");
  canvas2.id = "canvas2";
  canvasCont.appendChild(canvas2); 
  canvas2.width = globVar.canvasWidth;
  canvas2.height = globVar.canvasHeight;
  canvas2.style.position = "absolute";
  canvas2.style.left = "50%";
  canvas2.style.top = "50%";
  canvas2.style.transform = "translate(-50%, -50%)"; 

  const src = "./assets/initialize/Press-Button.png"
  const speed = 0.02;
  const min = 0.1;
  const max = 1;

  const optionBtn = function() {
    isAnimating = false;
    globVar.ctx.clearRect(0, 0, globVar.canvasWidth, globVar.canvasHeight);

    // Remove canvas2 if it's still present
    if (canvas2.parentNode) {
      canvas2.remove();
    }
    globVar.currentEnvHandler("in-game");
  }

  if (isAnimating) {
    blinkingFade(canvas2.id, src, speed, min, max);
  }

  globVar.optionBtn.addEventListener("click", optionBtn);
}

function mainMenu() {

}
