import { fetchSimilarMovies } from "../../api/index";
import { createSimilarMovie } from "../../components/similarMovie";
import { Movie } from "../../types/index";

export const fetchAndDisplaySimilarMovies = async (
  movieId: string | number
): Promise<void> => {
  const similarMovies = await fetchSimilarMovies(movieId);
  const similarMoviesSection = document.getElementById(
    "similar-movies-section"
  );

  if (similarMovies.results.length < 1) {
    similarMoviesSection!.innerHTML = "No similar movies found.";
  } else {
    for (let similarMovie of similarMovies.results) {
      const similarMovieCard = await createSimilarMovie(similarMovie as Movie);
      if (similarMovieCard) {
        similarMoviesSection!.appendChild(similarMovieCard);
      }
    }
  }
};
