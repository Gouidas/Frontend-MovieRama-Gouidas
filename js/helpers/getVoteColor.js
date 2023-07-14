export function getVoteColor(vote_average) {
  const voteColors = [
    { limit: 1, color: "#0000FF" }, // Blue
    { limit: 2, color: "#0080FF" }, // Azure
    { limit: 3, color: "#00FFFF" }, // Cyan
    { limit: 4, color: "#00FF80" }, // Spring Green
    { limit: 5, color: "#00FF00" }, // Green
    { limit: 6, color: "#80FF00" }, // Chartreuse
    { limit: 7, color: "#FFFF00" }, // Yellow
    { limit: 8, color: "#FF8000" }, // Orange
    { limit: 9, color: "#FF0000" }, // Red
    { limit: 10, color: "#800000" }, // Maroon
  ];

  const color = voteColors.find((item) => vote_average <= item.limit)?.color;
  return color || voteColors[voteColors.length - 1].color;
}
