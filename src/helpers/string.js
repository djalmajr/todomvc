import { curryN } from "./function";

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

export const contains = (str, query) =>
  deburr(str).toLowerCase().includes(deburr(query).toLowerCase());

export const template = curryN(2, (str, obj) => {
  return str.replace(/{{\s*?(.+?)\s*?}}/g, (_, k) => obj[k.trim()]);
  // return str.replace(/{(.+?)}/g, (_, k) => obj[k]);
});
