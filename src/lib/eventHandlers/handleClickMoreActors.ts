import { createActorCard } from "../../components/actorCard";
import { Actor } from "../../types/index";

// Array to store all actors
let allActors: Actor[] = [];

// Variable to keep track of the number of displayed actors
export let displayedActorsCount: number = 0;

// Function to set the array of actors
export const setActors = (actors: Actor[]): void => {
  allActors = actors;
};

// Function to set the number of displayed actors
export const setDisplayedActorsCount = (count: number): void => {
  displayedActorsCount = count;
};

// Function to reset the number of displayed actors to a default value
export const resetActorsDisplay = (): void => {
  displayedActorsCount = 5;
};

// Function to handle the click event for the "Show More" button
export const handleClickMoreActors = (): void => {
  // Get the cast section element
  const castSection = document.getElementById("cast-section");

  // Get the additional actors to be displayed
  const additionalActors = allActors.slice(displayedActorsCount);

  // Create actor cards for each additional actor and append them to the cast section
  additionalActors.forEach((actor: Actor) => {
    const actorCard = createActorCard(actor);
    castSection?.appendChild(actorCard);
  });

  // Update the displayed actors count
  displayedActorsCount = allActors.length;

  // Hide the "Show More" button
  const showMoreButton = document.getElementById("show-more-button");
  showMoreButton!.style.display = "none";
};
