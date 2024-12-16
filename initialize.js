import { globVar } from "./globVar.js";
import { environmentHandler } from "./Environments.js";

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

// Run this when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  globVar.leftOptionBtn.addEventListener("click", () => {
    if (document.fullscreenElement) {
      exitFullScreen();
      environmentHandler("optimization");
    } else {
      enterFullScreen();
      environmentHandler("boot-screen");
    }
    removePopup();
    globVar.leftOptionBtn.classList.toggle("blinking");
  })
});
};

export function bootScreen() {
  const canvasCont = document.getElementById("canvasCont");
  const canvas = document.getElementById("canvas");
  const bootGif = document.createElement("img");

  // Initially hide the canvas
  canvas.style.display = "none";

  // Set up the bootGif
  bootGif.src = "./assets/Boot.gif";
  bootGif.style.gridRow = "2";
  bootGif.style.margin = "auto auto";
  bootGif.style.width = "615";
  bootGif.style.height = "346";

  // Insert the bootGif into the gamePad
  canvasCont.children[0].insertAdjacentElement("afterend", bootGif);

  // Show bootGif for 8.1 seconds and then hide it
  setTimeout(() => {
  bootGif.remove();
  canvas.style.display = "block";
  }, 8100);
};
