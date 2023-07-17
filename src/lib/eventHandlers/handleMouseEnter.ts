import { fetchAndDisplayTrailer } from "../fetchHandlers/fetchAndDisplayTrailer";
import { Movie } from "../../types/index";

export default function handleMouseEnter(
  ctaDetails: HTMLElement,
  movie: Movie,
  imageContainer: HTMLElement,
  movieImage: HTMLImageElement,
  hoverTimeout: { value: NodeJS.Timeout | number }
): void {
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
