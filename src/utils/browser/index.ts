export const isSafariBrowser = (): boolean =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
