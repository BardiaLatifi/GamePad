// Function to detect device resolution and setup handling accordingly
function detectResolution() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (width < 600) {
      // Trigger a pop-up if the resolution is less than 600px
      showPopup("Please rotate your device for the best experience.");
  } else {
      // Remove the pop-up if the resolution is sufficient
      removePopup();
  }
}

// Function to show a pop-up message
function showPopup(message) {
  const popup = document.createElement("div");
  popup.id = "popup";
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  popup.style.color = "white";
  popup.style.padding = "20px";
  popup.style.borderRadius = "5px";
  popup.innerText = message;
  document.body.appendChild(popup);
}

// Function to remove the pop-up
function removePopup() {
  const popup = document.getElementById("popup");
  if (popup) {
      popup.remove();
  }
}

// Function to handle device rotation
function handleOrientationChange() {
  removePopup();
  preventScroll();
  fixViewport();
}

// Function to effectively prevent default scroll actions
function preventScroll() {
  window.scrollTo(0, 0);  // Scroll to top to prevent default scrolling
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Function to fix user view to a certain area (you can customize the area as needed)
function fixViewport() {
  // Example: Set a specific viewport or focus on the game area
  window.scrollTo({
      top: document.getElementById("gamePad").offsetTop,
      behavior: "smooth"
  });
}

// Event listeners for resolution detection and orientation change
window.addEventListener("resize", detectResolution);
window.addEventListener("orientationchange", handleOrientationChange);

// Initial call to set up everything on load
window.addEventListener("load", detectResolution);
