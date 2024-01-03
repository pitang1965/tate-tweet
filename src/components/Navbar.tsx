import type { FC } from 'react';
import { Anchor, AppShell } from '@mantine/core';
import { Link } from 'react-router-dom';
import { BrandTwitter, InfoCircle } from 'tabler-icons-react';
import styles from './Navbar.module.css';

type NavbarProps = {
  opened: boolean;
};

const Navbar: FC<NavbarProps> = ({ opened }) => {
  return (
    <>
      <AppShell.Navbar p='md' hidden={!opened}>
        <AppShell.Section mt='xs'>
          <Anchor component={Link} to='/' className={styles.anchor}>
            <BrandTwitter />
            <div>Tweet</div>
          </Anchor>
        </AppShell.Section>
        <AppShell.Section mt='xs'>
          <Anchor component={Link} to='about' className={styles.anchor}>
            <InfoCircle />
            <div>About</div>
          </Anchor>
        </AppShell.Section>
      </AppShell.Navbar>
    </>
  );
};

export default Navbar;
