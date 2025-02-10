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

    // Configuration
    this.duration = 5000; // Full blink cycle duration
    this.maxOpacity = 0.8;
    this.easing = this.easeInOutSine;
  }

  // Updated easing for full blink cycle
  easeInOutSine = (t) => Math.sin(Math.PI * t);
  easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  start(targetElement, callback) {
    if (this.isBlinking) return;

    this.isBlinking = true;
    this.startTime = performance.now();

    const animate = (timestamp) => {
      if (!this.isBlinking) return;

      const elapsed = timestamp - this.startTime;
      const progress = (elapsed % this.duration) / this.duration;

      // Full blink cycle calculation
      const phase = progress < 0.5 ?
        progress * 2 :          // Fade in phase
        2 - (progress * 2);     // Fade out phase

      this.currentOpacity = this.easing(phase) * this.maxOpacity;

      if (callback) {
        callback(this.currentOpacity);
      } else if (targetElement) {
        targetElement.style.opacity = this.currentOpacity;
      }

      this.animationFrame = requestAnimationFrame(animate);
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  stop() {
    this.isBlinking = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.currentOpacity = 0;

    if (this.targetElement) {
      this.targetElement.style.opacity = 0;
    }
  }
}

