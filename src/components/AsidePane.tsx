import { AppShell, Container, Text } from '@mantine/core';
import { Ad } from 'tabler-icons-react';
import BookAd from './BookAd';
import styles from './AsidePane.module.css';

const AsidePane = () => {
  return (
    <AppShell.Aside className={`${styles.hideOnSmall} ${styles.asideContainer}`}>
      <Container>
        <Ad size={40} strokeWidth={1} color={'#1C92E2'} />
        <Text size='md'>気になった本</Text>
        <BookAd
          code={
            '<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=pitang1965-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B09YQ6S2K9&linkId=153ea12824af1caa002e26bd013843b7"></iframe>'
          }
        />

        <BookAd
          code={
            '<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=pitang1965-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4198654530&linkId=2c69f7ba78c95fcfd2f39b3615c8f18a"></iframe>'
          }
        />
        <BookAd
          code={
            '<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=pitang1965-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4898318371&linkId=94eab0cec23dc720ea92b619da171b36"></iframe>'
          }
        />
        <BookAd
          code={
            '<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=pitang1965-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4828423710&linkId=2434b093123c773206673c4be8a77256"></iframe>'
          }
        />
      </Container>
    </AppShell.Aside>
  );
};

export default AsidePane;
