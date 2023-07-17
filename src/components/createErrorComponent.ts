export const createErrorComponent = (message: string): HTMLDivElement => {
  const errorDiv: HTMLDivElement = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;

  document.body.appendChild(errorDiv);
  setTimeout(() => {
    if (document.body.contains(errorDiv)) {
      document.body.removeChild(errorDiv);
    }
  }, 3000);

  return errorDiv;
};
