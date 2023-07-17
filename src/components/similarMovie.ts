import { createMovieCard } from "./movieCard";
import { Movie } from "../types/index";

export const createSimilarMovie = async (
  movie: Movie
): Promise<HTMLElement | undefined> => {
  const similarMovieCard = await createMovieCard(movie, false);
  if (!similarMovieCard) {
    return undefined;
  }

  similarMovieCard.classList.add("small-card");

  const ctaDetails = similarMovieCard.querySelector(".cta-details");
  if (ctaDetails) {
    ctaDetails.classList.add("no-hover");
  } else {
    console.error(".cta-details element not found");
  }

  return similarMovieCard;
};
