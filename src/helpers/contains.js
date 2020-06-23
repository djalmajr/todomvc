import { deburr } from "./deburr.js";

export const contains = (str, query) =>
  deburr(str).toLowerCase().includes(deburr(query).toLowerCase());
