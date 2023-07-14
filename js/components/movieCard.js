import { fetchMovieDetails } from "../api/index.js";
import { truncateText } from "../helpers/truncateText.js";
import { addEventListenersToCard } from "../helpers/eventHandlers.js";
import { getVoteColor } from "../helpers/getVoteColor.js";
import { createErrorComponent } from "./createErrorComponent.js";

async function createMovieCard(movie, displayInfo = true) {
  let movieDetails;
  try {
    movieDetails = await fetchMovieDetails(movie.id);
  } catch (error) {
    const errorComponent = createErrorComponent(error.message);
    document.body.appendChild(errorComponent);
    setTimeout(() => {
      if (document.body.contains(errorComponent)) {
        document.body.removeChild(errorComponent);
      }
    }, 4000);
    return; // exit the function or provide some alternative flow here
  }
  let movieCard = document.createElement("div");
  movieCard.className = "movie-card";
  const genreNames = movieDetails.genres.map((genre) => genre.name).join(", ");

  let movieImage = document.createElement("img");
  movieImage.src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "assets/images/img_not_found2.png";
  movieImage.alt = movie.title;

  let imageContainer = document.createElement("div"); // Create a container for the image
  imageContainer.appendChild(movieImage); // Append the image to its container
  imageContainer.className = "image-container"; // Add a class to the container for easier targeting

  // Create a box for vote_average
  let ctaDetails = document.createElement("div");
  let voteBox = document.createElement("div");
  voteBox.className = "vote-box"; // Add class for styling
  voteBox.style.backgroundColor = getVoteColor(movie.vote_average); // Set the background color based on vote_average
  let voteAverage = parseFloat(movie.vote_average).toFixed(1); // Convert vote_average to a number and round it to one decimal place
  voteBox.textContent = voteAverage; // Set the text of the box
  ctaDetails.appendChild(voteBox);

  // Use DOM manipulation instead of innerHTML to build the card structure

  ctaDetails.className = "cta-details";
  if (!displayInfo) {
    ctaDetails.classList.add("no-cursor");
  }
  ctaDetails.appendChild(imageContainer);

  let movieInfo = document.createElement("div");
  movieInfo.className = "movie-info";

  let date = new Date(movie.release_date);
  let formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  if (displayInfo) {
    movieInfo.innerHTML = `
      <h2>${truncateText(movie.title, 24)}</h2>
      <p>Release date <span class="bold"> ${formattedDate} </span></p>
      <p>Genre(s) <span class="bold">${truncateText(genreNames, 20)}</span></p>
      <p>${truncateText(movie.overview, 80)}</p>
    `;
  }

  ctaDetails.appendChild(movieInfo);
  movieCard.appendChild(ctaDetails);

  // Store the movie data on the card
  movieCard.dataset.movie = JSON.stringify(movie);

  return movieCard;
}
async function createAndSetUpCard(movie, smallCard = false, noHover = false) {
  const card = await createMovieCard(movie);

  if (smallCard) {
    card.classList.add("small-card");
  }

  addEventListenersToCard(card, movie);

  if (noHover) {
    card.querySelector(".cta-details").onmouseenter = null;
    card.querySelector(".cta-details").onmouseleave = null;
  }

  return card;
}

export { createMovieCard, createAndSetUpCard };
