import { fetchActors } from "../../api/index";
import { createActorCard } from "../../components/actorCard";
import { Actor } from "../../types/index";
import {
  handleClickMoreActors,
  setActors,
  setDisplayedActorsCount,
  resetActorsDisplay,
} from "../eventHandlers/handleClickMoreActors";

setDisplayedActorsCount(5);

export async function fetchAndDisplayActors(
  movieId: string | number
): Promise<void> {
  const actors = await fetchActors(movieId);
  let allActors = actors.cast;
  resetActorsDisplay();
  setActors(actors.cast);

  const castSection = document.getElementById("cast-section");

  if (!allActors || allActors.length === 0) {
    castSection!.innerHTML = "No cast available for this movie.";
  } else {
    let displayedActorsCount = 5;
    allActors.slice(0, displayedActorsCount).forEach((actor: Actor) => {
      const actorCard = createActorCard(actor);
      castSection!.appendChild(actorCard);
    });

    const showMoreButton = document.getElementById("show-more-button");

    if (allActors.length <= 5) {
      showMoreButton!.style.display = "none";
    } else {
      showMoreButton!.style.display = "block";
      showMoreButton!.addEventListener("click", handleClickMoreActors);
    }
  }
}
