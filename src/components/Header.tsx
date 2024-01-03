import type { FC } from 'react';
import { AppShell, Burger, Title, useMantineTheme } from '@mantine/core';
import styles from './Header.module.css';

type HeaderProps = {
  opened: boolean;
  setOpened: (newState: boolean) => void;
};

const title = <Title order={1}>たてツイート</Title>;

const Header: FC<HeaderProps> = ({ opened, setOpened }) => {
  const theme = useMantineTheme();
  return (
    <>
      <AppShell.Header p='md'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            size='sm'
            color={theme.colors.gray[6]}
            mr='xl'
            title='メニューを開く'
            className={styles.burgerVisible}
          />
          {title}
        </div>
      </AppShell.Header>
    </>
  );
};

export default Header;
