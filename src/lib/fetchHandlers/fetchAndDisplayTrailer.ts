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
        movieImage.src
      );
      imageContainer.replaceChild(videoPlayer, movieImage);
    } else {
      const trailerSection = document.getElementById("trailer-section");
      const videoPlayer = createVideoPlayer(trailerUrl, 350, 350, "", 0);
      trailerSection!.innerHTML = "";
      trailerSection!.appendChild(videoPlayer);
    }
  } else {
    console.log("No trailer available for this movie.");
    const trailerSection = document.getElementById("trailer-section");
    trailerSection!.innerHTML = "No trailer available for this movie.";
  }
};
