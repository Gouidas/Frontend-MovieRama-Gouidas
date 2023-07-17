import { fetchActors } from "../../api/index";
import { createActorCard } from "../../components/actorCard";
import { Actor } from "../../types/index";
import {
  handleClickMoreActors,
  setActors,
  setDisplayedActorsCount,
  resetActorsDisplay,
} from "../eventHandlers/handleClickMoreActors";

// Set the initial displayed actors count to 5
setDisplayedActorsCount(5);

export async function fetchAndDisplayActors(
  movieId: string | number
): Promise<void> {
  // Fetch the actors for the movie using the API
  const actors = await fetchActors(movieId);
  let allActors = actors.cast;

  // Reset the actors display settings
  resetActorsDisplay();

  // Set the fetched actors to the global state
  setActors(actors.cast);

  // Get the cast section element from the webpage
  const castSection = document.getElementById("cast-section");

  if (!allActors || allActors.length === 0) {
    // If no actors are available, display a message on the webpage
    castSection!.innerHTML = "No cast available for this movie.";
  } else {
    // Display the first 5 actors on the webpage
    let displayedActorsCount = 5;
    allActors.slice(0, displayedActorsCount).forEach((actor: Actor) => {
      const actorCard = createActorCard(actor);
      castSection!.appendChild(actorCard);
    });

    // Get the show more button element
    const showMoreButton = document.getElementById("show-more-button");

    if (allActors.length <= 5) {
      // If there are no more actors to display, hide the show more button
      showMoreButton!.style.display = "none";
    } else {
      // If there are more actors to display, show the show more button
      showMoreButton!.style.display = "block";
      // Add an event listener to the show more button to handle click events
      showMoreButton!.addEventListener("click", handleClickMoreActors);
    }
  }
}
