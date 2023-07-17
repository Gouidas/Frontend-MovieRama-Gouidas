export const truncateText = (text: string, maxLength: number): string => {
  // Check if the text length exceeds the maximum length
  if (text.length > maxLength) {
    // Truncate the text and add ellipsis
    return `${text.substring(0, maxLength)}...`;
  }
  // Return the original text if it doesn't exceed the maximum length
  return text;
};
