export class FadeAnimator {
  constructor(canvas, image) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.image = image;
    this.opacity = 0;
    this.isAnimating = false;
    this.lastTime = 0;
  }

  // Main animation loop
  animate(timestamp) {
    if (!this.isAnimating) return;

    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.draw();

    requestAnimationFrame((ts) => this.animate(ts));
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalAlpha = this.opacity;
    this.ctx.drawImage(
      this.image,
      0, 0, this.image.width, this.image.height,
      0, 0, this.canvas.width, this.canvas.height
    );
    this.ctx.globalAlpha = 1;
  }

  startFade(direction, onComplete) {
    this.direction = direction;
    this.isAnimating = true;
    this.lastTime = performance.now();
    this.onComplete = onComplete;
    this.animate(performance.now());
  }

  update(deltaTime) {
    const speed = 0.0008;
    this.opacity += this.direction * speed * deltaTime;
    this.opacity = Math.max(0, Math.min(1, this.opacity));

    if ((this.direction === 1 && this.opacity >= 1) ||
      (this.direction === -1 && this.opacity <= 0)) {
      this.isAnimating = false;
      if (this.onComplete) this.onComplete();
    }
  }


}

export class SpriteAnimator {
  constructor(canvasId, spriteSheetSrc, totalFrames, fps) {
    // Fixed canvas dimensions and position
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 640;
    this.canvas.height = 360;

    // Sprite configuration
    this.spriteSheet = new Image();
    this.spriteSheet.src = spriteSheetSrc;
    this.totalFrames = totalFrames;
    this.fps = fps;

    // Animation state
    this.currentFrame = 0;
    this.lastFrameTime = 0;
    this.animationId = null;
    this.isLoaded = false;

    // Fade effects
    this.fadeOpacity = 0;
    this.fadeDuration = 1000; // ms
    this.isFading = false;

    this.spriteSheet.onload = () => {
      this.isLoaded = true;
      this.frameWidth = this.spriteSheet.width / this.totalFrames;
      this.frameHeight = this.spriteSheet.height;
    };
  }

  // Unified draw method with fade support
  #draw() {
    if (!this.isLoaded) return;

    const now = Date.now();
    const deltaTime = now - this.lastFrameTime;

    // Clear entire canvas (fixed size)
    this.ctx.clearRect(0, 0, 640, 360);

    // Apply current fade opacity
    this.ctx.globalAlpha = this.fadeOpacity;

    // Draw current frame
    this.ctx.drawImage(
      this.spriteSheet,
      this.currentFrame * this.frameWidth,
      0,
      this.frameWidth,
      this.frameHeight,
      0,  // Fixed X position
      0,  // Fixed Y position
      640,
      360
    );

    // Reset alpha for other elements
    this.ctx.globalAlpha = 1.0;

    // Frame progression
    if (deltaTime > 1000 / this.fps) {
      this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
      this.lastFrameTime = now;
    }

    this.animationId = requestAnimationFrame(() => this.#draw());
  }

  // Fade animation methods
  async #fade(targetOpacity) {
    const startOpacity = this.fadeOpacity;
    const startTime = Date.now();

    return new Promise((resolve) => {
      const animate = () => {
        const progress = (Date.now() - startTime) / this.fadeDuration;

        if (progress < 1) {
          this.fadeOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
          requestAnimationFrame(animate);
        } else {
          this.fadeOpacity = targetOpacity;
          resolve();
        }
      };

      animate();
    });
  }

  // Public control methods
  async fadeIn() {
    this.#draw();
    await this.#fade(1);
  }

  async fadeOut() {
    await this.#fade(0);
    this.stop();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.ctx.clearRect(0, 0, 640, 360);
      this.animationId = null;
    }
  }
}

export class BlinkingFadeAnimator {
  constructor() {
    this.isBlinking = false;
    this.startTime = 0;
    this.animationFrame = null;
    this.currentOpacity = 0;
    this.targetElement = null; // Track the target element

    // Configuration
    this.duration = 3000; // Full blink cycle duration
    this.maxOpacity = 1;
    this.minOpacity = 0.1; // Added minOpacity
    this.easing = this.easeInOutSine;
    this.fadeOutDuration = 500; // Duration for fading out to 0 opacity
  }

  // Easing functions
  easeInOutSine = (t) => Math.sin(Math.PI * t);
  easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  start(targetElement, callback) {
    if (this.isBlinking) return;

    this.isBlinking = true;
    this.startTime = performance.now();
    this.targetElement = targetElement; // Store the target element

    const animate = (timestamp) => {
      if (!this.isBlinking) return;

      const elapsed = timestamp - this.startTime;
      const progress = (elapsed % this.duration) / this.duration;

      // Full blink cycle calculation
      const phase = progress < 0.5 ?
        progress * 2 :          // Fade in phase
        2 - (progress * 2);     // Fade out phase

      // Calculate opacity based on minOpacity and maxOpacity
      this.currentOpacity = this.minOpacity + (this.maxOpacity - this.minOpacity) * this.easing(phase);

      if (callback) {
        callback(this.currentOpacity);
      } else if (this.targetElement) {
        this.targetElement.style.opacity = this.currentOpacity;
      }

      this.animationFrame = requestAnimationFrame(animate);
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  stop(onComplete) {
    if (!this.isBlinking) return;

    this.isBlinking = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    // Smoothly fade out to 0 opacity
    const fadeOutStartTime = performance.now();
    const initialOpacity = this.currentOpacity;

    const fadeOut = (timestamp) => {
      const elapsed = timestamp - fadeOutStartTime;
      const progress = Math.min(elapsed / this.fadeOutDuration, 1);

      // Interpolate opacity from initialOpacity to 0
      this.currentOpacity = initialOpacity * (1 - progress);

      if (this.targetElement) {
        this.targetElement.style.opacity = this.currentOpacity;
      }

      if (progress < 1) {
        // Continue fading out
        requestAnimationFrame(fadeOut);
      } else {
        // Optional: Hide the element after fading out
        this.targetElement.style.display = "none";

        // Invoke the onComplete callback if provided
        if (onComplete && typeof onComplete === "function") {
          onComplete();
        }
      }
    };

    requestAnimationFrame(fadeOut);
  }
}