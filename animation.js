
export function animateSpriteSheet(canvasId, spriteSheetSrc, spriteWidth, spriteHeight, frameCount, fps, x, y) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const spriteSheet = new Image();
    let currentFrame = 0;
    let lastFrameTime = 0;

    spriteSheet.src = spriteSheetSrc;

    spriteSheet.onload = function() {
        const totalFrames = Math.floor(frameCount) || 1;

        function drawFrame () {
            const now = Date.now();
            const deltaTime = now - lastFrameTime;

            if (deltaTime > 1000 / fps) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Calculate current frame based on time
                currentFrame = (currentFrame + 1) % totalFrames;

                // Draw the current frame
                ctx.drawImage(spriteSheet, sx, 0 ,spriteWidth, spriteHeight, x, y, spriteWidth, spriteHeight);
                
                lastFrameTime = now;
            }
            requestAnimationFrame(drawFrame); // Keep animating
        }

        drawFrame(); // Start the animation
    };
};

export function animateImages(canvasId, frameSources, frameDurations, callBack) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const frames = [];
    let currentFrame = 0;
    let lastFrameTime = 0;

    // Load Images
    let loadedFrames = 0;
    frameSources.forEach((src, index) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            frames[index] = img; // Store the loaded image
            loadedFrames++;
            // Start animation once all frames are loaded
            if (loadedFrames === frameSources.length) {
                requestAnimationFrame(drawFrame);
            }
        };
    });

    function drawFrame() {
        const now = Date.now();
        const deltaTime = now - lastFrameTime;

        // Check if the current frame has reached its duration
        if (deltaTime > frameDurations[currentFrame]) {
            ctx.drawImage(frames[currentFrame], 0, 0, canvas.width, canvas.height);
            // Move to the next frame
            currentFrame++;

            // Check if we have displayed all frames
            if (currentFrame < frames.length) {
                lastFrameTime = now; // Update the lastFrameTime only if we have more frames to show
                console.log(`Current frame is: ${currentFrame}`); // Should log 0-based index
            } else {
                // Animation complete, call callBack if provided
                if (callBack) {
                    callBack();
                }
                return; // Stop the animation
            }
        }

        requestAnimationFrame(drawFrame); // Continue animating if there are more frames
    }
}
