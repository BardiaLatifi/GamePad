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
  
    // Up button functionality
    globVar.upBtn.addEventListener("mousedown", () => this.player.movement.up = true);
    globVar.upBtn.addEventListener("mouseup", () => this.player.movement.up = false);
    globVar.upBtn.addEventListener("touchstart", () => this.player.movement.up = true);
    globVar.upBtn.addEventListener("touchend", () => this.player.movement.up = false);
  
    // Down button functionality
    globVar.downBtn.addEventListener("mousedown", () => this.player.movement.down = true);
    globVar.downBtn.addEventListener("mouseup", () => this.player.movement.down = false);
    globVar.downBtn.addEventListener("touchstart", () => this.player.movement.down = true);
    globVar.downBtn.addEventListener("touchend", () => this.player.movement.down = false);
  
    // Left button functionality
    globVar.leftBtn.addEventListener("mousedown", () => this.player.movement.left = true);
    globVar.leftBtn.addEventListener("mouseup", () => this.player.movement.left = false);
    globVar.leftBtn.addEventListener("touchstart", () => this.player.movement.left = true);
    globVar.leftBtn.addEventListener("touchend", () => this.player.movement.left = false);
  
    // Right button functionality
    globVar.rightBtn.addEventListener("mousedown", () => this.player.movement.right = true);
    globVar.rightBtn.addEventListener("mouseup", () => this.player.movement.right = false);
    globVar.rightBtn.addEventListener("touchstart", () => this.player.movement.right = true);
    globVar.rightBtn.addEventListener("touchend", () => this.player.movement.right = false);
  
    // Button to change image sources
    globVar.xBtn.addEventListener("click", () => this.changePlayerImage("./assets/x.png"));
    globVar.aBtn.addEventListener("click", () => this.changePlayerImage("./assets/a.png"));
    globVar.bBtn.addEventListener("click", () => this.changePlayerImage("./assets/b.png"));
    globVar.yBtn.addEventListener("click", () => this.changePlayerImage("./assets/y.png"));
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
