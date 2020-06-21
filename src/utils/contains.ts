import { deburr } from './deburr';

export const contains = (str: string, query: string) =>
  deburr(str).toLowerCase().includes(deburr(query).toLowerCase());
