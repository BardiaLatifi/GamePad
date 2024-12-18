import { globVar } from "./globVar.js"
import { mobileView, bootScreen } from "./initialize.js";
import { testGame } from "./testGame.js";


 function environmentHandler(currentEnv) {
globVar.currentEnvHandler("optimization")
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
                testGame();
                console.log("Current Environment: Main Menu");
                break;
            case "in-game":
                console.log("Current Environment: In Game");
                break;
            case "game-options":
                console.log("Current Environment: Game Options");
                break;
            default:
                console.log("Unknown Environment");
                break;
        }
    };

    environmentHandler("optimization");

