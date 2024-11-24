// script.js
const analogStick = document.getElementById('analog');
const consoleArea = document.getElementById('leftSide');

let isDragging = false;

// Start dragging
analogStick.addEventListener('mousedown', (e) => {
    isDragging = true;
    moveStick(e);
});

// End dragging
window.addEventListener('mouseup', () => {
    isDragging = false;
    resetStickPosition();
});

// Handle mouse movement
window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        moveStick(e);
    }
});

// Reset to center when mouse is up
function resetStickPosition() {
    // Reset the stick's transform to the center
    analogStick.style.transform = 'translate(-50%, -50%)'; // Reset to center

    // Optional: Reset the direction values array if needed
    directionValues = [0, 0, 0, 0]; // Reset direction values to zero
}

// Move the stick based on mouse position
function moveStick(e) {
    const rect = consoleArea.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX || e.touches[0].clientX;
    const mouseY = e.clientY || e.touches[0].clientY;

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const normalizedDistance = Math.min(distance / 7.5, 1) * 10;

    // Initialize the array for direction values
    let directionValues = [0.0, 0.0, 0.0, 0.0]; // [up, right, down, left]

    if (distance > 0) {
        // Calculate angle in radians (optional based on your logic)
        const angle = Math.atan2(deltaY, deltaX);

        // Determine the impact on each direction
        if (deltaY < 0) {
            directionValues[0] = parseFloat((normalizedDistance).toFixed(0)); // Up
        } else if (deltaY > 0) {
            directionValues[2] = parseFloat((normalizedDistance).toFixed(0)); // Down
        }
        
        if (deltaX > 0) {
            directionValues[1] = parseFloat((normalizedDistance).toFixed(0)); // Right
        } else if (deltaX < 0) {
            directionValues[3] = parseFloat((normalizedDistance).toFixed(0)); // Left
        }
    }

    const stickX = normalizedDistance * Math.cos(Math.atan2(deltaY, deltaX));
    const stickY = normalizedDistance * Math.sin(Math.atan2(deltaY, deltaX));
    
    analogStick.style.transform = `translate(-50%, -50%) translate(${stickX}px, ${stickY}px)`;

    // Log the direction values (now with floats)
    console.log('Direction Values:', directionValues);
}
