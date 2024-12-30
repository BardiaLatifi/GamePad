import { globVar } from "./globVar.js";
import { setupControls, movement } from "./setupControls.js"
import { animateImages, animateSpriteSheet } from "./animation.j";
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

function drawBGImg() {
  
}

function pressStartBtn() {

}

function mainMenu() {


}