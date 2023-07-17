export const createVideoPlayer = (
  trailerUrl: string,
  width: string | number = "100%",
  height: string | number = "100%",
  placeholder?: string,
  autoplay: string | number = 1,
  includeOverlay: boolean = true
): HTMLElement => {
  let container = document.createElement("div");
  container.style.position = "relative";
  container.style.width = width === "100%" ? width.toString() : `${width}px`;
  container.style.height =
    height === "100%" ? height.toString() : `${height}px`;

  if (trailerUrl) {
    let videoPlayer = document.createElement("iframe");
    videoPlayer.src = `${trailerUrl}?autoplay=${autoplay}&mute=1`;
    videoPlayer.allow = "autoplay";
    videoPlayer.setAttribute("frameborder", "0");
    videoPlayer.style.width = "100%";
    videoPlayer.style.height = "100%";
    container.appendChild(videoPlayer);
  } else if (placeholder) {
    let img = document.createElement("img");
    img.src = placeholder;
    img.style.width = "100%";
    img.style.height = "100%";
    container.appendChild(img);
  }

  if (includeOverlay) {
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
