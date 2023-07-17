export default function handleMouseLeave(
  ctaDetails: HTMLElement,
  imageContainer: HTMLElement,
  movieImage: HTMLImageElement,
  hoverTimeout: { value: NodeJS.Timeout | number }
): void {
  ctaDetails.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimeout.value as NodeJS.Timeout);
    let videoContainer = imageContainer.querySelector("div");
    if (videoContainer) {
      imageContainer.replaceChild(movieImage, videoContainer);
    }
  });
}
