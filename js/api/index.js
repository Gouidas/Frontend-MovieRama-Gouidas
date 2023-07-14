import {
  API_KEY,
  YOUTUBE_URL,
  BASE_URL_MOVIE,
  BASE_URL_MOVIE_SEARCH,
} from "../../constants.js";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchMovies(pageNumber = 1) {
  try {
    return await fetchData(
      `${BASE_URL_MOVIE}/now_playing?api_key=${API_KEY}&page=${pageNumber}`
    );
  } catch (error) {
    throw new Error(`Failed to fetch movies: ${error}`);
  }
}

export async function searchMovies(query, pageNumber = 1) {
  try {
    const data = await fetchData(
      `${BASE_URL_MOVIE_SEARCH}?api_key=${API_KEY}&query=${query}&page=${pageNumber}`
    );

    // Sort the search results by title
    data.results.sort((a, b) => a.title.localeCompare(b.title));

    return data;
  } catch (error) {
    throw new Error(`Failed to search movies: ${error}`);
  }
}

export async function fetchMovieDetails(movieId) {
  try {
    // Check if the movie details data already exists in local storage
    const cachedMovieDetails = localStorage.getItem(`movie-${movieId}-details`);

    if (cachedMovieDetails) {
      console.log("Loading movie details from cache");
      // Parse the stringified data back into JavaScript object
      return JSON.parse(cachedMovieDetails);
    } else {
      console.log("Fetching movie details from API");
      const movieDetails = await fetchData(
        `${BASE_URL_MOVIE}${movieId}?api_key=${API_KEY}`
      );
      // Store the fetched data in local storage for future use
      // Stringify the JavaScript object into JSON string
      localStorage.setItem(
        `movie-${movieId}-details`,
        JSON.stringify(movieDetails)
      );

      return movieDetails;
    }
  } catch (error) {
    throw new Error(`Failed to fetch movie details: ${error}`);
  }
}

export async function fetchMovieReviews(movieId) {
  try {
    return await fetchData(
      `${BASE_URL_MOVIE}${movieId}/reviews?api_key=${API_KEY}`
    );
  } catch (error) {
    throw new Error(`Failed to fetch movie reviews: ${error}`);
  }
}

export async function fetchSimilarMovies(movieId) {
  try {
    // Check if the similar movies data already exists in local storage
    const cachedSimilarMovies = localStorage.getItem(
      `movie-${movieId}-similar-movies`
    );

    if (cachedSimilarMovies) {
      console.log("Loading similar movies from cache");
      // Parse the stringified data back into JavaScript object
      return JSON.parse(cachedSimilarMovies);
    } else {
      console.log("Fetching similar movies from API");
      const similarMovies = await fetchData(
        `${BASE_URL_MOVIE}${movieId}/similar?api_key=${API_KEY}`
      );
      // Store the fetched data in local storage for future use
      // Stringify the JavaScript object into JSON string
      localStorage.setItem(
        `movie-${movieId}-similar-movies`,
        JSON.stringify(similarMovies)
      );

      return similarMovies;
    }
  } catch (error) {
    throw new Error(`Failed to fetch similar movies: ${error}`);
  }
}

export async function fetchAndCacheMovieTrailer(movieId) {
  try {
    if (localStorage.getItem(`movie-${movieId}-trailer`)) {
      console.log("Loading trailer from cache");
      return localStorage.getItem(`movie-${movieId}-trailer`);
    } else {
      console.log("Fetching trailer from API");
      const data = await fetchData(
        `${BASE_URL_MOVIE}${movieId}/videos?api_key=${API_KEY}`
      );
      const youtubeTrailer = data.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );

      if (youtubeTrailer) {
        const trailerUrl = `${YOUTUBE_URL}${youtubeTrailer.key}`;
        console.log("Caching trailer URL", trailerUrl);
        localStorage.setItem(`movie-${movieId}-trailer`, trailerUrl);

        return trailerUrl;
      }
    }
  } catch (error) {
    throw new Error(`Failed to fetch and cache movie trailer: ${error}`);
  }
}

export async function fetchActors(movieId) {
  try {
    // Check if the actors data already exists in local storage
    const cachedActors = localStorage.getItem(`movie-${movieId}-actors`);

    if (cachedActors) {
      console.log("Loading actors from cache");
      // Parse the stringified data back into JavaScript object
      return JSON.parse(cachedActors);
    } else {
      console.log("Fetching actors from API");
      const actors = await fetchData(
        `${BASE_URL_MOVIE}${movieId}/credits?api_key=${API_KEY}`
      );
      // Store the fetched data in local storage for future use
      // Stringify the JavaScript object into JSON string
      localStorage.setItem(`movie-${movieId}-actors`, JSON.stringify(actors));

      return actors;
    }
  } catch (error) {
    throw new Error(`Failed to fetch /credits movies: ${error}`);
  }
}
