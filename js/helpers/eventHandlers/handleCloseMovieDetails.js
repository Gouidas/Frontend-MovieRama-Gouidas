export function closeMovieDetails() {
  const detailBox = document.getElementById("movie-detail-box");
  detailBox.style.display = "none";
  detailBox.classList.remove("show");

  const backdrop = document.getElementById("backdrop");
  backdrop.style.display = "none";

  document.body.classList.remove("no-scroll");
}
