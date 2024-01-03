import { Anchor, AppShell } from '@mantine/core';
const Footer = () => {
  return (
    <AppShell.Footer p='md'>
      <Anchor
        href='https://over40web.club'
        target='_blank'
        rel='noopener noreferrer'
      >
        Powered by Over 40 Web Club
      </Anchor>
    </AppShell.Footer>
  );
};

export default Footer;
