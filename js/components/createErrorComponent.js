export function createErrorComponent(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message"; // Apply your own styling
  errorDiv.textContent = message;

  // Add error message to body and remove after 3 seconds
  document.body.appendChild(errorDiv);
  setTimeout(() => {
    if (document.body.contains(errorDiv)) {
      document.body.removeChild(errorDiv);
    }
  }, 3000);

  return errorDiv;
}
