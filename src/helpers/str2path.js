export default function str2path(str) {
  const rx1 = /[.|\]|[]/g;
  const rx2 = /[^a-zA-Z0-9_.[\]]/g;

  return str.replace(rx2, "").split(rx1).filter(Boolean);
}
