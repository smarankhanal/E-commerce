export const toCapitalize = (str) => {
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};
