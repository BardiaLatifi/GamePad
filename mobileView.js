const portrait = window.matchMedia("(orientation: portrait)");
const fullScreenBtn = document.getElementById("fullScreenBtn");

// Function to show a pop-up message
function showPopup(message) {
  const popup = document.createElement("div");
  popup.id = "popup";
  popup.style.position = "fixed";
  popup.style.top = "10%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  popup.style.color = "white";
  popup.style.fontSize = "2rem";
  popup.style.padding = "30px";
  popup.style.lineHeight = "60px";
  popup.style.borderRadius = "10px";
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
  if (e.matches) { // Portrait
    showPopup("Please rotate your phone and press the blinking button");
    fullScreenBtn.disabled = true; // Disable fullscreen button
    

  } else { // Landscape
    fullScreenBtn.disabled = false; // Enable fullscreen button
  }
}

// Initialize event listeners for orientation changes
portrait.addEventListener("change", handleOrientationChange);

// Fullscreen functionality
document.addEventListener("DOMContentLoaded", () => {
  const gamePad = document.getElementById("gamePad");

  const enterFullScreen = () => {
    if (gamePad.requestFullscreen) {
      gamePad.requestFullscreen();
    } else if (gamePad.webkitRequestFullscreen) { // Safari
      gamePad.webkitRequestFullscreen();
    } else if (gamePad.msRequestFullscreen) { // IE11
      gamePad.msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  fullScreenBtn.addEventListener("click", () => {
    if (document.fullscreenElement) {
      exitFullScreen();
    } else {
      enterFullScreen();
    }
    removePopup(); // Remove the popup when the fullscreen button is clicked
    fullScreenBtn.classList.toggle("blinking-red");
  });
});

// Initial check for orientation
handleOrientationChange(portrait);
