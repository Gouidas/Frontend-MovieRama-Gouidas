// Function to create an error message component
export const createErrorComponent = (message: string): HTMLDivElement => {
  const errorDiv: HTMLDivElement = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;

  document.body.appendChild(errorDiv);

  // Remove the error message after 3 seconds
  setTimeout(() => {
    if (document.body.contains(errorDiv)) {
      document.body.removeChild(errorDiv);
    }
  }, 3000);

  return errorDiv;
};
