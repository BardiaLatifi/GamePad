// Import required modules
import { globVar } from "./globVar.js";
import { mobileView } from "./initialize.js";
import { environmentHandler } from "./Environments.js"

window.addEventListener("load", () =>{
  // Optimization Environment
  environmentHandler("optimization");
  
})