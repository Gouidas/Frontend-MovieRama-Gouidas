import { searchMovies } from "../api/index.js";
import { createAndSetUpCard } from "./movieCard.js";
import { loadMovies } from "../main.js";
import { state } from "../helpers/currentSearchQuery.js";
import { createErrorComponent } from "./createErrorComponent.js";

const searchContainer = document.getElementById("search-container");
searchContainer.innerHTML = `
    <input type="text" id="search" placeholder="Search for movies..." />
`;

let searchBox = document.getElementById("search");
let timeout = null;

searchBox.addEventListener("keyup", function (e) {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    handleSearch(e.target.value);
  }, 500);
});

async function handleSearch(query) {
  state.currentSearchQuery = query;
  const movieListContainer = document.getElementById("movie-list-container");
  movieListContainer.innerHTML = ""; // Clear the container before new search

  try {
    if (query !== "") {
      const searchResults = await searchMovies(query);
      const movieCards = await Promise.all(
        searchResults.results.map((movie) => createAndSetUpCard(movie))
      );

      if (movieCards.length === 0) {
        movieListContainer.innerHTML =
          "<p class=no-movies>We couldn't find any movies matching your search.</p>";
      } else {
        movieCards.forEach((card) => movieListContainer.appendChild(card));
      }

      // Set the sortSelector to "title"
      document.getElementById("sortSelector").value = "title";
    } else {
      console.log("clear");
      loadMovies(); // Call the loadMovies function defined in main.js
    }
  } catch (error) {
    const errorComponent = createErrorComponent(error.message);
    document.body.appendChild(errorComponent);
    setTimeout(() => {
      if (document.body.contains(errorComponent)) {
        document.body.removeChild(errorComponent);
      }
    }, 4000);
  }
}
