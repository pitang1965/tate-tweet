import { Anchor, Footer as MantineFooter } from '@mantine/core';
const Footer = () => {
  return (
    <MantineFooter height={60} p='md'>
      <Anchor
        href='https://over40web.club'
        target='_blank'
        rel='noopener noreferrer'
      >
        Powerd by Over 40 Web Club
      </Anchor>
    </MantineFooter>
  );
};

export default Footer;
