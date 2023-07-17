import { createErrorComponent } from "../components/createErrorComponent";
import handleMouseLeave from "./eventHandlers/handleMouseLeave";
import handleClickOnCard from "./eventHandlers/handleClickOnCard";
import handleMouseEnter from "./eventHandlers/handleMouseEnter";
import { Movie } from "../types/index";

async function addEventListenersToCard(
  card: HTMLElement,
  movie: Movie
): Promise<void> {
  let ctaDetails = card.querySelector(".cta-details");
  let movieImage = card.querySelector("img");

  if (!ctaDetails || !movieImage) {
    console.error("Error finding elements");
    return;
  }

  let imageContainer = movieImage.parentNode;

  if (!imageContainer) {
    console.error("Error finding parent node");
    return;
  }

  let hoverTimeout = { value: 0 };

  handleMouseEnter(
    ctaDetails as HTMLElement,
    movie,
    imageContainer as HTMLElement,
    movieImage,
    hoverTimeout
  );

  handleMouseLeave(
    ctaDetails as HTMLElement,
    imageContainer as HTMLElement,
    movieImage,
    hoverTimeout
  );

  ctaDetails.addEventListener("click", async () => {
    try {
      handleClickOnCard(movie);
    } catch (error: any) {
      createErrorComponent(error.message);
    }
  });
}

export { addEventListenersToCard };
