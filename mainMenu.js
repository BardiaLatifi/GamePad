import { globVar } from "./globVar.js";
import { setupControls, movement } from "./setupControls.js"
import { animateImages, animateSpriteSheet } from "./animation.js";
import { preloadImages } from "./initialize.js";

    
// Defining variables
let isAnimating = false;
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
  const frameSources = [
    "./assets/bg/bg0.jpg",
    "./assets/bg/bg1.jpg",
    "./assets/bg/bg2.jpg",
    "./assets/bg/bg3.jpg",
    "./assets/bg/bg4.jpg",
    "./assets/bg/bg5.jpg",
    "./assets/bg/bg6.jpg",
    "./assets/bg/bg7.jpg",
    "./assets/bg/bg8.jpg",
    "./assets/bg/bg9.jpg",
    "./assets/bg/bg10.jpg"
  ];
  const frameDurations = [1000, 800, 800, 800, 800, 800, 800, 800, 800, 1000];
  function repeat(loadedImages) {
    animateImages(canvasId, loadedImages, frameDurations, () => repeat(loadedImages), false, false);
  }
    // Preload images before starting the animation
    preloadImages(frameSources)
    .then(loadedImages => {
     repeat(loadedImages); // Start the first animation cycle
    })
    .catch(error => {
      console.error("Error loading images:", error);
    });
}

function pressStartBtn() {
  const canvasId = "canvas";
  const frameSources = [
    "./assets/bg/bg0.jpg",
    "./assets/bg/bg1.jpg",
    "./assets/bg/bg2.jpg",
    "./assets/bg/bg3.jpg",
    "./assets/bg/bg4.jpg",
    "./assets/bg/bg5.jpg",
    "./assets/bg/bg6.jpg",
    "./assets/bg/bg7.jpg",
    "./assets/bg/bg8.jpg",
    "./assets/bg/bg9.jpg",
    "./assets/bg/bg10.jpg"
  ];
  const frameDurations = [1000, 800, 800, 800, 800, 800, 800, 800, 800, 1000];
  function repeat(loadedImages) {
    animateImages(canvasId, loadedImages, frameDurations, () => repeat(loadedImages), false, false);
  }
    // Preload images before starting the animation
    preloadImages(frameSources)
    .then(loadedImages => {
     repeat(loadedImages); // Start the first animation cycle
    })
    .catch(error => {
      console.error("Error loading images:", error);
    });
}

function mainMenu() {


}