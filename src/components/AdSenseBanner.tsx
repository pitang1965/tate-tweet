import { useEffect, useRef } from 'react';

interface AdSenseBannerProps {
  adClient: string;
  adSlot: string;
  adFormat?: string;
  adStyle?: React.CSSProperties;
  className?: string;
}

function AdSenseBanner({
  adClient,
  adSlot,
  adFormat = 'auto',
  adStyle = { display: 'block' },
  className = '',
}: AdSenseBannerProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (window.adsbygoogle && adRef.current) {
        (window.adsbygoogle as any[]).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={adStyle}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default AdSenseBanner;
