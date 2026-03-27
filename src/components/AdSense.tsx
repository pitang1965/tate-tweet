import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSense() {
  const pushed = useRef(false);
  const isDev = import.meta.env.DEV;
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;
  const slot = import.meta.env.VITE_ADSENSE_SLOT;

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
          width: '100%',
          height: 100,
          background: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#888',
          fontSize: 14,
        }}
      >
        広告プレースホルダー（レスポンシブ）
      </div>
    );
  }

  if (!clientId || !slot) return null;

  return (
    <ins
      className='adsbygoogle'
      style={{ display: 'block' }}
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format='auto'
      data-full-width-responsive='true'
    />
  );
}
