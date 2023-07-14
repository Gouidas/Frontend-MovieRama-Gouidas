import { fetchActors } from "../../api/index.js";
import { createActorCard } from "../../components/actorCard.js";
import {
  handleClickMoreActors,
  setActors,
  setDisplayedActorsCount,
  resetActorsDisplay,
} from "../eventHandlers/handleClickMoreActors.js";

setDisplayedActorsCount(5);

export async function fetchAndDisplayActors(movieId) {
  const actors = await fetchActors(movieId);
  let allActors = actors.cast;
  resetActorsDisplay();
  setActors(actors.cast);
  // Ensure your movie detail box has a cast-section in its template
  const castSection = document.getElementById("cast-section");

  if (!allActors || allActors.length === 0) {
    castSection.innerHTML = "No cast available for this movie.";
  } else {
    let displayedActorsCount = 5;
    allActors.slice(0, displayedActorsCount).forEach((actor) => {
      const actorCard = createActorCard(actor);
      castSection.appendChild(actorCard);
    });

    const showMoreButton = document.getElementById("show-more-button");

    // Hide the 'Show all actors' button if there are less than 6 actors.
    if (allActors.length <= 5) {
      showMoreButton.style.display = "none";
    } else {
      showMoreButton.style.display = "block";
      showMoreButton.addEventListener("click", handleClickMoreActors);
    }
  }
}
