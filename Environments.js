import { globVar } from "./globVar.js";
import { mobileView, bootScreen } from "./initialize.js";
import { startControllerTest } from "./controllerTest.js";
import { pressStartBtn, drawBGImg } from "./mainMenu.js";

// This function handles switching the environment based on currentEnv
function environmentHandler(currentEnv) {
  switch (currentEnv) {
    case "optimization":
      mobileView();
      console.log("Current Environment: optimization");
      break;
    case "boot-screen":
      bootScreen();
      console.log("Current Environment: Boot Screen");
      break;
    case "main-menu":
      drawBGImg()
      pressStartBtn();
      console.log("Current Environment: Main Menu");
      break;
    case "in-game":
      startControllerTest();
      console.log("Current Environment: In Game");
      break;
    case "game-options":
      console.log("Current Environment: Game Options");
      break;
    default:
      console.log("Unknown Environment");
      break;
  }
}

// Initial setup: set the first environment if needed
globVar.currentEnvHandler("optimization");
environmentHandler(globVar.currentEnv); // Call it initially to set the environment

// Listen for changes to the current environment
document.addEventListener('envChange', (event) => {
  const newEnv = event.detail; // Get the new environment from the event
  environmentHandler(newEnv);    // Call the handler with the new environment
});
