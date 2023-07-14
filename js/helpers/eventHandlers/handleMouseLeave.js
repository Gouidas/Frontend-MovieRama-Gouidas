export default function handleMouseLeave(
  ctaDetails,
  imageContainer,
  movieImage,
  hoverTimeout
) {
  ctaDetails.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimeout.value); // Clear the timeout using hoverTimeout.value
    let videoContainer = imageContainer.querySelector("div");
    if (videoContainer) {
      imageContainer.replaceChild(movieImage, videoContainer);
    }
  });
}
