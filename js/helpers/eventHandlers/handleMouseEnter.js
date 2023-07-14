import { fetchAndDisplayTrailer } from "../fetchHandlers/fetchAndDisplayTrailer.js"; // import the function

export default function handleMouseEnter(
  ctaDetails,
  movie,
  imageContainer,
  movieImage,
  hoverTimeout
) {
  ctaDetails.addEventListener("mouseenter", () => {
    hoverTimeout.value = setTimeout(async () => {
      try {
        await fetchAndDisplayTrailer(movie.id, imageContainer, movieImage);
      } catch (error) {
        throw new Error("Failed to fetch and display movie trailer");
      }
    }, 600);
  });
}
