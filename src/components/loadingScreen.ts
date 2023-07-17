export function createLoadingScreen() {
  const loadingScreen = document.createElement("div");
  loadingScreen.className = "loading-screen";

  const loadingBar = document.createElement("div");
  loadingBar.className = "loading-bar";
  loadingScreen.appendChild(loadingBar);

  return loadingScreen;
}
