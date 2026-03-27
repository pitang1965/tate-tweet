import type { FC } from 'react';
import { AppShell } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { IconHome, IconInfoCircle } from '@tabler/icons-react';
import styles from './Navbar.module.css';

type NavbarProps = {
  opened: boolean;
};

const Navbar: FC<NavbarProps> = ({ opened }) => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.anchor} ${isActive ? styles.active : ''}`;

  return (
    <>
      <AppShell.Navbar p="md" hidden={!opened}>
        <AppShell.Section mt="xs">
          <NavLink to="/" end className={linkClass}>
            <IconHome />
            <div>Home</div>
          </NavLink>
        </AppShell.Section>
        <AppShell.Section mt="xs">
          <NavLink to="about" className={linkClass}>
            <IconInfoCircle />
            <div>About</div>
          </NavLink>
        </AppShell.Section>
      </AppShell.Navbar>
    </>
  );
};

export default Navbar;
