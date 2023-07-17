// Import necessary modules and functions
import { fetchMovieDetails } from "../api/index";
import { truncateText } from "../lib/truncateText";
import { addEventListenersToCard } from "../lib/eventHandlers";
import { getVoteColor } from "../lib/getVoteColor";
import { createErrorComponent } from "./createErrorComponent";
import { IMAGE_URL } from "../lib/constants";
import { GenresList, Movie } from "../types/index";

// Function to create a movie card with details
const createMovieCard = async (
  movie: Movie,
  displayInfo = true
): Promise<HTMLElement | undefined> => {
  let genresList: GenresList;

  try {
    // Fetch movie details including genre list
    genresList = await fetchMovieDetails(movie.id);
  } catch (error: unknown) {
    // Display error message if failed to fetch movie details
    const errorComponent = createErrorComponent(
      error instanceof Error ? error.message : String(error)
    );

    // Display error message for 4 seconds
    document.body.appendChild(errorComponent);
    setTimeout(() => {
      if (document.body.contains(errorComponent)) {
        document.body.removeChild(errorComponent);
      }
    }, 4000);

    return;
  }

  // Create movie card container
  const movieCard = document.createElement("div");
  movieCard.className = "movie-card";
  const genreNames = genresList.genres.map((genre) => genre.name).join(", ");

  // Create image container for movie poster
  const imageContainer = document.createElement("div");
  imageContainer.style.width = "100%";
  imageContainer.style.height = displayInfo ? "375px" : "150px";
  imageContainer.style.backgroundColor = "black";
  imageContainer.className = "image-container";

  // Create movie image element
  const movieImage = document.createElement("img");
  movieImage.alt = movie.title;
  movieImage.style.display = "none";

  // Load actual movie image
  const actualImage = new Image();
  actualImage.src = movie.poster_path
    ? `${IMAGE_URL}${movie.poster_path}`
    : "/assets/images/img_not_found2.png";
  actualImage.onload = () => {
    if (movieImage) {
      movieImage.src = actualImage.src;
      movieImage.style.display = "block";
    }
  };

  imageContainer.appendChild(movieImage);

  // Create details and rating box for the movie
  const ctaDetails = document.createElement("div");
  const voteBox = document.createElement("div");
  voteBox.className = "vote-box";
  voteBox.style.backgroundColor = getVoteColor(movie.vote_average);
  const voteAverage = movie.vote_average.toFixed(1);
  voteBox.textContent = voteAverage;
  ctaDetails.appendChild(voteBox);

  ctaDetails.className = "cta-details";
  if (!displayInfo) {
    ctaDetails.classList.add("no-cursor");
  }
  ctaDetails.appendChild(imageContainer);

  if (displayInfo) {
    // Create movie information section
    const movieInfo = document.createElement("div");
    movieInfo.className = "movie-info";

    // Format release date
    const date = new Date(movie.release_date);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    // Set inner HTML of movie information
    movieInfo.innerHTML = `
      <h2>${truncateText(movie.title, 24)}</h2>
      <p>Release date <span class="bold"> ${formattedDate} </span></p>
      <p>Genre(s) <span class="bold">${truncateText(genreNames, 20)}</span></p>
      <p>${truncateText(movie.overview, 80)}</p>
    `;

    ctaDetails.appendChild(movieInfo);
  }

  movieCard.appendChild(ctaDetails);

  // Set dataset for movie card
  movieCard.dataset.movie = JSON.stringify(movie);

  return movieCard;
};

// Function to create a movie card and set up event listeners
const createAndSetUpCard = async (
  movie: Movie,
  smallCard = false,
  noHover = false
) => {
  const card = await createMovieCard(movie);

  if (!card) {
    return;
  }

  // Add class for small card if specified
  if (smallCard) {
    card.classList.add("small-card");
  }

  // Set up event listeners for the card
  addEventListenersToCard(card, movie);

  const ctaDetails = card.querySelector(".cta-details") as HTMLElement;
  if (!ctaDetails) {
    return;
  }

  // Disable hover effects if specified
  if (noHover) {
    ctaDetails.onmouseenter = null;
    ctaDetails.onmouseleave = null;
  }

  return card;
};

// Export functions
export { createMovieCard, createAndSetUpCard };
