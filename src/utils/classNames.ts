export const classNames = (...args: unknown[]) =>
  args.filter(Boolean).join(' ');
