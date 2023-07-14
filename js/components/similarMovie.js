import { createMovieCard } from "./movieCard.js";

export async function createSimilarMovie(movie) {
  const similarMovieCard = await createMovieCard(movie, false);
  similarMovieCard.classList.add("small-card");
  similarMovieCard.querySelector(".cta-details").classList.add("no-hover");
  return similarMovieCard;
}
