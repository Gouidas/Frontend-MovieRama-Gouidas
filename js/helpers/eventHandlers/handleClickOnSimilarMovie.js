import {
  fetchMovieDetails,
  fetchAndCacheMovieTrailer,
  fetchMovieReviews,
} from "../../api/index.js";
import { createMovieDetailBox } from "../../components/movieDetailBox.js";
import { createVideoPlayer } from "../videoPlayer.js";
import { createReview } from "../../components/review.js";
import { createErrorComponent } from "../../components/createErrorComponent.js";

export default async function handleClickOnSimilarMovie(similarMovie) {
  const newMovieDetails = await fetchMovieDetails(similarMovie.id);
  createMovieDetailBox(newMovieDetails);

  const newTrailerUrl = await fetchAndCacheMovieTrailer(similarMovie.id);
  const trailerSection = document.getElementById("trailer-section");

  if (!newTrailerUrl) {
    trailerSection.innerHTML = "No trailer available for this movie.";
  } else {
    let videoPlayer = createVideoPlayer(
      newTrailerUrl,
      350,
      350,
      similarMovie.poster_path,
      0,
      false
    );
    trailerSection.appendChild(videoPlayer);
  }

  document.getElementById("reviews-section").innerHTML = "";

  const newReviews = await fetchMovieReviews(similarMovie.id);
  if (newReviews.results.length === 0) {
    document.getElementById("reviews-section").innerHTML =
      "No reviews available for this movie.";
  } else {
    newReviews.results.slice(0, 2).forEach((review) => {
      document
        .getElementById("reviews-section")
        .appendChild(createReview(review));
    });
  }
}
