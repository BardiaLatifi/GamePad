import { globVar } from "./globVar.js";
import { FadeAnimator } from "./animations.js";

export function mobileView() {
  const portrait = window.matchMedia("(orientation: portrait)");

  const popup = document.getElementById("popup");
  const fullScreenBtn = document.getElementById("fullScreenBtn");
  const turnGif = document.getElementById("turnGif");

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

  // Function to handle orientation changes
  function handleOrientationChange(e) {
    if (e.matches) {
      // Portrait
      exitFullScreen(); // Call exitFullScreen
      turnGif.style.display = "block";
      fullScreenBtn.style.display = "none";
    } else {
      // Landscape
      turnGif.style.display = "none";
      fullScreenBtn.style.display = "block";
    }
  }

  // Initialize event listeners for orientation changes
  portrait.addEventListener("change", handleOrientationChange);


  let holdTimeout = null;
  let isHolding = false;

  function handleHoldStart() {
    if (isHolding) return;
    isHolding = true;

    // Visual feedback
    globVar.homeBtn.classList.add("holding");

    holdTimeout = setTimeout(() => {
      if (document.fullscreenElement) {
        exitFullScreen();
      } else {
        enterFullScreen();
      }
      resetHoldState();
    }, 1500);
  }

  function handleHoldEnd() {
    if (!isHolding) return;
    resetHoldState();
  }

  function resetHoldState() {
    clearTimeout(holdTimeout);
    isHolding = false;
    globVar.homeBtn.classList.remove("holding");
  }

  // Add event listeners
  globVar.homeBtn.addEventListener("touchstart", handleHoldStart);
  globVar.homeBtn.addEventListener("touchend", handleHoldEnd);
  globVar.homeBtn.addEventListener("touchcancel", handleHoldEnd);


  // Initial check for orientation
  handleOrientationChange(portrait);


  // Run this when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    fullScreenBtn.addEventListener("click", () => {

      popup.style.display = "none";
      globVar.gamePad.style.display = "grid";
      // Log the current environment before the change

      if (document.fullscreenElement) {
        exitFullScreen();
        globVar.currentEnvHandler("optimization");
        globVar.ctx.clearRect(0, 0, globVar.canvasWidth, globVar.canvasHeight);
      } else {
        enterFullScreen();
        globVar.currentEnvHandler("boot-screen");
      }
    });
  });

};

export function preloadImages(imageSources) {
  const promises = imageSources.map(src => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    });
  });

  return Promise.all(promises);
}

export function bootScreen() {
  const canvas = document.getElementById('canvas');
  const img = new Image();
  img.src = './assets/initialize/boot7.jpg';

  img.onload = () => {
    const animator = new FadeAnimator(canvas, img);

    animator.startFade(1, () => {
      setTimeout(() => {
        animator.startFade(-1, () => {
          globVar.currentEnvHandler("main-menu");
        });
      }, 3000);
    });
  };
}