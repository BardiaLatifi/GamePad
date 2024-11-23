const leftAnalogCanvas = document.getElementById("analog");
const leftAnalogCtx = leftAnalogCanvas.getContext("2d");

const analogRadius = 50; // Radius of the analog canvas
const stickRadius = 10; // Radius of the analog stick
let analogX = analogRadius;
let analogY = analogRadius;
let dragging = false;

leftAnalogCanvas.width = 2 * analogRadius;
leftAnalogCanvas.height = 2 * analogRadius;

function drawAnalogStick() {
    leftAnalogCtx.clearRect(0, 0, leftAnalogCanvas.width, leftAnalogCanvas.height);
    
    // Draw the outer circle (analog boundary)
    leftAnalogCtx.beginPath();
    leftAnalogCtx.arc(analogRadius, analogRadius, analogRadius, 0, 2 * Math.PI);
    leftAnalogCtx.strokeStyle = 'black';
    leftAnalogCtx.lineWidth = 2;
    leftAnalogCtx.stroke();
    
    // Draw the inner circle (analog stick)
    leftAnalogCtx.beginPath();
    leftAnalogCtx.arc(analogX, analogY, stickRadius, 0, 2 * Math.PI);
    leftAnalogCtx.fillStyle = 'black';
    leftAnalogCtx.fill();
}

leftAnalogCanvas.addEventListener('mousedown', startDrag);
leftAnalogCanvas.addEventListener('mousemove', drag);
leftAnalogCanvas.addEventListener('mouseup', stopDrag);
leftAnalogCanvas.addEventListener('mouseleave', stopDrag);
leftAnalogCanvas.addEventListener('touchstart', startDrag);
leftAnalogCanvas.addEventListener('touchmove', drag);
leftAnalogCanvas.addEventListener('touchend', stopDrag);

function startDrag(event) {
    dragging = true;
    drag(event); // Immediately update the position
}

function drag(event) {
    if (dragging) {
        event.preventDefault();
        const rect = leftAnalogCanvas.getBoundingClientRect();
        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;

        // Correctly center the stick under the cursor
        analogX = clientX - rect.left;
        analogY = clientY - rect.top;

        // Ensure the stick stays within the outer circle
        const dx = analogX - analogRadius;
        const dy = analogY - analogRadius;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > analogRadius) {
            const angle = Math.atan2(dy, dx);
            analogX = analogRadius + analogRadius * Math.cos(angle);
            analogY = analogRadius + analogRadius * Math.sin(angle);
        }

        drawAnalogStick();
    }
}

function stopDrag(event) {
    dragging = false;
    // Reset the analog stick to the center
    analogX = analogRadius;
    analogY = analogRadius;
    drawAnalogStick();
}

drawAnalogStick();
