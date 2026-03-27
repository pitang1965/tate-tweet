import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdSenseProps = {
  mobile?: boolean;
};

export function AdSense({ mobile = false }: AdSenseProps) {
  const pushed = useRef(false);
  const isDev = import.meta.env.DEV;
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;
  const slot = mobile
    ? import.meta.env.VITE_ADSENSE_SLOT_MOBILE
    : import.meta.env.VITE_ADSENSE_SLOT;

  useEffect(() => {
    if (isDev || !clientId || !slot || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // ignore AdSense errors
    }
  }, []);

  if (isDev) {
    return (
      <div
        style={{
          width: mobile ? 300 : '100%',
          height: mobile ? 250 : 100,
          background: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#888',
          fontSize: 14,
          margin: mobile ? '0 auto' : undefined,
        }}
      >
        {mobile ? '広告プレースホルダー（300×250）' : '広告プレースホルダー（レスポンシブ）'}
      </div>
    );
  }

  if (!clientId || !slot) return null;

  if (mobile) {
    return (
      <ins
        className='adsbygoogle'
        style={{ display: 'inline-block', width: 300, height: 250 }}
        data-ad-client={clientId}
        data-ad-slot={slot}
      />
    );
  }

  return (
    <ins
      className='adsbygoogle'
      style={{ display: 'block', width: '100%', maxWidth: '100%' }}
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format='auto'
      data-full-width-responsive='true'
    />
  );
}
