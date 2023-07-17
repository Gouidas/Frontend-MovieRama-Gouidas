import { truncateText } from "../lib/truncateText";
import { IMAGE_URL } from "../lib/constants";
import { Actor } from "../types/index";

export const createActorCard = (actor: Actor): HTMLDivElement => {
  const actorCard: HTMLDivElement = document.createElement("div");
  actorCard.innerHTML = `
    <img src="${IMAGE_URL}${actor.profile_path}" alt="${
    actor.name
  }" onerror="this.onerror=null; this.src='/assets/images/actor_img_not_found.jpg';" />
    <p class="actorName">${truncateText(actor.name, 12)}</p>
  `;
  return actorCard;
};
