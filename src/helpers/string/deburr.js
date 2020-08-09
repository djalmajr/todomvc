/**
 * Remove accents from a string.
 *
 * @example
 *
 * deburr('ímã'); // returns ima
 *
 * @param {string} str string with accents
 * @returns string without accents
 */
export const deburr = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
