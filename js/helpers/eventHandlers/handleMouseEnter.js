import { fetchAndCacheMovieTrailer } from "../../api/index.js";
import { createVideoPlayer } from "../videoPlayer.js";

export default function handleMouseEnter(
  ctaDetails,
  movie,
  imageContainer,
  movieImage,
  hoverTimeout
) {
  ctaDetails.addEventListener("mouseenter", () => {
    hoverTimeout.value = setTimeout(async () => {
      let trailerUrl;
      try {
        trailerUrl = await fetchAndCacheMovieTrailer(movie.id);
      } catch (error) {
        throw new Error("Failed to fetch and cache movie trailer");
      }
      if (trailerUrl) {
        let videoPlayer = createVideoPlayer(
          trailerUrl,
          movieImage.offsetWidth,
          movieImage.offsetHeight,
          movie.poster_path
        );
        imageContainer.replaceChild(videoPlayer, movieImage);
      }
    }, 600);
  });
}
