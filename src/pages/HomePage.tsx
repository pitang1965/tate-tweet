import { useState } from 'react';
import {
  createStyles,
  Alert,
  Button,
  Radio,
  Space,
  Text,
  Textarea,
} from '@mantine/core';
import { useClipboard, useDebouncedValue } from '@mantine/hooks';
import { AlertCircle, BrandTwitter } from 'tabler-icons-react';
import { conv2TateTweet, getCharLength, getNoOfLines } from '../lib/convTweet';

const useStyles = createStyles((/* theme, _params, getRef */) => ({
  textarea: {
    width: '31em',
    maxWidth: '90%',
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginTop: '0.5rem',
  },
}));

const formatNumberToString = (val: number) => {
  let str: string;

  if (val < 10) {
    str = '　' + String(val);
  } else if (val < 100) {
    str = str = ' ' + String(val);
  } else {
    str = String(val);
  }

  if (Math.ceil(val) === val) {
    str = str + '.0';
  }

  return str;
};

function HomePage(): JSX.Element {
  const { classes } = useStyles();
  const clipboard = useClipboard({ timeout: 500 });

  const [lineSpacing, setLineSpacing] = useState('full');
  const [prevLineSpacing, setPrevLineSpacing] = useState('full');

  const [tweet, setTweet] = useState('');
  const [prevTweet, setPrevTweet] = useState('');

  const [tateTweet] = useDebouncedValue(
    conv2TateTweet(tweet, lineSpacing as 'none' | 'half' | 'full'),
    200
  );
  const [noOfCharOfTateTweet, setNoOfCharOfTateTweet] = useState(0);
  const [noOfLinesAfterConversion, setNoofLinesAfterConversion] = useState(0);

  if (prevLineSpacing !== lineSpacing || tweet !== prevTweet) {
    const noOfLinesOfTweet = getNoOfLines(tweet);
    let finalValue;
    switch (lineSpacing) {
      case 'none':
        finalValue = noOfLinesOfTweet;
        break;
      case 'half':
        finalValue = noOfLinesOfTweet + (+noOfLinesOfTweet - 1) / 2;
        break;
      case 'full':
        finalValue = noOfLinesOfTweet + noOfLinesOfTweet - 1;
        break;
      default:
        finalValue = noOfLinesOfTweet;
    }
    setNoofLinesAfterConversion(finalValue);
    setNoOfCharOfTateTweet(getCharLength(tateTweet));

    setPrevLineSpacing(lineSpacing);
    setPrevTweet(tweet);
  }

  const handleClear = () => setTweet('');
  const handleCopy = () => clipboard.copy(tateTweet);

  return (
    <>
      <Text size='sm'>
        １つ目のテキストエリアに入力したものが２つ目に縦書きで表示されます。
      </Text>
      <Space h='md' />
      <Textarea
        placeholder='文章を入力してください。'
        label=''
        radius='xs'
        size='lg'
        required
        value={tweet}
        onChange={(event) => setTweet(event.currentTarget.value)}
        className={classes.textarea}
        minRows={6}
        autosize={true}
      />
      <div className={classes.buttons}>
        <Button
          variant='gradient'
          gradient={{ from: 'orange', to: 'pink' }}
          size='sm'
          onClick={handleClear}
        >
          消去
        </Button>
        <Text size='sm' color={noOfCharOfTateTweet > 140 ? 'red' : 'black'}>
          変換後文字数：{formatNumberToString(noOfCharOfTateTweet)}[全角]
        </Text>
        <Text size='sm' color={noOfLinesAfterConversion > 15 ? 'red' : 'black'}>
          変換後行数[全角]：{formatNumberToString(noOfLinesAfterConversion)}
        </Text>
      </div>
      <Space h='md' />
      {noOfCharOfTateTweet > 140 ? (
        <Alert
          icon={<AlertCircle size={16} />}
          title='文字数オーバー!'
          color='red'
          radius='md'
          variant='filled'
        >
          ツイートは全角140文字までです。
          {lineSpacing !== 'none'
            ? '行間を変更するか、改行位置を調整するか、ツイートを短くしてください。'
            : '改行位置を調整するか、ツイートを短くしてください'}
        </Alert>
      ) : (
        ''
      )}
      <Space h='md' />
      {noOfLinesAfterConversion > 15 ? (
        <Alert
          icon={<AlertCircle size={16} />}
          title='行数が多いです。'
          color='pink'
          radius='md'
          variant='filled'
        >
          ツイートの1行の文字数は、端末の種類、向き、アプリ、フォントサイズの設定などで変わってきます。例えば一部機種では全角15文字を超えると折り返すので縦書きの文章は意味不明になります。
          {lineSpacing !== 'none'
            ? '行間を変更するか、改行位置を調整するか、ツイートを短くしてください。'
            : '改行位置を調整するか、ツイートを短くしてください'}
        </Alert>
      ) : (
        ''
      )}
      <Radio.Group
        value={lineSpacing}
        label='行間'
        description='縦書きしたときの行間を設定します。'
        spacing='xl'
        color='grape'
        onChange={setLineSpacing}
      >
        <Radio value='full' label='全角' />
        <Radio value='half' label='半角' />
        <Radio value='none' label='なし' />
      </Radio.Group>
      <Space h='md' />
      <Textarea
        placeholder='縦書きで表示されます'
        label=''
        radius='xs'
        size='lg'
        value={tateTweet}
        className={classes.textarea}
        minRows={12}
        autosize={true}
      />

      <div className={classes.buttons}>
        <Button
          variant='gradient'
          gradient={{ from: 'purple', to: 'pink' }}
          size='sm'
          onClick={handleCopy}
        >
          コピー
        </Button>
        <Button
          component='a'
          target='_blank'
          rel='noopener noreferrer'
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            tateTweet
          )}`}
          leftIcon={<BrandTwitter size={18} />}
          size='sm'
          styles={(theme) => ({
            root: {
              backgroundColor: '#00acee',
              paddingRight: 20,

              '&:hover': {
                backgroundColor: theme.fn.darken('#00acee', 0.05),
              },
            },
            leftIcon: {
              marginRight: 10,
            },
          })}
        >
          Twitterに飛ぶ
        </Button>
      </div>
    </>
  );
}

export default HomePage;
