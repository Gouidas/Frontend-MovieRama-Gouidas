function closeMovieDetails() {
  const detailBox = document.getElementById("movie-detail-box");
  detailBox.style.display = "none";
  detailBox.classList.remove("show");

  const backdrop = document.getElementById("backdrop");
  backdrop.style.display = "none";

  document.body.classList.remove("no-scroll");
}

export function createMovieDetailBox(movieDetails) {
  const detailBox = document.getElementById("movie-detail-box");

  const genreNames =
    movieDetails.genres && movieDetails.genres.length > 0
      ? movieDetails.genres.map((genre) => genre.name).join(", ")
      : "No data available";

  const releaseYear = movieDetails.release_date
    ? movieDetails.release_date.split("-")[0]
    : "No data available";

  const voteAverage = movieDetails.vote_average || "No data available";
  const overview = movieDetails.overview || "No data available";
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
            <p>Vote average: ${voteAverage}</p>
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
      <div>
    </div>
  `;

  // Make the movie-detail-box and the backdrop visible
  detailBox.style.display = "flex";
  detailBox.classList.add("show", "fade-in");
  detailBox.classList.add("show"); // add the "show" class

  // Add event listener to close button
  const closeButton = detailBox.querySelector(".closeBtn");
  closeButton.addEventListener("click", closeMovieDetails);
}
