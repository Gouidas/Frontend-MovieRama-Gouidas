import { fetchAndCacheMovieTrailer } from "../../api/index";
import { createVideoPlayer } from "../../components/videoPlayer";
import { Movie } from "../../types/index";

export const fetchAndDisplayTrailer = async (
  movieId: Movie | string | number,
  imageContainer: HTMLElement | null = null,
  movieImage: HTMLImageElement | null = null
): Promise<void> => {
  let trailerUrl: string | undefined;
  try {
    // Fetch and cache the movie trailer using the provided movieId
    if (typeof movieId === "object" && movieId !== null) {
      trailerUrl = await fetchAndCacheMovieTrailer(movieId.id);
    } else {
      trailerUrl = await fetchAndCacheMovieTrailer(movieId);
    }
  } catch (error) {
    throw new Error("Failed to fetch and cache movie trailer");
  }

  if (trailerUrl) {
    // If a trailer URL is available
    if (imageContainer && movieImage) {
      // If imageContainer and movieImage elements are provided
      // Replace the movie image with the video player in the specified image container
      let videoPlayer = createVideoPlayer(
        trailerUrl,
        movieImage.offsetWidth,
        movieImage.offsetHeight,
        movieImage.src
      );
      imageContainer.replaceChild(videoPlayer, movieImage);
    } else {
      // If imageContainer and movieImage elements are not provided
      // Display the video player in the "trailer-section" element on the webpage
      const trailerSection = document.getElementById("trailer-section");
      const videoPlayer = createVideoPlayer(trailerUrl, 350, 350, "", 0);
      trailerSection!.innerHTML = "";
      trailerSection!.appendChild(videoPlayer);
    }
  } else {
    // If no trailer URL is available
    console.log("No trailer available for this movie.");
    const trailerSection = document.getElementById("trailer-section");
    trailerSection!.innerHTML = "No trailer available for this movie.";
  }
};
