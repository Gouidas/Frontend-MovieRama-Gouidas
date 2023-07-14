function createVideoPlayer(
  trailerUrl,
  width = "100%",
  height = "100%",
  placeholder,
  autoplay = 1,
  includeOverlay = true
) {
  let container = document.createElement("div");
  container.style.position = "relative";
  container.style.width = width === "100%" ? width : `${width}px`;
  container.style.height = height === "100%" ? height : `${height}px`;

  if (trailerUrl) {
    let videoPlayer = document.createElement("iframe");
    videoPlayer.src = `${trailerUrl}?autoplay=${autoplay}&mute=1`;
    videoPlayer.allow = "autoplay";
    videoPlayer.frameborder = "0";
    videoPlayer.style.width = "100%";
    videoPlayer.style.height = "100%";
    container.appendChild(videoPlayer);
  } else {
    let img = document.createElement("img");
    img.src = placeholder;
    img.style.width = "100%";
    img.style.height = "100%";
    container.appendChild(img);
  }

  if (includeOverlay) {
    let overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    container.appendChild(overlay);
  }

  return container;
}

export { createVideoPlayer };
