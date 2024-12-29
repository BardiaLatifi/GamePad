import { globVar } from "./globVar.js";
import { animateSpriteSheet, animateImages, preloadImages } from "./animation.js";

export function mobileView() {
const portrait = window.matchMedia("(orientation: portrait)");

// Fullscreen functionality
function enterFullScreen() {
  const gamePad = document.getElementById("gamePad");
  if (gamePad.requestFullscreen) {
    gamePad.requestFullscreen();
  } else if (gamePad.webkitRequestFullscreen) { // Safari
    gamePad.webkitRequestFullscreen();
  } else if (gamePad.msRequestFullscreen) { // IE11
    gamePad.msRequestFullscreen();
  }
}

function exitFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

// Function to show a pop-up message
function showPopup(message) {
  const popup = document.createElement("div");
  popup.id = "popup";
  popup.style.position = "fixed";
  popup.style.width = "100%";
  popup.style.height = "350px";
  popup.style.top = "0";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, 0%)";
  popup.style.backgroundColor = "rgba(0, 0, 0)";
  popup.style.color = "white";
  popup.style.fontSize = "1.5rem";
  popup.style.fontWeight = "bold";
  popup.style.padding = "20px";
  popup.style.lineHeight = "80px";
  popup.innerText = message;
  document.body.appendChild(popup);
}

// Function to remove a pop-up message
function removePopup() {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.remove();
  }
}

// Function to handle orientation changes
function handleOrientationChange(e) {
  if (e.matches) {
     // Portrait
    showPopup(`Please rotate your phone
               and press the blinking button`);
    globVar.leftOptionBtn.disabled = true; // Disable fullscreen button
    exitFullScreen(); // Call exitFullScreen
    globVar.leftOptionBtn.classList.add("blinking");
  } else { 
    // Landscape
    removePopup();
    globVar.leftOptionBtn.disabled = false; // Enable fullscreen button
  }
}

// Initialize event listeners for orientation changes
portrait.addEventListener("change", handleOrientationChange);

// Initial check for orientation
handleOrientationChange(portrait);

let currentEnv = globVar.currentEnv;

// Run this when DOM is loaded
// Run this when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  globVar.leftOptionBtn.addEventListener("click", () => {
    // Log the current environment before the change

    if (document.fullscreenElement) {
      exitFullScreen();
      globVar.currentEnvHandler("optimization");
      globVar.ctx.clearRect(0, 0, globVar.canvasWidth, globVar.canvasHeight);
    } else {
      enterFullScreen();
      globVar.currentEnvHandler("boot-screen");
    }

    removePopup();
    globVar.leftOptionBtn.classList.toggle("blinking");
  });
});

};

export function bootScreen() {
  const canvasId = "canvas";
  const frameSources = [
    "./assets/boot/boot1.jpg",
    "./assets/boot/boot2.jpg",
    "./assets/boot/boot3.jpg",
    "./assets/boot/boot4.jpg",
    "./assets/boot/boot5.jpg",
    "./assets/boot/boot6.jpg",
    "./assets/boot/boot7.jpg",
    "./assets/boot/boot8.jpg",

  ];
  const frameDurations = [1200, 1200, 1200, 500, 500, 150, 2000];
  function clear() {
    // After fade out completes, change the environment and log completion
    setTimeout(() => {
      globVar.currentEnvHandler("main-menu");
      console.log("Animation completed");
      globVar.ctx.globalAlpha = 1;
    }, 600); // Match this timeout with the fade-out duration
  }

  // Preload images before starting the animation
  preloadImages(frameSources)
    .then(loadedImages => {
      animateImages(canvasId, loadedImages, frameDurations, clear, false, true);
    })
    .catch(error => {
      console.error("Error loading images:", error);
    });
}