export const reverceString = (text: string) =>
  text.split('').reverse().join('');

const halfToFullWidthCharacters = (text: string) =>
  text.replace(/[!-~]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0xfee0));

export const getCharLength = (str: string) => {
  str = str === null ? '' : str;
  console.log(str);
  return str
    .split('')
    .reduce(
      (previous, current) =>
        encodeURI(current).length > 1 && encodeURI(current) !== '%0A'
          ? previous + 1
          : previous + 0.5,
      0
    );
};

export const conv2TateTweet = (str: string) =>
  reverceString(halfToFullWidthCharacters(str));
