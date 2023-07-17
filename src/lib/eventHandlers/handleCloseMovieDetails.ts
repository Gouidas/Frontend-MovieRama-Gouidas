export const closeMovieDetails = (): void => {
  // Get the movie detail box element
  const detailBox = document.getElementById("movie-detail-box") as HTMLElement;

  // Hide the movie detail box
  detailBox.style.display = "none";
  detailBox.classList.remove("show");

  // Get the backdrop element
  const backdrop = document.getElementById("backdrop") as HTMLElement;

  // Hide the backdrop
  backdrop.style.display = "none";

  // Remove the "no-scroll" class from the body to enable scrolling
  document.body.classList.remove("no-scroll");
};
