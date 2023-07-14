import { fetchMovieDetails } from "../api/index.js";
import { truncateText } from "../helpers/truncateText.js";
import { addEventListenersToCard } from "../helpers/eventHandlers.js";
import { getVoteColor } from "../helpers/getVoteColor.js";
import { createErrorComponent } from "./createErrorComponent.js";
import { MOVIE_POSTER_URL } from "../../constants.js";

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
    return;
  }

  let movieCard = document.createElement("div");
  movieCard.className = "movie-card";
  const genreNames = movieDetails.genres.map((genre) => genre.name).join(", ");

  let imageContainer = document.createElement("div");
  imageContainer.style.width = "100%";
  imageContainer.style.height = displayInfo ? "375px" : "150px";
  imageContainer.style.backgroundColor = "black";
  imageContainer.className = "image-container";

  let movieImage = document.createElement("img");
  movieImage.alt = movie.title;
  movieImage.style.display = "none";

  let actualImage = new Image();
  actualImage.src = movie.poster_path
    ? `${MOVIE_POSTER_URL}${movie.poster_path}`
    : "assets/images/img_not_found2.png";
  actualImage.onload = function () {
    movieImage.src = this.src;
    movieImage.style.display = "block";
  };

  imageContainer.appendChild(movieImage);

  let ctaDetails = document.createElement("div");
  let voteBox = document.createElement("div");
  voteBox.className = "vote-box";
  voteBox.style.backgroundColor = getVoteColor(movie.vote_average);
  let voteAverage = parseFloat(movie.vote_average).toFixed(1);
  voteBox.textContent = voteAverage;
  ctaDetails.appendChild(voteBox);

  ctaDetails.className = "cta-details";
  if (!displayInfo) {
    ctaDetails.classList.add("no-cursor");
  }
  ctaDetails.appendChild(imageContainer);

  if (displayInfo) {
    let movieInfo = document.createElement("div");
    movieInfo.className = "movie-info";

    let date = new Date(movie.release_date);
    let formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    movieInfo.innerHTML = `
      <h2>${truncateText(movie.title, 24)}</h2>
      <p>Release date <span class="bold"> ${formattedDate} </span></p>
      <p>Genre(s) <span class="bold">${truncateText(genreNames, 20)}</span></p>
      <p>${truncateText(movie.overview, 80)}</p>
    `;

    ctaDetails.appendChild(movieInfo);
  }

  movieCard.appendChild(ctaDetails);

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
