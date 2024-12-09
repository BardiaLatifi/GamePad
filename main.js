import { globVar } from "./globVar.js";
import { mobileView } from "./mobileView.js";

mobileView();

// Up button functionality
globVar.upBtn.addEventListener("mousedown", () => moveUp = true);
globVar.upBtn.addEventListener("mouseup", () => moveUp = false);
globVar.upBtn.addEventListener("touchstart", () => moveUp = true);
globVar.upBtn.addEventListener("touchend", () => moveUp = false);

// Right button functionality
globVar.rightBtn.addEventListener("mousedown", () => moveRight = true);
globVar.rightBtn.addEventListener("mouseup", () => moveRight = false);
globVar.rightBtn.addEventListener("touchstart", () => moveRight = true);
globVar.rightBtn.addEventListener("touchend", () => moveRight = false);

// Left button functionality
globVar.leftBtn.addEventListener("mousedown", () => moveLeft = true);
globVar.leftBtn.addEventListener("mouseup", () => moveLeft = false);
globVar.leftBtn.addEventListener("touchstart", () => moveLeft = true);
globVar.leftBtn.addEventListener("touchend", () => moveLeft = false);

// Down button functionality
globVar.downBtn.addEventListener("mousedown", () => moveDown = true);
globVar.downBtn.addEventListener("mouseup", () => moveDown = false);
globVar.downBtn.addEventListener("touchstart", () => moveDown = true);
globVar.downBtn.addEventListener("touchend", () => moveDown = false);

// Button to change image sources
globVar.xBtn.addEventListener("click", () => image.src = "./assets/x.png");
globVar.aBtn.addEventListener("click", () => image.src = "./assets/a.png");
globVar.bBtn.addEventListener("click", () => image.src = "./assets/b.png");
globVar.yBtn.addEventListener("click", () => image.src = "./assets/y.png");

// Player object
const playerObject = {
  x: 0,
  y: 0,
  width: 32,
  height: 32
};
const player = Object.create(playerObject);
player.x = globVar.canvasWidth / 2 - player.width / 2;
player.y = globVar.canvasHeight / 2 - player.height / 2;

// The image of the player
const image = new Image();
image.src = "./assets/player.jpg";
image.addEventListener("load", loadHandler, false);

// Speed Variables
let Xspeed = 0;
let Yspeed = 0;

// Movement Flags
let moveUp = false,
    moveRight = false,
    moveDown = false,
    moveLeft = false;

// Animation Loop Flag
let isAnimating = false;

// Load Handler
function loadHandler() {
  startAnimation(); // Only start the animation loop here
}

// Start Animation Loop
function startAnimation() {
  if (!isAnimating) {
    isAnimating = true;
    update(); // Start the update loop
  }
}

// Update Player Position
function update() {
  window.requestAnimationFrame(update);

  // Update position based on speed
  player.x += Xspeed;
  player.y += Yspeed;

  // Set speed based on key presses
  if (moveUp && !moveDown) {
    Yspeed = -2;
  } else if (moveDown && !moveUp) {
    Yspeed = 2;
  } else {
    Yspeed = 0; // Stop vertically if no keys pressed
  }

  if (moveLeft && !moveRight) {
    Xspeed = -2;
  } else if (moveRight && !moveLeft) {
    Xspeed = 2;
  } else {
    Xspeed = 0; // Stop horizontally if no keys pressed
  }

  // Boundary checks
  if (player.x < 0) player.x = 0;
  if (player.y < 0) player.y = 0;
  
  if (player.x + player.width > globVar.canvasWidth) {
    player.x = globVar.canvasWidth - player.width;
  }
  if (player.y + player.height > globVar.canvasHeight) {
    player.y = globVar.canvasHeight - player.height;
  }

  render();
}

// Render Function
function render() {
  globVar.ctx.clearRect(0, 0, globVar.canvasWidth, globVar.canvasHeight);
  globVar.ctx.drawImage(image, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
}
