import {
  fetchMovieDetails,
  fetchAndCacheMovieTrailer,
  fetchActors,
} from "../api/index.js";
import { createMovieDetailBox } from "../components/movieDetailBox.js";
import { createVideoPlayer } from "./videoPlayer.js";
import { createErrorComponent } from "../components/createErrorComponent.js";
import handleMouseLeave from "./eventHandlers/handleMouseLeave.js";
import handleClickOnCard from "./eventHandlers/handleClickOnCard.js";
import handleClickOnSimilarMovie from "./eventHandlers/handleClickOnSimilarMovie.js";
import handleMouseEnter from "./eventHandlers/handleMouseEnter.js";

async function addEventListenersToCard(card, movie) {
  let ctaDetails = card.querySelector(".cta-details");
  let movieImage = card.querySelector("img");
  let imageContainer = movieImage.parentNode;

  let hoverTimeout = {}; // Change hoverTimeout to an object

  handleMouseEnter(ctaDetails, movie, imageContainer, movieImage, hoverTimeout); // Call handleMouseEnter function

  handleMouseLeave(ctaDetails, imageContainer, movieImage, hoverTimeout);

  ctaDetails.addEventListener("click", async () => {
    try {
      handleClickOnCard(movie);
    } catch (error) {
      createErrorComponent(error.message);
    }
  });
}

export { addEventListenersToCard };
