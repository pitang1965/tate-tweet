import { useEffect, useState } from 'react';
import {
  createStyles,
  Alert,
  Button,
  RadioGroup,
  Radio,
  Space,
  Text,
  Textarea,
} from '@mantine/core';
import { useClipboard, useDebouncedValue } from '@mantine/hooks';
import { AlertCircle, BrandTwitter } from 'tabler-icons-react';
import { conv2TateTweet, getCharLength } from '../lib/convTweet';

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

function MainView(): JSX.Element {
  const { classes } = useStyles();
  const clipboard = useClipboard({ timeout: 500 });
  const [lineSpacing, setLineSpacing] = useState('full');
  const [tweet, setTweet] = useState('');
  const [tateTweet] = useDebouncedValue(
    conv2TateTweet(tweet, lineSpacing as 'none' | 'half' | 'full'),
    200
  );
  const [noOfCharOfTweet, setNoOfCharOfTweet] = useState(0);
  const [noOfCharOfTateTweet, setNoOfCharOfTateTweet] = useState(0);

  useEffect(() => {
    setNoOfCharOfTweet(getCharLength(tweet));
    setNoOfCharOfTateTweet(getCharLength(tateTweet));
  }, [tateTweet, lineSpacing]);

  const handleClear = () => setTweet('');
  const handleCopy = () => clipboard.copy(tateTweet);

  return (
    <>
      <p>ツイートを縦書きに変換します。</p>
      <Textarea
        placeholder='文章を入力してください。'
        label='ツイートを入力'
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
        <Text size='sm'>全角{noOfCharOfTweet}文字</Text>
        <Button
          variant='gradient'
          gradient={{ from: 'orange', to: 'pink' }}
          onClick={handleClear}
        >
          消去
        </Button>
      </div>

      <RadioGroup
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
      </RadioGroup>
      <Space h='md' />
      <Textarea
        placeholder='縦書きで表示されます'
        label='縦書きツイート'
        radius='xs'
        size='lg'
        value={tateTweet}
        className={classes.textarea}
        minRows={12}
        autosize={true}
      />

      <div className={classes.buttons}>
        <Text size='sm' color={noOfCharOfTateTweet > 140 ? 'red' : 'blue'}>
          全角{noOfCharOfTateTweet}文字
        </Text>
        <Button
          variant='gradient'
          gradient={{ from: 'purple', to: 'pink' }}
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
    </>
  );
}

export default MainView;
