export default function handleMouseLeave(
  ctaDetails: HTMLElement,
  imageContainer: HTMLElement,
  movieImage: HTMLImageElement,
  hoverTimeout: { value: NodeJS.Timeout | number }
): void {
  // Add event listener for mouseleave event on ctaDetails element
  ctaDetails.addEventListener("mouseleave", () => {
    // Clear the timeout previously set in handleMouseEnter
    clearTimeout(hoverTimeout.value as NodeJS.Timeout);

    // Find the video container element within the image container
    let videoContainer = imageContainer.querySelector("div");

    // Replace the video container with the original movie image
    if (videoContainer) {
      imageContainer.replaceChild(movieImage, videoContainer);
    }
  });
}
