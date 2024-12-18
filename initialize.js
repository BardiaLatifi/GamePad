import { globVar } from "./globVar.js";

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
document.addEventListener("DOMContentLoaded", () => {
  globVar.leftOptionBtn.addEventListener("click", () => {
    if (document.fullscreenElement) {
      exitFullScreen();
      globVar.currentEnvHandler("optimization");
    } else {
      enterFullScreen();
      globVar.currentEnvHandler("boot-screen");
    }
    removePopup();
    globVar.leftOptionBtn.classList.toggle("blinking");
  })
});
};

export function bootScreen() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const canvasWidth = canvas.width = 615;
  const canvasHeight = canvas.height = 346;

  const bootpic = new Image();

  bootpic.src = "./assets/boot/boot6.jpg";

  ctx.drawImage(bootpic, 0, 0, canvasWidth, canvasHeight);

  setTimeout(() => {
  bootpic.remove();
  globVar.currentEnv = "main-menu";
  }, 8100);
};
