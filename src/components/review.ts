import { truncateText } from "../lib/truncateText";
import { Review } from "../types/index";

export const createReview = (review: Review): HTMLElement => {
  const reviewElement = document.createElement("div");
  reviewElement.className = "review";

  const authorElement = document.createElement("p");
  authorElement.textContent = review.author;
  authorElement.className = "review-author";
  reviewElement.appendChild(authorElement);

  const contentElement = document.createElement("p");
  contentElement.className = "review-content";

  if (review.content.length > 200) {
    const truncatedContent = truncateText(review.content, 200);
    contentElement.textContent = truncatedContent;

    const readMoreLink = document.createElement("span");
    readMoreLink.innerText = "Read More";
    readMoreLink.className = "read-more-btn";
    readMoreLink.addEventListener("click", (e) => {
      e.preventDefault();
      contentElement.textContent = review.content;
      readMoreLink.remove();
    });
    reviewElement.appendChild(contentElement);
    reviewElement.appendChild(readMoreLink);
  } else {
    contentElement.textContent = review.content;
    reviewElement.appendChild(contentElement);
  }

  return reviewElement;
};
