// import { fetchSimilarMovies } from "../api/index.js";
// import { createSimilarMovie } from "../components/similarMovie.js";
// import handleClickOnSimilarMovie from "./eventHandlers/handleClickOnSimilarMovie.js";
// import { createErrorComponent } from "../components/createErrorComponent.js";

// async function addSimilarMovies(movieId) {
//   let similarMovies;
//   try {
//     similarMovies = await fetchSimilarMovies(movieId);
//   } catch (error) {
//     throw new Error("Failed to fetch similar movies");
//   }

//   if (similarMovies.results.length === 0) {
//     document.getElementById("similar-movies-section").innerHTML =
//       "No similar movies found.";
//     return;
//   }

//   for (let similarMovie of similarMovies.results) {
//     let similarMovieCard;
//     try {
//       similarMovieCard = await createSimilarMovie(similarMovie);
//     } catch (error) {
//       throw new Error("Failed to create similar movie card");
//     }

//     document
//       .getElementById("similar-movies-section")
//       .appendChild(similarMovieCard);

//     // Add an event listener to this card
//     similarMovieCard.addEventListener("click", async () => {
//       handleClickOnSimilarMovie(similarMovie);
//     });
//   }
// }

// export default addSimilarMovies;
