import { Text } from '@mantine/core';
import { Ad } from 'tabler-icons-react';

const AsidePane = () => {
  return (
    <>
      <Ad size={40} strokeWidth={1} color={'#1C92E2'} />
      <Text size='md'>なにか宣伝予定。</Text>
    </>
  );
};

export default AsidePane;
