export const flow = (...fns) => (x) => fns.reduce((y, f) => f(y), x);
