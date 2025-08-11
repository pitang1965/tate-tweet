import GraphemeSplitter from 'grapheme-splitter';

const splitter = new GraphemeSplitter();

// 文字列を反転
const reverseString = (text: string) => text.split('').reverse().join('');

// 文字が空白文字かどうか
const isSpeceCharacter = (str: string) => str[0] === ' ' || str[0] === '　';

// 文字が改行文字かどうか
const isNewLineCharacter = (str: string) => str[0] === '\r' || str[0] === '\n';

// 文字が半角かどうか
const isHalfWidthChar = (str: string) => /^[\x20-\x7e]*$/.test(str[0]);

// 文字列を反転
// export const reverceString = (text: string) =>
//   text.split('').reverse().join('');

// 半角を全角に変換
const halfToFullWidthCharacters = (text: string) =>
  text
    .replace(/[ ]/g, '　')
    .replace(/[!-~]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0xfee0))
    .replace(/[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━～]/g, '｜');

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
  lineSpacing: 'none' | 'half' | 'full' = 'full'
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
  // console.table(spaceAddedStringArray);

  // 縦書きに変換
  let tateString: string = '';
  for (let col = 0; col < colSize; col++) {
    for (let row = spaceAddedStringArray.length - 1; row >= 0; row--) {
      tateString += spaceAddedStringArray[row][col];
      if (row !== 0) {
        if (lineSpacing === 'half') {
          tateString += ' ';
        } else if (lineSpacing === 'full') {
          tateString += '　';
        }
      }
    }
    if (col < colSize - 1) {
      tateString += '\n';
    }
  }

  // 右側の無駄なスペースを削除
  let trimedString: string = '';
  let status: 'toBeTrimmed' | 'notToBeTrimmed' = 'toBeTrimmed';

  for (let i = tateString.length - 1; i >= 0; i--) {
    if (status === 'toBeTrimmed' && isSpeceCharacter(tateString[i])) {
      continue;
    } else if (isNewLineCharacter(tateString[i])) {
      status = 'toBeTrimmed';
    } else {
      status = 'notToBeTrimmed';
    }
    trimedString += tateString[i];
  }
  const finalString = reverseString(trimedString);

  return finalString;
};

// 文字列の行数を返す
export const getNoOfLines = (text: string): number =>
  text.split(/\r\n|\r|\n/).length;

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;
  describe('縦書き変換', () => {
    it('文字列の行数を返す', () => {
      const text = `123 456
      abc
      xyz`;

      expect(getNoOfLines(text)).toBe(3);
    });

    it('文字列を反転する', () => {
      const str1 = '123456789';
      const str2 = '987654321';
      expect(reverseString(str1)).toBe(str2);
    });
  });
}
