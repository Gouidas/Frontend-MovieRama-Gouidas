import { fetchSimilarMovies } from "../../api/index";
import { createSimilarMovie } from "../../components/similarMovie";
import { Movie } from "../../types/index";

export const fetchAndDisplaySimilarMovies = async (
  movieId: string | number
): Promise<void> => {
  // Fetch the similar movies for the specified movie using the API
  const similarMovies = await fetchSimilarMovies(movieId);
  const similarMoviesSection = document.getElementById(
    "similar-movies-section"
  );

  if (similarMovies.results.length < 1) {
    // If there are no similar movies found, display a message on the webpage
    similarMoviesSection!.innerHTML = "No similar movies found.";
  } else {
    // Display each similar movie on the webpage
    for (let similarMovie of similarMovies.results) {
      const similarMovieCard = await createSimilarMovie(similarMovie as Movie);
      if (similarMovieCard) {
        similarMoviesSection!.appendChild(similarMovieCard);
      }
    }
  }
};
