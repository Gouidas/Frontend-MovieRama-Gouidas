import { fetchMovieReviews } from "../../api/index";
import { createReview } from "../../components/review";
import { Review } from "../../types/index";

export async function fetchAndDisplayReviews(
  movieId: string | number
): Promise<void> {
  // Fetch the reviews for the movie using the API
  const reviews = await fetchMovieReviews(movieId);
  const reviewsSection = document.getElementById("reviews-section");

  if (reviews.results.length === 0) {
    // If there are no reviews available, display a message on the webpage
    reviewsSection!.innerHTML = "No reviews available for this movie.";
  } else {
    // Display the first 2 reviews on the webpage
    reviews.results.slice(0, 2).forEach((review: Review) => {
      reviewsSection!.appendChild(createReview(review));
    });
  }
}
