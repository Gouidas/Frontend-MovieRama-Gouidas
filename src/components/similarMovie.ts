import { createMovieCard } from "./movieCard";
import { Movie } from "../types/index";

// Function to create a similar movie card
export const createSimilarMovie = async (
  movie: Movie
): Promise<HTMLElement | undefined> => {
  // Create a movie card for the similar movie
  const similarMovieCard = await createMovieCard(movie, false);

  if (!similarMovieCard) {
    // Return undefined if the movie card couldn't be created
    return undefined;
  }

  // Add additional classes to the similar movie card
  similarMovieCard.classList.add("small-card");

  // Add 'no-hover' class to the ctaDetails element
  const ctaDetails = similarMovieCard.querySelector(".cta-details");
  if (ctaDetails) {
    ctaDetails.classList.add("no-hover");
  } else {
    console.error(".cta-details element not found");
  }

  return similarMovieCard;
};
