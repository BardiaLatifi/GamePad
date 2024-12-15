// Import required modules
import { globVar } from "./globVar.js";
import { mobileView } from "./mobileView.js";

mobileView(); // Initialize mobile view

// Asset Preloading
const assetsToLoad = [
  "./assets/x.png",
  "./assets/a.png",
  "./assets/b.png",
  "./assets/y.png",
  "./assets/player.jpg"
];

let assetsLoaded = 0;
const assets = {};

function preloadAssets() {
  assetsToLoad.forEach(asset => {
    const img = new Image();
    img.src = asset;
    img.onload = () => handleAssetLoad(asset);
    img.onerror = () => console.error(`Failed to load: ${asset}`);
  });
}

function handleAssetLoad(asset) {
  console.log(`Loaded: ${asset}`);
  assetsLoaded++;
  // Check if all assets are loaded
  if (assetsLoaded === assetsToLoad.length) {
    console.log('All assets loaded!');
    loadHandler();
  }
}

// Player Class
class Player {
  constructor(imageSrc, startPos) {
    this.width = 32;
    this.height = 32;
    this.x = startPos.x;
    this.y = startPos.y;
    this.image = new Image();
    this.image.src = imageSrc; // Load player image
    this.speed = 2;
    this.movement = { up: false, right: false, down: false, left: false };
  }

  update() {
    // Update player's position based on movement flags
    if (this.movement.up) this.y -= this.speed;
    if (this.movement.down) this.y += this.speed;
    if (this.movement.left) this.x -= this.speed;
    if (this.movement.right) this.x += this.speed;

    // Boundary checks
    this.x = Math.max(0, Math.min(globVar.canvasWidth - this.width, this.x));
    this.y = Math.max(0, Math.min(globVar.canvasHeight - this.height, this.y));
  }

  draw(ctx) {
    ctx.drawImage(this.image, Math.floor(this.x), Math.floor(this.y), this.width, this.height);
  }
}

// Game Class
class Game {
  constructor() {
    this.player = new Player("./assets/player.jpg", {
      x: globVar.canvasWidth / 2 - 16,
      y: globVar.canvasHeight / 2 - 16
    });
    this.isAnimating = false;
    this.setupControls();
  }

  setupControls() {
    // Movement flags
    this.player.movement = { up: false, right: false, down: false, left: false };

    // Function to handle movement state
    const handleMovement = (direction, state) => {
        this.player.movement[direction] = state;
    };

    // Up button functionality
    globVar.upBtn.addEventListener("pointerdown", () => handleMovement('up', true));
    globVar.upBtn.addEventListener("pointerup", () => handleMovement('up', false));
    globVar.upBtn.addEventListener("pointerout", () => handleMovement('up', false));

    // Down button functionality
    globVar.downBtn.addEventListener("pointerdown", () => handleMovement('down', true));
    globVar.downBtn.addEventListener("pointerup", () => handleMovement('down', false));
    globVar.downBtn.addEventListener("pointerout", () => handleMovement('down', false));

    // Left button functionality
    globVar.leftBtn.addEventListener("pointerdown", () => handleMovement('left', true));
    globVar.leftBtn.addEventListener("pointerup", () => handleMovement('left', false));
    globVar.leftBtn.addEventListener("pointerout", () => handleMovement('left', false));

    // Right button functionality
    globVar.rightBtn.addEventListener("pointerdown", () => handleMovement('right', true));
    globVar.rightBtn.addEventListener("pointerup", () => handleMovement('right', false));
    globVar.rightBtn.addEventListener("pointerout", () => handleMovement('right', false));

    // Button to change image sources using pointer events
    globVar.act1Btn.addEventListener("pointerdown", () => this.changePlayerImage("./assets/x.png"));
    globVar.act2Btn.addEventListener("pointerdown", () => this.changePlayerImage("./assets/a.png"));
    globVar.act3Btn.addEventListener("pointerdown", () => this.changePlayerImage("./assets/b.png"));
    globVar.act4Btn.addEventListener("pointerdown", () => this.changePlayerImage("./assets/y.png"));
}
  
  // Method to change player image
  changePlayerImage(imageSrc) {
    this.player.image.src = imageSrc;
  }
  

  startAnimation() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.update();
    }
  }

  update() {
    this.player.update();
    this.render();
    requestAnimationFrame(this.update.bind(this));
  }

  render() {
    globVar.ctx.clearRect(0, 0, globVar.canvasWidth, globVar.canvasHeight);
    this.player.draw(globVar.ctx);
  }
}

// Load Handler
function loadHandler() {
  const game = new Game(); // Instantiate the Game
  game.startAnimation(); // Start the animation loop
}

// Start the asset preloading
preloadAssets();
