import { fetchAndDisplayTrailer } from "../fetchHandlers/fetchAndDisplayTrailer";
import { Movie } from "../../types/index";

export default function handleMouseEnter(
  ctaDetails: HTMLElement,
  movie: Movie,
  imageContainer: HTMLElement,
  movieImage: HTMLImageElement,
  hoverTimeout: { value: NodeJS.Timeout | number }
): void {
  // Add event listener for mouseenter event on ctaDetails element
  ctaDetails.addEventListener("mouseenter", () => {
    // Set a timeout to delay the execution of the trailer fetch and display
    hoverTimeout.value = setTimeout(async () => {
      try {
        // Fetch and display the trailer for the movie
        await fetchAndDisplayTrailer(movie.id, imageContainer, movieImage);
      } catch (error) {
        // If an error occurs, throw an error with a specific message
        throw new Error("Failed to fetch and display movie trailer");
      }
    }, 600); // Delay of 600 milliseconds before fetching and displaying the trailer
  });
}
