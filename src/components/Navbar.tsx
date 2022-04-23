import type { FC } from 'react';
import { Anchor, Navbar as MantineNavbar } from '@mantine/core';
import { Link } from 'react-router-dom';

type NavbarProps = {
  opened: boolean;
};

const Navbar: FC<NavbarProps> = ({ opened }) => (
  <>
    <MantineNavbar
      p='md'
      hiddenBreakpoint='sm'
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <MantineNavbar.Section mt='xs'>
        <Anchor component={Link} to='/'>
          Tweet
        </Anchor>
      </MantineNavbar.Section>
      <MantineNavbar.Section mt='xs'>
        <Anchor component={Link} to='about'>
          About
        </Anchor>
      </MantineNavbar.Section>
    </MantineNavbar>
  </>
);

export default Navbar;
