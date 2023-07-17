import { fetchMovieDetails } from "../api/index";
import { truncateText } from "../lib/truncateText";
import { addEventListenersToCard } from "../lib/eventHandlers";
import { getVoteColor } from "../lib/getVoteColor";
import { createErrorComponent } from "./createErrorComponent";
import { IMAGE_URL } from "../lib/constants";
import { GenresList, Movie } from "../types/index";

const createMovieCard = async (
  movie: Movie,
  displayInfo = true
): Promise<HTMLElement | undefined> => {
  let genresList: GenresList;
  try {
    genresList = await fetchMovieDetails(movie.id);
  } catch (error: unknown) {
    const errorComponent = createErrorComponent(
      error instanceof Error ? error.message : String(error)
    );
    document.body.appendChild(errorComponent);
    setTimeout(() => {
      if (document.body.contains(errorComponent)) {
        document.body.removeChild(errorComponent);
      }
    }, 4000);
    return;
  }

  const movieCard = document.createElement("div");
  movieCard.className = "movie-card";
  const genreNames = genresList.genres.map((genre) => genre.name).join(", ");

  const imageContainer = document.createElement("div");
  imageContainer.style.width = "100%";
  imageContainer.style.height = displayInfo ? "375px" : "150px";
  imageContainer.style.backgroundColor = "black";
  imageContainer.className = "image-container";

  const movieImage = document.createElement("img");
  movieImage.alt = movie.title;
  movieImage.style.display = "none";

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
    const movieInfo = document.createElement("div");
    movieInfo.className = "movie-info";

    const date = new Date(movie.release_date);
    const formattedDate = `${date.getDate()}/${
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
};

const createAndSetUpCard = async (
  movie: Movie,
  smallCard = false,
  noHover = false
) => {
  const card = await createMovieCard(movie);

  if (!card) {
    return;
  }

  if (smallCard) {
    card.classList.add("small-card");
  }

  addEventListenersToCard(card, movie);

  const ctaDetails = card.querySelector(".cta-details") as HTMLElement;
  if (!ctaDetails) {
    return;
  }

  if (noHover) {
    ctaDetails.onmouseenter = null;
    ctaDetails.onmouseleave = null;
  }

  return card;
};

export { createMovieCard, createAndSetUpCard };
