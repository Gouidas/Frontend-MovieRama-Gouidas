export const createVideoPlayer = (
  trailerUrl: string,
  width: string | number = "100%",
  height: string | number = "100%",
  placeholder?: string,
  autoplay: string | number = 1,
  includeOverlay: boolean = true
): HTMLElement => {
  // Create the container element for the video player
  let container = document.createElement("div");
  container.style.position = "relative";
  container.style.width = width === "100%" ? width.toString() : `${width}px`;
  container.style.height =
    height === "100%" ? height.toString() : `${height}px`;

  // Check if a trailer URL is provided
  if (trailerUrl) {
    // Create an iframe element for the video player
    let videoPlayer = document.createElement("iframe");
    videoPlayer.src = `${trailerUrl}?autoplay=${autoplay}&mute=1`;
    videoPlayer.allow = "autoplay";
    videoPlayer.setAttribute("frameborder", "0");
    videoPlayer.style.width = "100%";
    videoPlayer.style.height = "100%";
    container.appendChild(videoPlayer);
  } else if (placeholder) {
    // Create an image element as a placeholder
    let img = document.createElement("img");
    img.src = placeholder;
    img.style.width = "100%";
    img.style.height = "100%";
    container.appendChild(img);
  }

  // Check if an overlay should be included
  if (includeOverlay) {
    // Create an overlay element
    let overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    container.appendChild(overlay);
  }

  return container;
};
