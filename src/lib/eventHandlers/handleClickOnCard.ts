import { fetchMovieDetails } from "../../api/index";
import { createMovieDetailBox } from "../../components/movieDetailBox";
import { fetchAndDisplayActors } from "../fetchHandlers/fetchAndDisplayActors";
import { fetchAndDisplayTrailer } from "../fetchHandlers/fetchAndDisplayTrailer";
import { fetchAndDisplayReviews } from "../fetchHandlers/fetchAndDisplayReviews ";
import { fetchAndDisplaySimilarMovies } from "../fetchHandlers/fetchAndDisplaySimilarMovies ";
import { Movie } from "../../types/index";

const handleClickOnCard = async (movie: Movie): Promise<void> => {
  document.body.classList.add("no-scroll");

  const movieDetails = await fetchMovieDetails(movie.id);
  createMovieDetailBox(movieDetails);

  await fetchAndDisplayActors(movie.id);
  await fetchAndDisplayTrailer(movie);
  await fetchAndDisplayReviews(movie.id);
  await fetchAndDisplaySimilarMovies(movie.id);
};

export default handleClickOnCard;
