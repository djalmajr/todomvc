export default function cleanSpaces(val) {
  return val.split(/^ +/m).join('').trim();
}
