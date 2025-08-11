import { useState } from 'react';
import {
  Alert,
  Button,
  darken,
  Group,
  Radio,
  Space,
  Text,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { useClipboard, useDebouncedValue } from '@mantine/hooks';
import { AlertCircle, BrandTwitter } from 'tabler-icons-react';
import { conv2TateTweet, getCharLength, getNoOfLines } from '../lib/convTweet';
import AdSenseBanner from '../components/AdSenseBanner';
import styles from './HomePage.module.css';

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

function HomePage() {
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
  const [noOfLinesAfterConversion, setNoOfLinesAfterConversion] = useState(0);

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
    setNoOfLinesAfterConversion(finalValue);
    setNoOfCharOfTateTweet(getCharLength(tateTweet));

    setPrevLineSpacing(lineSpacing);
    setPrevTweet(tweet);
  }

  const theme = useMantineTheme();

  const handleClear = () => setTweet('');
  const handleCopy = () => clipboard.copy(tateTweet);

  return (
    <div
      style={{
        background: theme.colors.gray[0],
      }}
    >
      <Text size="sm">
        １つ目のテキストエリアに入力したものが２つ目に縦書きで表示されます。
      </Text>
      <Space h="md" />
      <Textarea
        placeholder="文章を入力してください。"
        label=""
        radius="xs"
        size="lg"
        required
        value={tweet}
        onChange={(event) => setTweet(event.currentTarget.value)}
        className={styles.textarea}
        minRows={6}
        autosize={true}
      />
      <div className={styles.buttons}>
        <Button
          variant="gradient"
          gradient={{ from: 'orange', to: 'pink' }}
          size="sm"
          onClick={handleClear}
        >
          消去
        </Button>
        <Text size="sm" color={noOfCharOfTateTweet > 140 ? 'red' : 'black'}>
          変換後文字数：{formatNumberToString(noOfCharOfTateTweet)}[全角]
        </Text>
        <Text size="sm" color={noOfLinesAfterConversion > 15 ? 'red' : 'black'}>
          変換後行数[全角]：{formatNumberToString(noOfLinesAfterConversion)}
        </Text>
      </div>
      <Space h="md" />
      {noOfCharOfTateTweet > 140 ? (
        <Alert
          icon={<AlertCircle size={16} />}
          title="文字数オーバー!"
          color="red"
          radius="md"
          variant="filled"
        >
          ツイートは全角140文字までです。
          {lineSpacing !== 'none'
            ? '行間を変更するか、改行位置を調整するか、ツイートを短くしてください。'
            : '改行位置を調整するか、ツイートを短くしてください'}
        </Alert>
      ) : (
        ''
      )}
      <Space h="md" />
      {noOfLinesAfterConversion > 15 ? (
        <Alert
          icon={<AlertCircle size={16} />}
          title="行数が多いです。"
          color="pink"
          radius="md"
          variant="filled"
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
        label="行間"
        description="縦書きしたときの行間を設定します。"
        color="grape"
        onChange={setLineSpacing}
      >
        <Group mt="xl">
          <Radio value="full" label="全角" />
          <Radio value="half" label="半角" />
          <Radio value="none" label="なし" />
        </Group>
      </Radio.Group>
      <Space h="md" />
      <Textarea
        placeholder="縦書きで表示されます"
        label=""
        radius="xs"
        size="lg"
        value={tateTweet}
        className={styles.textarea}
        minRows={12}
        autosize={true}
      />

      <div className={styles.buttons}>
        <Button
          variant="gradient"
          gradient={{ from: 'purple', to: 'pink' }}
          size="sm"
          onClick={handleCopy}
        >
          コピー
        </Button>
        <Button
          component="a"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            tateTweet
          )}`}
          leftSection={<BrandTwitter size={18} />}
          size="sm"
          styles={(theme) => ({
            root: {
              backgroundColor: '#00acee',
              paddingRight: 20,

              '&:hover': {
                backgroundColor: darken('#00acee', 0.05),
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

      <Space h="md" />
      <AdSenseBanner
        adClient="ca-pub-XXXXXXXXXXXXXXXXX"
        adSlot="XXXXXXXXXX"
        adStyle={{
          display: 'block',
          textAlign: 'center',
          margin: '20px auto',
          width: '100%',
          maxWidth: '728px',
          height: '90px',
        }}
      />
    </div>
  );
}

export default HomePage;
