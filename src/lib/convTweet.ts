export const reverceString = (text: string) =>
  text.split('').reverse().join('');

const halfToFullWidthCharacters = (text: string) =>
  text.replace(/[!-~]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0xfee0));

export const getCharLength = (str: string) => {
  str = str === null ? '' : str;
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

export const conv2TateTweet = (str: string, wideLineSpacing:'none'|'half'|'full' = 'full') => {
  let stringArray: string[][] = [];

  // 文字列を全角に変換した上で、各行、各文字を二次元配列に格納する
  let existString = false;
  halfToFullWidthCharacters(str)
    .split('')
    .map((value) => {
      if (!existString) {
        stringArray.push(new Array());
        existString = true;
      }
      if (isNewLineCharacter(value)) {
        existString = false;
      } else {
        stringArray[stringArray.length - 1].push(value);
      }
    });

  // 最大配列サイズを取得
  const colSize = stringArray.reduce(
    (maxSize, current) => (current.length > maxSize ? current.length : maxSize),
    0
  );

  // 全配列が最大配列サイズとなるよう全角スペースで埋める
  const spaceAddedStringArray = stringArray.map((str) => {
    let spaceAddedArray = [...str];
    for (let i = 0; i < colSize - str.length; i++) {
      spaceAddedArray.push('　');
    }
    return spaceAddedArray;
  });
  console.table(spaceAddedStringArray);

  // 縦書きに変換
  let finalString: string = '';
  for (let col = 0; col < colSize; col++) {
    for (let row = spaceAddedStringArray.length - 1; row >= 0; row--) {
      finalString += spaceAddedStringArray[row][col];
      if (wideLineSpacing === 'half') {
        finalString += ' ';
      } else if (wideLineSpacing === 'full') {
        finalString += '　';
      }
    }
    finalString += '\n';
  }

  return finalString;
};

// 文字が改行文字かどうか調べる
function isNewLineCharacter(aChar: string) {
  const firstChar = aChar[0];
  return firstChar === '\r' || firstChar === '\n';
}
