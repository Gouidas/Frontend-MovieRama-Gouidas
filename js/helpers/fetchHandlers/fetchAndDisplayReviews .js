import { fetchMovieReviews } from "../../api/index.js";
import { createReview } from "../../components/review.js";

export async function fetchAndDisplayReviews(movieId) {
  const reviews = await fetchMovieReviews(movieId);
  const reviewsSection = document.getElementById("reviews-section");

  if (reviews.results.length === 0) {
    reviewsSection.innerHTML = "No reviews available for this movie.";
  } else {
    reviews.results.slice(0, 2).forEach((review) => {
      reviewsSection.appendChild(createReview(review));
    });
  }
}
