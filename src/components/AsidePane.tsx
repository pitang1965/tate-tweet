import { Text } from '@mantine/core';
import { Ad } from 'tabler-icons-react';
import BookAd from './BookAd';

const AsidePane = () => {
  return (
    <>
      <Ad size={40} strokeWidth={1} color={'#1C92E2'} />
      <Text size='md'>とりあえず何か追加してみました。</Text>
      <BookAd
        code={
          '<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=pitang1965-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=499085652X&linkId=7071bd9ad0005dee8a2b112b0970b0dd"></iframe>'
        }
      />
    </>
  );
};

export default AsidePane;
