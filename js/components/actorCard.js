import { truncateText } from "../helpers/truncateText.js";

export function createActorCard(actor) {
  const actorCard = document.createElement("div");
  actorCard.innerHTML = `
    <img src="https://image.tmdb.org/t/p/original${actor.profile_path}" alt="${
    actor.name
  }" onerror="this.onerror=null; this.src='../../assets/images/actor_img_not_found.jpg';" />
    <p class="actorName">${truncateText(actor.name, 12)}</p>
  `;
  return actorCard;
}
