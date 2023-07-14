import { fetchAndCacheMovieTrailer } from "../../api/index.js";
import { createVideoPlayer } from "../videoPlayer.js";

export async function fetchAndDisplayTrailer(
  movieId,
  imageContainer = null,
  movieImage = null
) {
  let trailerUrl;
  try {
    if (typeof movieId === "object" && movieId !== null) {
      trailerUrl = await fetchAndCacheMovieTrailer(movieId.id);
    } else {
      trailerUrl = await fetchAndCacheMovieTrailer(movieId);
    }
  } catch (error) {
    throw new Error("Failed to fetch and cache movie trailer");
  }

  if (trailerUrl) {
    if (imageContainer && movieImage) {
      let videoPlayer = createVideoPlayer(
        trailerUrl,
        movieImage.offsetWidth,
        movieImage.offsetHeight,
        movieImage.poster_path
      );
      imageContainer.replaceChild(videoPlayer, movieImage);
    } else {
      // If imageContainer and movieImage are not provided, you can handle it based on your application's requirements
      // For example, you can display the trailer in a default location or show an error message
      // Display the trailer in the "trailer-section" using a default location
      const trailerSection = document.getElementById("trailer-section");
      const videoPlayer = createVideoPlayer(trailerUrl, 350, 350, "", "", 0);
      trailerSection.innerHTML = ""; // Clear existing content
      trailerSection.appendChild(videoPlayer);
    }
  } else {
    // Handle the case when trailerUrl is not available (no trailer found or failed to fetch)
    console.log("No trailer available for this movie.");
    // Display a message in the "trailer-section"
    const trailerSection = document.getElementById("trailer-section");
    trailerSection.innerHTML = "No trailer available for this movie.";
  }
}
