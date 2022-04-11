import { useState } from 'react';
import { createStyles, Button, Space, Textarea } from '@mantine/core';
import { useClipboard, useDebouncedValue } from '@mantine/hooks';

const useStyles = createStyles((/* theme, _params, getRef */) => ({
  textarea: {
    width: '90%',
  },
}));

const reverceString = (text: string) => text.split('').reverse().join('');

const halfToFullWidthCharacters = (text: string) =>
  text.replace(/[!-~]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0xfee0));

const MainView = () => {
  const { classes } = useStyles();

  const clipboard = useClipboard({ timeout: 500 });
  
  function handleCopy() {
    clipboard.copy(debounced);
  }

  const [tweet, setTweet] = useState('');
  const [debounced] = useDebouncedValue(
    halfToFullWidthCharacters(reverceString(tweet)),
    200
  );

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
      />
      <Space h='md'/>
      <Textarea
        placeholder='縦書きで表示されます'
        label='縦書きツイート'
        radius='xs'
        size='lg'
        disabled
        value={debounced}
        className={classes.textarea}
      />
      <Space h='md'/>
      <Button
        variant='gradient'
        gradient={{ from: 'indigo', to: 'cyan' }}
        onClick={handleCopy}
      >
        Copy
      </Button>
    </>
  );
};

export default MainView;
