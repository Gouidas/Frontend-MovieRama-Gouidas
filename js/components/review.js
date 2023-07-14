import { truncateText } from "../helpers/truncateText.js";

export function createReview(review) {
  let reviewElement = document.createElement("div");
  reviewElement.className = "review";

  let authorElement = document.createElement("p");
  authorElement.textContent = review.author;
  authorElement.className = "review-author";
  reviewElement.appendChild(authorElement);

  let contentElement = document.createElement("p");
  contentElement.className = "review-content";

  if (review.content.length > 200) {
    let truncatedContent = truncateText(review.content, 200);
    contentElement.textContent = truncatedContent;

    let readMoreLink = document.createElement("span");
    readMoreLink.innerText = "Read More";
    readMoreLink.className = "read-more-btn";
    readMoreLink.addEventListener("click", function (e) {
      e.preventDefault();
      contentElement.textContent = review.content;
      this.remove();
    });
    reviewElement.appendChild(contentElement);
    reviewElement.appendChild(readMoreLink);
  } else {
    contentElement.textContent = review.content;
    reviewElement.appendChild(contentElement);
  }

  return reviewElement;
}
