import { createErrorComponent } from "../components/createErrorComponent";
import handleMouseLeave from "./eventHandlers/handleMouseLeave";
import handleClickOnCard from "./eventHandlers/handleClickOnCard";
import handleMouseEnter from "./eventHandlers/handleMouseEnter";
import { Movie } from "../types/index";

// Function to add event listeners to a movie card
async function addEventListenersToCard(
  card: HTMLElement, // The movie card element
  movie: Movie // The movie object associated with the card
): Promise<void> {
  let ctaDetails = card.querySelector(".cta-details"); // The details section of the card
  let movieImage = card.querySelector("img"); // The movie image

  if (!ctaDetails || !movieImage) {
    console.error("Error finding elements");
    return;
  }

  let imageContainer = movieImage.parentNode; // The parent container of the movie image

  if (!imageContainer) {
    console.error("Error finding parent node");
    return;
  }

  let hoverTimeout = { value: 0 }; // Timeout object for handling hover events

  // Add mouse enter event listener to the details section
  handleMouseEnter(
    ctaDetails as HTMLElement,
    movie,
    imageContainer as HTMLElement,
    movieImage,
    hoverTimeout
  );

  // Add mouse leave event listener to the details section
  handleMouseLeave(
    ctaDetails as HTMLElement,
    imageContainer as HTMLElement,
    movieImage,
    hoverTimeout
  );

  // Add click event listener to the details section
  ctaDetails.addEventListener("click", async () => {
    try {
      handleClickOnCard(movie);
    } catch (error: any) {
      createErrorComponent(error.message);
    }
  });
}

export { addEventListenersToCard };
