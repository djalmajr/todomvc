export default function flow(...fns) {
  return (x) => fns.reduce((y, f) => f(y), x);
}
