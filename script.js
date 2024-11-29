// The draggable object
let dragObj = document.getElementById("analog");

// Defining the move limit of the analog
const radius = 20;

// Setting xOffset and yOffset to 0 to prevent jumping
let xOffset = 0;
let yOffset = 0;

// Default position (to be calculated)
let defaultPosition = { left: 0, top: 0 };

window.onload = function() {
  // Set the default position of the analog stick
  setDefaultPosition();

  dragObj.addEventListener("mousedown", startDrag, true);
  dragObj.addEventListener("touchstart", startDrag, true);
  document.onmouseup = stopDrag;
  document.ontouchend = stopDrag;
}

// Function to set the default position to the center of leftSide
function setDefaultPosition() {
  const analogBase = document.getElementById("analogBase");
  const analogBaseRect = analogBase.getBoundingClientRect();

  // Calculate center position based on leftSide dimensions
  defaultPosition.left = leftSideRect.left + leftSideRect.width / 2 - 25;
  defaultPosition.top = leftSideRect.top + leftSideRect.height / 2 - 25;

  // Apply default position
  dragObj.style.position = "absolute";
  dragObj.style.left = defaultPosition.left + "px";
  dragObj.style.top = defaultPosition.top + "px";
}

function startDrag(e) {
  e.preventDefault();
  e.stopPropagation();
  dragObj = e.target;
  const analogRect = dragObj.getBoundingClientRect();

  if (e.type === "mousedown") {
    xOffset = e.clientX - analogRect.left;
    yOffset = e.clientY - analogRect.top;
    window.addEventListener("mousemove", dragObject, true);
  } else if (e.type === "touchstart") {
    xOffset = e.targetTouches[0].clientX - analogRect.left;
    yOffset = e.targetTouches[0].clientY - analogRect.top;
    window.addEventListener("touchmove", dragObject, true);
  }
}

function dragObject(e) {
  e.preventDefault();
  e.stopPropagation();

  if (!dragObj) return;

  let clientX, clientY;
  if (e.type === "mousemove") {
    clientX = e.clientX;
    clientY = e.clientY;
  } else if (e.type === "touchmove") {
    clientX = e.targetTouches[0].clientX;
    clientY = e.targetTouches[0].clientY;
  }

  // Calculate new position
  let newLeft = clientX - xOffset;
  let newTop = clientY - yOffset;

  // Calculate distance from default position
  const centerX = defaultPosition.left; // Center X of the circular boundary (half width)
  const centerY = defaultPosition.top; // Center Y of the circular boundary (half height)
      
  const dx = newLeft - centerX;
  const dy = newTop - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Check if distance exceeds radius
  if (distance > radius) {
      const angle = Math.atan2(dy, dx); // Calculate angle
      newLeft = centerX + Math.cos(angle) * radius; // Adjust newLeft based on angle and radius
      newTop = centerY + Math.sin(angle) * radius; // Adjust newTop based on angle and radius
  }

  // Update the position of the drag object with constraints
  dragObj.style.left = newLeft + 'px';
  dragObj.style.top = newTop + 'px';

  console.log(newLeft);
  console.log(newTop);
}

function stopDrag(e) {
  if (dragObj) {
    // Reset to default position, which is in the center of leftSide
    setDefaultPosition();
    dragObj = null;
    window.removeEventListener("mousemove", dragObject, true);
    window.removeEventListener("touchmove", dragObject, true);
  }
}

/* Test */

// Make the view fullscreen after screen rotaion on mobile devices
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
    gamePad.classList.add("fullscreen");
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    gamePad.classList.remove("fullscreen");
  };

  window.addEventListener("orientationchange", () => {
    if (window.orientation === 90 || window.orientation === -90) {
      enterFullScreen();
    } else {
      exitFullScreen();
    }
  });
});