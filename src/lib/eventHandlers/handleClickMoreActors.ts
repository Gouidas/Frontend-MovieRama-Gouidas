import { createActorCard } from "../../components/actorCard";
import { Actor } from "../../types/index";

let allActors: Actor[] = [];
export let displayedActorsCount: number = 0;

export const setActors = (actors: Actor[]): void => {
  allActors = actors;
};

export const setDisplayedActorsCount = (count: number): void => {
  displayedActorsCount = count;
};

export const resetActorsDisplay = (): void => {
  displayedActorsCount = 5;
};

export const handleClickMoreActors = (): void => {
  const castSection = document.getElementById("cast-section");
  const additionalActors = allActors.slice(displayedActorsCount);

  additionalActors.forEach((actor: Actor) => {
    const actorCard = createActorCard(actor);
    castSection?.appendChild(actorCard);
  });

  displayedActorsCount = allActors.length;
  const showMoreButton = document.getElementById("show-more-button");
  showMoreButton!.style.display = "none";
};
