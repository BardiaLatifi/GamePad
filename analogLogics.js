import { globVar } from "./globVar.js";

export function initialize() {
  // Initialize both analog sticks
  setDefaultPosition(globVar.analogs.direction);
  setDefaultPosition(globVar.analogs.angle);

  // Set up event listeners for the direction analog
  globVar.analogs.direction.dragObj.addEventListener("mousedown", (e) => startDrag(e, globVar.analogs.direction), true);
  globVar.analogs.direction.dragObj.addEventListener("touchstart", (e) => startDrag(e, globVar.analogs.direction), true);

  // Set up event listeners for the angle analog
  globVar.analogs.angle.dragObj.addEventListener("mousedown", (e) => startDrag(e, globVar.analogs.angle), true);
  globVar.analogs.angle.dragObj.addEventListener("touchstart", (e) => startDrag(e, globVar.analogs.angle), true);
  
  document.onmouseup = stopDrag;
  document.ontouchend = stopDrag;
}

// Function to set the default position to the center of leftSide
function setDefaultPosition(analog) {
  const analogBase = document.getElementById(analog.baseID); // Adjusted to use `baseID`
  const analogBaseRect = analogBase.getBoundingClientRect();

  // Calculate center position based on base dimensions
  analog.defaultPosition.left = analogBaseRect.left + analogBaseRect.width / 2 - 25; // Adjust offset as necessary
  analog.defaultPosition.top = analogBaseRect.top + analogBaseRect.height / 2 - 25;

  // Apply default position
  analog.dragObj.style.position = "absolute";
  analog.dragObj.style.left = analog.defaultPosition.left + "px";
  analog.dragObj.style.top = analog.defaultPosition.top + "px";
}

function startDrag(e, analog) {
  e.preventDefault();
  e.stopPropagation();
  
  globVar.dragObj = analog.dragObj; // Set currently dragged object
  const analogRect = globVar.dragObj.getBoundingClientRect();
  
  // Calculate offsets based on event type
  if (e.type === "mousedown") {
    globVar.xOffset = e.clientX - analogRect.left;
    globVar.yOffset = e.clientY - analogRect.top;
    window.addEventListener("mousemove", (e) => dragObject(e, analog), true);
  } else if (e.type === "touchstart") {
    globVar.xOffset = e.targetTouches[0].clientX - analogRect.left;
    globVar.yOffset = e.targetTouches[0].clientY - analogRect.top;
    window.addEventListener("touchmove", (e) => dragObject(e, analog), true);
  }
}

function dragObject(e, analog) {
  e.preventDefault();
  e.stopPropagation();

  if (!globVar.dragObj) return;

  let clientX, clientY;
  if (e.type === "mousemove") {
    clientX = e.clientX;
    clientY = e.clientY;
  } else if (e.type === "touchmove") {
    clientX = e.targetTouches[0].clientX;
    clientY = e.targetTouches[0].clientY;
  }

  let newLeft = clientX - globVar.xOffset;
  let newTop = clientY - globVar.yOffset;

  const centerX = analog.defaultPosition.left; 
  const centerY = analog.defaultPosition.top; 
      
  const dx = newLeft - centerX;
  const dy = newTop - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance > globVar.radius) {
      const angle = Math.atan2(dy, dx);
      newLeft = centerX + Math.cos(angle) * globVar.radius;
      newTop = centerY + Math.sin(angle) * globVar.radius;
  }

  globVar.dragObj.style.left = newLeft + 'px';
  globVar.dragObj.style.top = newTop + 'px';

  console.log(newLeft, newTop);
}

function stopDrag(e) {
  if (globVar.dragObj) {
    const analog = Object.values(globVar.analogs).find(a => a.dragObj === globVar.dragObj);
    setDefaultPosition(analog);
    globVar.dragObj = null;
    window.removeEventListener("mousemove", dragObject, true);
    window.removeEventListener("touchmove", dragObject, true);
  }
}
