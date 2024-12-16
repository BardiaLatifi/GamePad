import { mobileView, bootScreen } from "./initialize.js";

export function environmentHandler(currentEnv) {

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

