
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

export function animateImages(canvasId, loadedImages, frameDurations, callback) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    
    let currentFrame = 0;

    function renderFrame() {
      if (currentFrame < loadedImages.length) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(loadedImages[currentFrame], 0, 0);
        
        // Set timeout for the next frame
        setTimeout(() => {
          currentFrame++;
          renderFrame();
        }, frameDurations[currentFrame]);
      } else {
        // If we have rendered all frames, call the callback
        callback();
      }
    }

    renderFrame();
  }

  export function preloadImages(imageSources) {
    const promises = imageSources.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      });
    });
    
    return Promise.all(promises);
  }