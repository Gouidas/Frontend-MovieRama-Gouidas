import { fetchMovieDetails } from "../../api/index.js";
import { createMovieDetailBox } from "../../components/movieDetailBox.js";
import { fetchAndDisplayActors } from "../fetchHandlers/fetchAndDisplayActors.js";
import { fetchAndDisplayTrailer } from "../fetchHandlers/fetchAndDisplayTrailer.js";
import { fetchAndDisplayReviews } from "../fetchHandlers/fetchAndDisplayReviews .js";
import { fetchAndDisplaySimilarMovies } from "../fetchHandlers/fetchAndDisplaySimilarMovies .js";

export default async function handleClickOnCard(movie) {
  document.body.classList.add("no-scroll");

  const movieDetails = await fetchMovieDetails(movie.id);
  createMovieDetailBox(movieDetails);

  await fetchAndDisplayActors(movie.id);
  await fetchAndDisplayTrailer(movie);
  await fetchAndDisplayReviews(movie.id);
  await fetchAndDisplaySimilarMovies(movie.id);
}
