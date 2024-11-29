// Function to detect device resolution and setup handling accordingly
function detectDeviceType() {
  const userAgent = navigator.userAgent;

  if (/Android/i.test(userAgent)) {
    showPopup("Please rotate your device for the best experience.");
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    showPopup("Please rotate your device for the best experience.");
  } else {
    removePopup(); // Remove popup for other devices
  }
}

function showPopup(message) {
  // Same implementation as before
}

// Function to remove the pop-up
function removePopup() {
  // Same implementation as before
}

// Initial call to set up everything on load
window.addEventListener("load", detectDeviceType);


// Function to show a pop-up message
function showPopup(message) {
  const popup = document.createElement("div");
  popup.id = "popup";
  popup.style.position = "fixed";
  popup.style.top = "15%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  popup.style.color = "white";
  popup.style.fontSize = "2rem";
  popup.style.padding = "50px";
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
window.addEventListener("resize", detectDeviceType);
window.addEventListener("orientationchange", handleOrientationChange);

// Initial call to set up everything on load
window.addEventListener("load", detectDeviceType);