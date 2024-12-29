
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

export function animateImages(canvasId, loadedImages, frameDurations, callback, fadeIn = false, fadeOut = false) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  
  let currentFrame = 0;

  // Render Frame Logic
  function renderFrame() {
    if (currentFrame < loadedImages.length) {
      const currentImage = loadedImages[currentFrame];

      if (fadeIn && currentFrame === 0) {
        // If it's the first frame and fade in is enabled
        fadeInEffect(currentImage, frameDurations[currentFrame], () => {
          currentFrame++;
          renderFrame();
        });
      } else if (fadeOut && currentFrame === loadedImages.length - 1) {
        // If we're fading out the last image
        const previousImage = loadedImages[currentFrame - 1];
        fadeOutEffect(previousImage, frameDurations[currentFrame - 1], () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear after fade out
          ctx.drawImage(currentImage, 0, 0); // Draw the current image
          currentFrame++;
          renderFrame();
        });
      } else {
        ctx.drawImage(currentImage, 0, 0); // Draw image without fade
        setTimeout(() => {
          currentFrame++;
          renderFrame(); // Schedule the next frame
        }, frameDurations[currentFrame]);
      }
    } else {
      // If all frames are rendered, call the callback
      callback();
    }
  }

  // Fade In Effect
  function fadeInEffect(image, duration, onComplete) {
    let alpha = 0;
    ctx.globalAlpha = alpha; // Reset alpha for fade in
    
    const increment = 1 / (duration / 50); // Fade speed
    const fadeInterval = setInterval(() => {
      alpha += increment;

      if (alpha >= 1) {
        alpha = 1;
        clearInterval(fadeInterval);
        if (onComplete) onComplete();
      }

      ctx.globalAlpha = alpha;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear before drawing
      ctx.drawImage(image, 0, 0);
    }, 50);
  }

  // Fade Out Effect
  function fadeOutEffect(image, duration, onComplete) {
    let alpha = 1;
    
    const decrement = 1 / (duration / 50); // Fade speed
    const fadeInterval = setInterval(() => {
      alpha -= decrement;

      if (alpha <= 0) {
        alpha = 0;
        clearInterval(fadeInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear after fade out
        if (onComplete) onComplete();
      }

      ctx.globalAlpha = alpha;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear before drawing
      ctx.drawImage(image, 0, 0);
    }, 50);
  }

  renderFrame(); // Start rendering frames
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