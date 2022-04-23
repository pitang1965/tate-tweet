import { Avatar, Paper, Space, Text } from '@mantine/core';

const AboutPage = () => {
  return (
    <Paper shadow='xs' p='md' withBorder>
      <Text size='xl'>たてツイートについて</Text>
      <Space h='xl' />
      <Text>
        本アプリは私ピータン(57歳)が作成しました。 Over 40 Web
        Clubの仲間と共に毎日Web開発の学習を継続しています。
      </Text>
      <Space h='xl' />
      <Avatar
        radius='xl'
        size='lg'
        src='pitang_with_brids.jpg'
        alt='ピータン'
      />
    </Paper>
  );
};

export default AboutPage;
