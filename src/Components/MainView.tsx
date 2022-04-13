import { useEffect, useState } from 'react';
import { createStyles, Button, Space, Text, Textarea } from '@mantine/core';
import { useClipboard, useDebouncedValue } from '@mantine/hooks';
import { conv2TateTweet, getCharLength } from '../lib/convTweet';

const useStyles = createStyles((/* theme, _params, getRef */) => ({
  textarea: {
    width: '31em',
    maxWidth: '90%',
  },
}));

function MainView(): JSX.Element {
  const { classes } = useStyles();

  const clipboard = useClipboard({ timeout: 500 });

  function handleCopy() {
    clipboard.copy(tateTweet);
  }

  const [tweet, setTweet] = useState('');
  const [tateTweet] = useDebouncedValue(conv2TateTweet(tweet, 'full'), 200);
  const [noOfCharOfTweet, setNoOfCharOfTweet] = useState(0);
  const [noOfCharOfTateTweet, setNoOfCharOfTateTweet] = useState(0);

  useEffect(() => {
    setNoOfCharOfTweet(getCharLength(tweet));
    setNoOfCharOfTateTweet(getCharLength(tateTweet));
  }, [tateTweet]);

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
        autosize={true} />
      <Text size='sm'>全角{noOfCharOfTweet}文字</Text>
      <Space h='md' />
      <Textarea
        placeholder='縦書きで表示されます'
        label='縦書きツイート'
        radius='xs'
        size='lg'
        value={tateTweet}
        className={classes.textarea}
        minRows={12}
        autosize={true} />
      <Text size='sm'>全角{noOfCharOfTateTweet}文字</Text>
      <Space h='md' />
      <Button
        variant='gradient'
        gradient={{ from: 'indigo', to: 'cyan' }}
        onClick={handleCopy}
      >
        Copy
      </Button>
    </>
  );
}

export default MainView;
