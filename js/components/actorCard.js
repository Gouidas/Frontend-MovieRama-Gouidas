import { truncateText } from "../helpers/truncateText.js";
import { ACTORS_IMAGE_URL } from "../../constants.js";

export function createActorCard(actor) {
  const actorCard = document.createElement("div");
  actorCard.innerHTML = `
    <img src="${ACTORS_IMAGE_URL}${actor.profile_path}" alt="${
    actor.name
  }" onerror="this.onerror=null; this.src='../../assets/images/actor_img_not_found.jpg';" />
    <p class="actorName">${truncateText(actor.name, 12)}</p>
  `;
  return actorCard;
}
