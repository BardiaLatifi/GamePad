import { globVar } from "./globVar.js";
import { setupControls, movement } from "./setupControls.js"

export const player = new Image();
player.src = "./assets/player.jpg";
player.width = 32;
player.height = 32;
let playerX = globVar.canvasWidth / 2;
let playerY = globVar.canvasHeight / 2;

const speed = 2;
let isAnimating = false;
setupControls();



function update() {
  // Update player's position based on movement flags
  if (movement.up) playerY -= speed;
  if (movement.down) playerY += speed;
  if (movement.left) playerX -= speed;
  if (movement.right) playerX += speed;

  // Check boundaries
  const halfWidth = player.width / 2;
  const halfHeight = player.height / 2;

  playerX = Math.max(halfWidth, Math.min(playerX, globVar.canvasWidth - halfWidth));
  playerY = Math.max(halfHeight, Math.min(playerY, globVar.canvasHeight - halfHeight));
}
  
function draw(ctx) {
  ctx.drawImage(player, Math.floor(playerX) - 16 , Math.floor(playerY) - 16, player.width, player.height);
}

function render() {
  globVar.ctx.clearRect(0, 0, globVar.canvasWidth, globVar.canvasHeight);
  update();  // Make sure to update positions before drawing
  draw(globVar.ctx);
  // Call the render function repeatedly to create an animation loop
  if (isAnimating) {
    requestAnimationFrame(render);
  }
}

export function startControllerTest() {
  if (!isAnimating) {
    isAnimating = true;
    render();
  }
}