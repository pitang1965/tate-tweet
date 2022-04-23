import type { FC } from 'react';
import { createStyles, Anchor, Navbar as MantineNavbar } from '@mantine/core';
import { Link } from 'react-router-dom';
import { BrandTwitter, InfoCircle } from 'tabler-icons-react';

const useStyles = createStyles((theme /*, _params, getRef */) => ({
  anchor: {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    textDecoration: 'none',
    '&:hover': {
      color: theme.fn.darken('#00acee', 0.7),
      textDecoration: 'none',
    },
  },
}));

type NavbarProps = {
  opened: boolean;
};

const Navbar: FC<NavbarProps> = ({ opened }) => {
  const { classes } = useStyles();

  return (
    <>
      <MantineNavbar
        p='md'
        hiddenBreakpoint='sm'
        hidden={!opened}
        width={{ sm: 200, lg: 300 }}
      >
        <MantineNavbar.Section mt='xs'>
          <Anchor component={Link} to='/' className={classes.anchor}>
            <BrandTwitter />
            <div>Tweet</div>
          </Anchor>
        </MantineNavbar.Section>
        <MantineNavbar.Section mt='xs'>
          <Anchor component={Link} to='about' className={classes.anchor}>
            <InfoCircle />
            <div>About</div>
          </Anchor>
        </MantineNavbar.Section>
      </MantineNavbar>
    </>
  );
};

export default Navbar;
