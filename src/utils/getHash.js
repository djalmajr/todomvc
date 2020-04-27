export const getHash = () => {
  const str = (window.location.hash.match(/\w+/g) || [])[0];

  return str !== "completed" && str !== "active" ? "all" : str;
};
