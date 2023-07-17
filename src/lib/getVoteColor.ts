export const getVoteColor = (vote_average: number): string => {
  const voteColors = [
    { limit: 1, color: "#0000FF" },
    { limit: 2, color: "#0080FF" },
    { limit: 3, color: "#00FFFF" },
    { limit: 4, color: "#00FF80" },
    { limit: 5, color: "#00FF00" },
    { limit: 6, color: "#80FF00" },
    { limit: 7, color: "#FFFF00" },
    { limit: 8, color: "#FF8000" },
    { limit: 9, color: "#FF0000" },
    { limit: 10, color: "#800000" },
  ];

  const color = voteColors.find((item) => vote_average <= item.limit)?.color;
  return color || voteColors[voteColors.length - 1].color;
};
