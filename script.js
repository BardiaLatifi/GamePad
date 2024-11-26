// the draggable object
let dragObj = document.getElementById("analog");

// setting xOffset and yOffset to 0 to prevent jumping
let xOffset = 0;
let yOffset = 0;

// Default position (to be calculated)
let defaultPosition = { left: 0, top: 0 };

window.onload = function() {
  // Set the default position of the analog stick
  setDefaultPosition();

  document.getElementById("analog").addEventListener("mousedown", startDrag, true);
  document.getElementById("analog").addEventListener("touchstart", startDrag, true);
  document.onmouseup = stopDrag;
  document.ontouchend = stopDrag;
}

// Function to set the default position to the center of leftSide
function setDefaultPosition() {
  const leftSide = document.getElementById("leftSide");
  const leftSideRect = leftSide.getBoundingClientRect(); 

  // Calculate center position based on leftSide dimensions
  defaultPosition.left = leftSideRect.left + leftSideRect.width / 2 - 25; // 25 is half of analog div width
  defaultPosition.top = leftSideRect.top + leftSideRect.height / 2 - 25; // 25 is half of analog div height

  // Apply default position
  dragObj.style.position = "absolute";
  dragObj.style.left = defaultPosition.left + "px";
  dragObj.style.top = defaultPosition.top + "px";
}

function startDrag(e) {
  e.preventDefault();
  e.stopPropagation();
  dragObj = e.target;
  dragObj.style.position = "absolute";
  const rect = dragObj.getBoundingClientRect();

  if (e.type === "mousedown") {
    xOffset = e.clientX - rect.left;
    yOffset = e.clientY - rect.top;
    window.addEventListener('mousemove', dragObject, true);
  } else if (e.type === "touchstart") {
    xOffset = e.targetTouches[0].clientX - rect.left;
    yOffset = e.targetTouches[0].clientY - rect.top;
    window.addEventListener('touchmove', dragObject, true);
  }
}

function dragObject(e) {
  e.preventDefault();
  e.stopPropagation();

  if (!dragObj) return;

  if (e.type === "mousemove") {
    dragObj.style.left = e.clientX - xOffset + "px";
    dragObj.style.top = e.clientY - yOffset + "px";
  } else if (e.type === "touchmove") {
    dragObj.style.left = e.targetTouches[0].clientX - xOffset + "px";
    dragObj.style.top = e.targetTouches[0].clientY - yOffset + "px";
  }
}

function stopDrag(e) {
  if (dragObj) {
    // Reset to default position, which is in the center of leftSide
    setDefaultPosition();
    dragObj = null;
    window.removeEventListener('mousemove', dragObject, true);
    window.removeEventListener('touchmove', dragObject, true);
  }
}
