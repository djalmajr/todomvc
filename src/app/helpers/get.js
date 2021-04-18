import curry from './curry';

// https://github.com/developit/dlv

export default curry((arr, src) => {
  arr.split && (arr = arr.split('.'));

  for (let i = 0, l = arr.length; i < l; i++) {
    src = src ? src[arr[i]] : void 0;
  }

  return src;
});
