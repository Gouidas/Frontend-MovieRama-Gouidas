import { createActorCard } from "../../components/actorCard.js";

let allActors = [];
export let displayedActorsCount = 0;

export function setActors(actors) {
  allActors = actors;
}

export function setDisplayedActorsCount(count) {
  displayedActorsCount = count;
}

export function resetActorsDisplay() {
  displayedActorsCount = 5;
}

export function handleClickMoreActors() {
  console.log("click on show all cast");
  const castSection = document.getElementById("cast-section");
  const additionalActors = allActors.slice(displayedActorsCount);

  additionalActors.forEach((actor) => {
    const actorCard = createActorCard(actor);
    castSection.appendChild(actorCard);
  });

  // Now all actors are displayed
  displayedActorsCount = allActors.length;
  // As all actors have been displayed, hide the "Show More" button
  const showMoreButton = document.getElementById("show-more-button");
  showMoreButton.style.display = "none";
}
