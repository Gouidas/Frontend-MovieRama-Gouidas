import { sortMovies } from "../lib/sortMovies";
import { SORT_PARAM_KEYS, SORT_PARAM_DISPLAY_NAMES } from "../lib/constants";

// Find the sort selector container element
const sortSelectorContainer = document.getElementById(
  "sort-selector-container"
) as HTMLElement;

if (!sortSelectorContainer) {
  console.error("Could not find sort selector container");
} else {
  console.log("Found sort selector container", sortSelectorContainer);
}

// Create a select element for the sort selector
let sortSelector = document.createElement("select");
sortSelector.id = "sortSelector";

// Add options to the sort selector based on SORT_PARAM_KEYS and SORT_PARAM_DISPLAY_NAMES arrays
SORT_PARAM_KEYS.forEach((sortParam, index) => {
  const option = document.createElement("option");
  option.value = sortParam;
  option.textContent = SORT_PARAM_DISPLAY_NAMES[index];
  sortSelector.appendChild(option);
});

// Event listener for sort selector change
sortSelector.addEventListener("change", (e) => {
  const movieListContainer = document.getElementById(
    "movie-list-container"
  ) as HTMLElement;
  let currentMovies = Array.from(movieListContainer.children) as HTMLElement[];

  // Sort the movies based on the selected value from the sort selector
  let sortedMovies = sortMovies(
    currentMovies,
    (e.target as HTMLOptionElement).value
  );

  // Clear the movie list container
  movieListContainer.innerHTML = "";

  // Append the sorted movie cards to the movie list container
  sortedMovies.forEach((card) => movieListContainer.appendChild(card));

  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Append the sort selector to the sort selector container
sortSelectorContainer.appendChild(sortSelector);
