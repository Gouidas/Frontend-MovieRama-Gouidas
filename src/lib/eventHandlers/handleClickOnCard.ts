import { fetchMovieDetails } from "../../api/index";
import { createMovieDetailBox } from "../../components/movieDetailBox";
import { fetchAndDisplayActors } from "../fetchHandlers/fetchAndDisplayActors";
import { fetchAndDisplayTrailer } from "../fetchHandlers/fetchAndDisplayTrailer";
import { fetchAndDisplayReviews } from "../fetchHandlers/fetchAndDisplayReviews ";
import { fetchAndDisplaySimilarMovies } from "../fetchHandlers/fetchAndDisplaySimilarMovies ";
import { Movie } from "../../types/index";

// Function to handle the click event on a movie card
const handleClickOnCard = async (movie: Movie): Promise<void> => {
  // Add a CSS class to the body to disable scrolling
  document.body.classList.add("no-scroll");

  // Fetch movie details
  const movieDetails = await fetchMovieDetails(movie.id);

  // Create and display the movie detail box
  createMovieDetailBox(movieDetails);

  // Fetch and display actors
  await fetchAndDisplayActors(movie.id);

  // Fetch and display the trailer
  await fetchAndDisplayTrailer(movie);

  // Fetch and display reviews
  await fetchAndDisplayReviews(movie.id);

  // Fetch and display similar movies
  await fetchAndDisplaySimilarMovies(movie.id);
};

export default handleClickOnCard;
