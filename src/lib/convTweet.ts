import GraphemeSplitter from 'grapheme-splitter';

const splitter = new GraphemeSplitter();

// 文字が改行文字かどうか
const isNewLineCharacter = (aChar: string) =>
  aChar[0] === '\r' || aChar[0] === '\n';

// 文字が半角かどうか
const isHalfWidthChar = (aChar: string) => aChar[0] >= '!' && aChar[0] <= '~';

export const reverceString = (text: string) =>
  text.split('').reverse().join('');

const halfToFullWidthCharacters = (text: string) =>
  text.replace(/[!-~]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0xfee0));

// 文字数カウントのルール
// 改行と半角は0.5、全角と絵文字は1
export const getCharLength = (str: string): number => {
  if (str === null) return 0;
  const split: string[] = splitter.splitGraphemes(str);
  const charCount = split.reduce(
    (prev, current) =>
      isNewLineCharacter(current) || isHalfWidthChar(current)
        ? prev + 0.5
        : prev + 1.0,
    0
  );
  return charCount;
};

export const conv2TateTweet = (
  str: string,
  wideLineSpacing: 'none' | 'half' | 'full' = 'full'
) => {
  let stringArray: string[][] = [];

  // 文字列を全角に変換した上で、各行、各文字を二次元配列に格納する
  let existString = false;
  const fullWidthCharacters = halfToFullWidthCharacters(str);
  const splittedCharacters: string[] =
    splitter.splitGraphemes(fullWidthCharacters);
  splittedCharacters.map((value) => {
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
      if (row !== 0) {
        if (wideLineSpacing === 'half') {
          finalString += ' ';
        } else if (wideLineSpacing === 'full') {
          finalString += '　';
        }
      }
    }
    if (col < colSize - 1) {
      finalString += '\n';
    }
  }

  return finalString;
};
