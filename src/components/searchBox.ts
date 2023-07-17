// Import necessary modules and types
import { searchMovies } from "../api/index";
import { createAndSetUpCard } from "./movieCard";
import { loadMovies } from "../main";
import { state } from "../lib/currentSearchQuery";
import { createErrorComponent } from "./createErrorComponent";
import { Movie } from "../types/index";

// Get the search container element and add the search input field
const searchContainer = document.getElementById("search-container");
if (searchContainer) {
  searchContainer.innerHTML = `
    <input type="text" id="search" placeholder="Search for movies..." />
  `;
}

// Get the search box element
const searchBox = document.getElementById("search");
let timeout: NodeJS.Timeout | undefined;

if (searchBox) {
  // Add event listener to the search box for handling search input
  searchBox.addEventListener("keyup", (e) => {
    clearTimeout(timeout);
    const target = e.target as HTMLInputElement;
    timeout = setTimeout(() => {
      handleSearch(target.value);
    }, 500);
  });
}

// Function to handle movie search
const handleSearch = async (query: string) => {
  // Update the current search query in the application state
  state.currentSearchQuery = query;

  // Clear the movie list container
  const movieListContainer = document.getElementById("movie-list-container");
  if (movieListContainer) {
    movieListContainer.innerHTML = "";
  }

  try {
    if (query !== "") {
      // Perform movie search
      const searchResults = await searchMovies(query);
      const movieCards = await Promise.all(
        searchResults.results.map((movie: Movie) => createAndSetUpCard(movie))
      );

      if (movieListContainer) {
        if (movieCards.length === 0) {
          // Display message if no movies found
          movieListContainer.innerHTML =
            "<p class=no-movies>We couldn't find any movies matching your search.</p>";
        } else {
          // Append movie cards to the movie list container
          movieCards.forEach((card) => {
            if (card) {
              movieListContainer.appendChild(card);
            }
          });
        }
      }

      const sortSelector = document.getElementById(
        "sortSelector"
      ) as HTMLSelectElement;
      if (sortSelector) {
        sortSelector.value = "title";
      }
    } else {
      // If query is empty, load all movies
      loadMovies();
    }
  } catch (error: any) {
    // Handle error and display error message
    const errorComponent = createErrorComponent(error.message);
    document.body.appendChild(errorComponent);
    setTimeout(() => {
      if (document.body.contains(errorComponent)) {
        document.body.removeChild(errorComponent);
      }
    }, 4000);
  }
};
