// components/SortSelector.js

import { sortMovies } from "../helpers/sortMovies.js";

const sortSelectorContainer = document.getElementById(
  "sort-selector-container"
);

if (!sortSelectorContainer) {
  console.error("Could not find sort selector container");
} else {
  console.log("Found sort selector container", sortSelectorContainer);
}

// Define the sorting parameters
const sortParamKeys = ["title", "release_date", "vote_average", "popularity"];
const sortParamDisplayNames = [
  "Title",
  "Release Date",
  "Average Vote",
  "Popularity",
];

// Create the HTML for the dropdown selector
let sortSelector = document.createElement("select");
sortSelector.id = "sortSelector"; // Assign an id to the sortSelector element
sortParamKeys.forEach((sortParam, index) => {
  const option = document.createElement("option");
  option.value = sortParam;
  option.textContent = sortParamDisplayNames[index]; // use the display name instead of the sort parameter
  sortSelector.appendChild(option);
});

console.log("Created sort selector", sortSelector);

sortSelector.addEventListener("change", (e) => {
  const movieListContainer = document.getElementById("movie-list-container");
  let currentMovies = Array.from(movieListContainer.children);

  let sortedMovies = sortMovies(currentMovies, e.target.value);

  movieListContainer.innerHTML = ""; // Clear the container

  // Append the sorted movie cards to the container
  sortedMovies.forEach((card) => movieListContainer.appendChild(card));
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Use smooth scrolling behavior for a smooth scroll animation
  });
});

sortSelectorContainer.appendChild(sortSelector);
