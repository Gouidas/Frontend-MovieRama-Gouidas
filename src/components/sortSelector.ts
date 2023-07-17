import { sortMovies } from "../lib/sortMovies";
import { SORT_PARAM_KEYS, SORT_PARAM_DISPLAY_NAMES } from "../lib/constants";

const sortSelectorContainer = document.getElementById(
  "sort-selector-container"
) as HTMLElement;

if (!sortSelectorContainer) {
  console.error("Could not find sort selector container");
} else {
  console.log("Found sort selector container", sortSelectorContainer);
}

let sortSelector = document.createElement("select");
sortSelector.id = "sortSelector";

SORT_PARAM_KEYS.forEach((sortParam, index) => {
  const option = document.createElement("option");
  option.value = sortParam;
  option.textContent = SORT_PARAM_DISPLAY_NAMES[index];
  sortSelector.appendChild(option);
});

sortSelector.addEventListener("change", (e) => {
  const movieListContainer = document.getElementById(
    "movie-list-container"
  ) as HTMLElement;
  let currentMovies = Array.from(movieListContainer.children) as HTMLElement[];

  let sortedMovies = sortMovies(
    currentMovies,
    (e.target as HTMLOptionElement).value
  );

  movieListContainer.innerHTML = "";

  sortedMovies.forEach((card) => movieListContainer.appendChild(card));
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

sortSelectorContainer.appendChild(sortSelector);
