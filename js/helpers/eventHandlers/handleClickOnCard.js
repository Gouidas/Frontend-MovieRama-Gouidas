import {
  fetchMovieDetails,
  fetchAndCacheMovieTrailer,
  fetchMovieReviews,
  fetchSimilarMovies,
  fetchActors,
} from "../../api/index.js";
import { createMovieDetailBox } from "../../components/movieDetailBox.js";
import { createVideoPlayer } from "../videoPlayer.js";
import { createReview } from "../../components/review.js";
import { createSimilarMovie } from "../../components/similarMovie.js";
import { createErrorComponent } from "../../components/createErrorComponent.js";
import { createActorCard } from "../../components/actorCard.js";
import {
  handleClickMoreActors,
  setActors,
  setDisplayedActorsCount,
  resetActorsDisplay,
} from "./handleClickMoreActors.js";

setDisplayedActorsCount(5);

export default async function handleClickOnCard(movie) {
  document.body.classList.add("no-scroll");

  const movieDetails = await fetchMovieDetails(movie.id);

  createMovieDetailBox(movieDetails);

  const actors = await fetchActors(movie.id);
  let allActors = actors.cast;
  resetActorsDisplay();
  console.log("allActors", allActors);
  setActors(actors.cast);
  // Ensure your movie detail box has a cast-section in its template
  const castSection = document.getElementById("cast-section");

  if (!allActors || allActors.length === 0) {
    castSection.innerHTML = "No cast available for this movie.";
  } else {
    let displayedActorsCount = 5;
    allActors.slice(0, displayedActorsCount).forEach((actor) => {
      const actorCard = createActorCard(actor);
      castSection.appendChild(actorCard);
    });

    const showMoreButton = document.getElementById("show-more-button");

    // Hide the 'Show all actors' button if there are less than 6 actors.
    if (allActors.length <= 5) {
      showMoreButton.style.display = "none";
    } else {
      showMoreButton.style.display = "block";
      showMoreButton.addEventListener("click", handleClickMoreActors);
    }
  }

  const trailerUrl = await fetchAndCacheMovieTrailer(movie.id);
  const trailerSection = document.getElementById("trailer-section");

  if (!trailerUrl) {
    trailerSection.innerHTML = "No trailer available for this movie.";
  } else {
    let videoPlayer = createVideoPlayer(
      trailerUrl,
      350,
      350,
      movie.poster_path,
      0,
      false
    );
    trailerSection.appendChild(videoPlayer);
  }

  document.getElementById("reviews-section").innerHTML = "";
  document.getElementById("similar-movies-section").innerHTML = "";

  const reviews = await fetchMovieReviews(movie.id);
  if (reviews.results.length === 0) {
    document.getElementById("reviews-section").innerHTML =
      "No reviews available for this movie.";
  } else {
    reviews.results.slice(0, 2).forEach((review) => {
      document
        .getElementById("reviews-section")
        .appendChild(createReview(review));
    });
  }

  const similarMovies = await fetchSimilarMovies(movie.id);
  if (similarMovies.results.length < 1) {
    document.getElementById("similar-movies-section").innerHTML =
      "No similar movies found.";
  } else {
    for (let similarMovie of similarMovies.results) {
      const similarMovieCard = await createSimilarMovie(similarMovie);
      document
        .getElementById("similar-movies-section")
        .appendChild(similarMovieCard);
    }
  }
}
