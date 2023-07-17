export const API_KEY = process.env.API_KEY; // API key for accessing movie data
export const BASE_URL = process.env.BASE_URL; // Base URL for the movie API
export const BASE_URL_MOVIE = `${BASE_URL}/movie/`; // URL for movie details
export const BASE_URL_MOVIE_SEARCH = `${BASE_URL}/search/movie`; // URL for movie search
export const IMAGE_URL = process.env.IMAGE_URL; // Base URL for movie images
export const YOUTUBE_URL = process.env.YOUTUBE_URL; // Base URL for YouTube videos

// Sort parameter keys used for sorting movies
export const SORT_PARAM_KEYS = [
  "title",
  "release_date",
  "vote_average",
  "popularity",
];

// Display names for the sort parameters
export const SORT_PARAM_DISPLAY_NAMES = [
  "Title",
  "Release Date",
  "Average Vote",
  "Popularity",
];
