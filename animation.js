
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

export function animateImages(canvasId, frameSources, frameDurations, callback) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    
    let currentFrame = 0;

    function renderFrame() {
      if (currentFrame < frameSources.length) {
        const img = new Image();
        img.src = frameSources[currentFrame];
        
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          
          // Set timeout for the next frame
          setTimeout(() => {
            currentFrame++;
            renderFrame();
          }, frameDurations[currentFrame]);
          console.log(`current frame: ${currentFrame + 1}`);
        };
      } else {
        // If we have rendered all frames, call the callback
        callback();
      }
    }
    renderFrame();
  }
