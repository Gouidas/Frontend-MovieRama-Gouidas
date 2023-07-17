import { fetchMovieReviews } from "../../api/index";
import { createReview } from "../../components/review";
import { Review } from "../../types/index";

export async function fetchAndDisplayReviews(
  movieId: string | number
): Promise<void> {
  const reviews = await fetchMovieReviews(movieId);
  const reviewsSection = document.getElementById("reviews-section");

  if (reviews.results.length === 0) {
    reviewsSection!.innerHTML = "No reviews available for this movie.";
  } else {
    reviews.results.slice(0, 2).forEach((review: Review) => {
      reviewsSection!.appendChild(createReview(review));
    });
  }
}
