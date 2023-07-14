import { fetchSimilarMovies } from "../../api/index.js";
import { createSimilarMovie } from "../../components/similarMovie.js";

export async function fetchAndDisplaySimilarMovies(movieId) {
  const similarMovies = await fetchSimilarMovies(movieId);
  console.log("similarMovies", similarMovies);
  const similarMoviesSection = document.getElementById(
    "similar-movies-section"
  );

  if (similarMovies.results.length < 1) {
    similarMoviesSection.innerHTML = "No similar movies found.";
  } else {
    for (let similarMovie of similarMovies.results) {
      const similarMovieCard = await createSimilarMovie(similarMovie);
      similarMoviesSection.appendChild(similarMovieCard);
    }
  }
}
