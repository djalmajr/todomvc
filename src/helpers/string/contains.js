import { deburr } from "./deburr";

export const contains = (str, query) =>
  deburr(str).toLowerCase().includes(deburr(query).toLowerCase());
