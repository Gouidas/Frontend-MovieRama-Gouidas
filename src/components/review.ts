// Import necessary modules and types
import { truncateText } from "../lib/truncateText";
import { Review } from "../types/index";

// Function to create a review element
export const createReview = (review: Review): HTMLElement => {
  const reviewElement = document.createElement("div");
  reviewElement.className = "review";

  // Create and append author element
  const authorElement = document.createElement("p");
  authorElement.textContent = review.author;
  authorElement.className = "review-author";
  reviewElement.appendChild(authorElement);

  // Create and append content element
  const contentElement = document.createElement("p");
  contentElement.className = "review-content";

  if (review.content.length > 200) {
    // Truncate content if it exceeds 200 characters
    const truncatedContent = truncateText(review.content, 200);
    contentElement.textContent = truncatedContent;

    // Create "Read More" link
    const readMoreLink = document.createElement("span");
    readMoreLink.innerText = "Read More";
    readMoreLink.className = "read-more-btn";

    // Add event listener to expand the content when clicked
    readMoreLink.addEventListener("click", (e) => {
      e.preventDefault();
      contentElement.textContent = review.content;
      readMoreLink.remove();
    });

    // Append content and "Read More" link to review element
    reviewElement.appendChild(contentElement);
    reviewElement.appendChild(readMoreLink);
  } else {
    // If content length is within limit, display the full content
    contentElement.textContent = review.content;
    reviewElement.appendChild(contentElement);
  }

  return reviewElement;
};
