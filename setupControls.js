// Import required modules
import { globVar } from "./globVar.js";
import { player } from "./controllerTest.js";

export const movement = { up: false, right: false, down: false, left: false };

const handleMovement = (direction, state) => {
  movement[direction] = state;
};


export function setupControls() {
  const touchArea = document.getElementById('touchArea');
  const coordinatesDisplay = document.getElementById('coordinates');
  let isInside = false;

  // Touch Area Handling
  function handleTouchArea(e) {
    // Only handle first touch in the touch area
    const touch = e.touches[0];
    const rect = touchArea.getBoundingClientRect();
    
    // Check if touch started within the touch area
    const isTouchInArea = e.target === touchArea;
    
    const xRelative = Math.round(touch.clientX - rect.left);
    const yRelative = Math.round(touch.clientY - rect.top);
    
    if (isTouchInArea) {
      coordinatesDisplay.textContent = `Touch at: ${xRelative}, ${yRelative}`;
      isInside = true;
      e.preventDefault(); // Prevent scrolling
    }
  }

  function handleTouchMove(e) {
    if (isInside) {
      const touch = e.touches[0];
      const rect = touchArea.getBoundingClientRect();
      const xRelative = Math.round(touch.clientX - rect.left);
      const yRelative = Math.round(touch.clientY - rect.top);
      
      coordinatesDisplay.textContent = `Touch at: ${xRelative}, ${yRelative}`;
      e.preventDefault();
    }
  }

  function handleTouchEnd() {
    if (isInside) {
      coordinatesDisplay.textContent = 'Exited';
      isInside = false;
    }
  }


  function handleActionButton(e) {
    const button = e.target.closest('.action-button');
    if (!button) return;
  
    // Add visual feedback
    button.classList.add('active');
    
    switch(button.id) {
      case 'actBtn1':
        player.src = "./assets/act1.png";
        break;
      case 'actBtn2':
        player.src = "./assets/act2.png";
        break;
      case 'actBtn3':
        player.src = "./assets/act3.png";
        break;
    }
    e.preventDefault();
  }
  function resetButtonStyle(e) {
    const button = e.target.closest('.action-button');
    if (button) button.classList.remove('active');
    e.preventDefault();
  }

  // For touch area
  touchArea.addEventListener('touchstart', handleTouchArea);
  touchArea.addEventListener('touchmove', handleTouchMove);
  touchArea.addEventListener('touchend', handleTouchEnd);
  touchArea.addEventListener('touchcancel', handleTouchEnd);

// Update event listeners for buttons
[globVar.actBtn1, globVar.actBtn2, globVar.actBtn3].forEach(button => {
  button.addEventListener('touchstart', handleActionButton);
  button.addEventListener('touchend', resetButtonStyle);
  button.addEventListener('touchcancel', resetButtonStyle);
});
}