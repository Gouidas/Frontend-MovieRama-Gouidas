// Import necessary modules and functions
import { closeMovieDetails } from "../lib/eventHandlers/handleCloseMovieDetails";
import { getVoteColor } from "../lib/getVoteColor";
import { MovieDetails } from "../types/index";

// Function to create the movie detail box
export const createMovieDetailBox = (movieDetails: MovieDetails) => {
  const detailBox = document.getElementById("movie-detail-box");

  if (!detailBox) {
    throw new Error("detailBox element not found");
  }

  // Extract necessary details from the movieDetails object
  const genreNames =
    movieDetails.genres && movieDetails.genres.length > 0
      ? movieDetails.genres.map((genre) => genre.name).join(", ")
      : "No data available";

  const releaseYear = movieDetails.release_date
    ? movieDetails.release_date.split("-")[0]
    : "No data available";

  let voteAverage: number | string =
    movieDetails.vote_average || "No data available";
  let voteColor = "No data available";
  let displayVoteAverage = "No data available";

  // Calculate vote color and display average if available
  if (typeof voteAverage === "number") {
    voteColor = getVoteColor(parseFloat(voteAverage.toFixed(1)));
    displayVoteAverage = voteAverage.toFixed(1);
  }

  const overview = movieDetails.overview || "No data available";

  // Set inner HTML for the movie detail box
  detailBox.innerHTML = `
    <div id="backdrop">
      <div class="movieDetailsNav flex-container">
        <h2>${movieDetails.title}</h2>
        <span class="closeBtn">X</span>
      </div>
      <div class="backdropMain">
        <div class="detail-grid">
          <div class="detail-text">
            <p>Release year: ${releaseYear}</p>
            <p>Genres: ${genreNames}</p>
            <p>Vote average: <span class="vote-box" style="background-color:${voteColor}">${displayVoteAverage}</span></p>
            <p>${overview}</p>
          </div>
          <div class="detail-trailer">
            <div id="trailer-section"></div>
          </div>
        </div>
        <div>
          <p class="bold">Cast</p>
          <div>
            <div id="cast-section" class="actors-list-container section"></div>
            <div id="show-more-button">Show all actors</div>
          </div>
        </div>
        <div>
          <p class="bold">Reviews</p>
          <div id="reviews-section" class="section"></div>
        </div>
        <div>
          <p class="bold">Similar Movies</p>
          <div id="similar-movies-section" class="section"></div>
        </div>
      </div>
    </div>
  `;

  // Show and apply necessary classes to the detail box
  detailBox.style.display = "flex";
  detailBox.classList.add("show", "fade-in");
  detailBox.classList.add("show");

  const closeButton = detailBox.querySelector(".closeBtn");

  if (!closeButton) {
    throw new Error("closeButton element not found");
  }

  // Add event listener to close button
  closeButton.addEventListener("click", closeMovieDetails);
};
