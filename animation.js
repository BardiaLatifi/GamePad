export function animateSpriteSheet(canvasId, spriteSheetSrc, totalFrames, fps, x, y) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const spriteSheet = new Image();
  let lastFrameTime = 0;
  let currentFrame = 0; // Initially set to the first frame

  spriteSheet.src = spriteSheetSrc;

  spriteSheet.onload = function() {
      const frameWidth = 640;  // Width of each frame
      const frameHeight = 360; // Height of each frame

      function drawFrame() {
          const now = Date.now();
          const deltaTime = now - lastFrameTime;

          if (deltaTime > 1000 / fps) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);

              // Calculate the source x position based on the current frame
              const sx = frameWidth * currentFrame;

              // Draw the current frame
              ctx.drawImage(spriteSheet, sx, 0, frameWidth, frameHeight, x, y, frameWidth, frameHeight);

              // Update frame index for the next iteration
              currentFrame = (currentFrame + 1) % totalFrames; // Loop back to first frame if needed
              lastFrameTime = now;
          }
          requestAnimationFrame(drawFrame); // Repeat the animation
      }

      drawFrame(); // Start the animation
  };
}



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

export function blinkingFade(canvasId, src, speed, minAlpha, maxAlpha) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const image = new Image();
  
  image.src = src;
  image.onload = () => {
    requestAnimationFrame(animate);
  };

  let alpha = minAlpha;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.globalAlpha = alpha; // Set the global alpha for transparency
    ctx.drawImage(image, 0, 0); // Draw the image
    alpha += speed; // Adjust the alpha value

    // Check if the alpha is beyond the max or min thresholds
    if (alpha >= maxAlpha || alpha <= minAlpha) {
      speed = -speed; // Reverse the speed to create a blinking effect
    }

    requestAnimationFrame(animate); // Continue the animation loop
  }
}
