export default function cleanCRLF(val) {
  return val.replace(/\r\n|\n|\r|\s+/g, " ");
}
