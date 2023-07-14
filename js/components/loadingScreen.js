function createLoadingScreen() {
  // Create a loading screen div
  const loadingScreen = document.createElement("div");
  loadingScreen.className = "loading-screen";

  // Create a loading bar div and add it to the loading screen
  const loadingBar = document.createElement("div");
  loadingBar.className = "loading-bar";
  loadingScreen.appendChild(loadingBar);

  // Return the loading screen
  return loadingScreen;
}

export { createLoadingScreen };
