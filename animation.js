
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

export function animateImages(canvasId, frameSources, frameDurations) {
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

        if (deltaTime > frameDurations[currentFrame]) {
            ctx.drawImage(frames[currentFrame], 0, 0, canvas.width, canvas.height);

            // Move to the next frame
            currentFrame = (currentFrame + 1) % frames.length;

            lastFrameTime = now;
        }

        requestAnimationFrame(drawFrame); // Continue animating
    }
}