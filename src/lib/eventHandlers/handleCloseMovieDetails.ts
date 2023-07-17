export const closeMovieDetails = (): void => {
  const detailBox = document.getElementById("movie-detail-box") as HTMLElement;
  detailBox.style.display = "none";
  detailBox.classList.remove("show");

  const backdrop = document.getElementById("backdrop") as HTMLElement;
  backdrop.style.display = "none";

  document.body.classList.remove("no-scroll");
};
