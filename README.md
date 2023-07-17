MovieRama - Movie Catalog Web Application

MovieRama is a web application that allows users to explore and discover movies. It provides a user-friendly interface for browsing movies that are currently playing in theaters, searching for movies by title, and viewing detailed information about each movie.

Features:

1. In Theaters:

   - Users can browse a list of movies currently playing in theaters.
   - Each movie is displayed with basic information such as the poster, title, release year, genre(s), vote average, and overview.
   - Infinite scrolling is implemented to load more movies as the user scrolls down the page.

2. Movie Search:

   - Users can search for movies by typing part of the movie title in the search box.
   - As users type, the search results are updated in real-time.
   - Infinite scrolling is implemented to load more search results as the user scrolls down the page.

3. Movie Details:

   - Users can click on a movie from the list to view more information about it.
   - Clicking on a movie opens a modal that displays detailed information about the movie, including:
     - Title
     - Release Year
     - Vote average
     - Overview
     - Video Trailer (if available)
     - Reviews (up to 2)
     - Similar Movies
     - Actors

4. Sorting Options:

   - Users can sort the movie list by title, release date, average vote, or popularity.

5. Preview on Video Hover:

   - When users hover over a movie trailer video, a preview of the video is shown.
   - This allows users to get a glimpse of the video content without clicking or playing the full video.

6. Actors Information:
   - Movie details include information about the actors involved in the movie.

Architecture and Technologies:

MovieRama is a client-side-only, single-page application built using HTML, CSS, and JavaScript. TypeScript is also utilized to enhance development with static typing and modern ECMAScript features. The application consumes The Movie DB (MDB) JSON API as the data source.

- HTML5: Markup language for structuring the web pages.
- CSS3: Stylesheet language for designing the application's user interface.
- JavaScript: Programming language for implementing the application's functionality.
- TypeScript: Superset of JavaScript that adds static typing and other advanced features.
- ECMAScript 6 (ES6): Modern JavaScript syntax with features like arrow functions, template literals, destructuring, and modules.

The application follows an event-driven and data-driven approach, focusing on efficiently manipulating the DOM to dynamically render movie cards, search results, and handle user interactions. Reusability and clean code practices are emphasized throughout the project to promote maintainability and extensibility.

How to Run:

To run the application locally, follow these steps:

1. Clone the project repository:
   git clone https://github.com/Gouidas/Frontend-MovieRama-Gouidas.git

2. Open the project directory:
   cd Frontend-MovieRama-Gouidas

3. Install dependencies:
   npm install

4. Create .env file in root directory, add and save
   API_KEY=YOUR_API_KEY
   BASE_URL=https://api.themoviedb.org/3
   IMAGE_URL=https://image.tmdb.org/t/p/original
   YOUTUBE_URL=https://www.youtube.com/embed/

5. Start the development server:
   npm start

6. Visit http://localhost:8082/ in a web browser.

Note: Since MovieRama is a client-side-only application, it doesn't require a backend server. The data is fetched from The Movie DB (MDB) JSON API directly.

Contributions:

Contributions to MovieRama are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request on the project's GitHub repository.

License:

This project is licensed under the MIT License.

Acknowledgments:

- The movie data used in MovieRama is provided by The Movie Database (TMDB).
