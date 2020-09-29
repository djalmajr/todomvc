import deburr from "./deburr.js";

export default function contains(str, query) {
  return deburr(str).toLowerCase().includes(deburr(query).toLowerCase());
}
