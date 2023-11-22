
import React, { useEffect, useRef } from 'react';

function MarketOverview() {
  const scriptLoadedRef = useRef(false);

  //Trading view script
  useEffect(() => {
    if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src =
        'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        colorTheme: 'light',
        dateRange: '1D',
        showChart: true,
        locale: 'en',
        largeChartUrl: '',
        isTransparent: false,
        showSymbolLogo: true,
        showFloatingTooltip: false,
        width: '600',
        height: '660',
        plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
        plotLineColorFalling: 'rgba(41, 98, 255, 1)',
        gridLineColor: 'rgba(42, 46, 57, 0)',
        scaleFontColor: 'rgba(106, 109, 120, 1)',
        belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
        belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
        belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
        belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
        symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
        tabs: [
          {
            title: 'Indices',
            symbols: [
              {
                s: 'FOREXCOM:SPXUSD',
                d: 'S&P 500',
              },
              {
                s: 'FOREXCOM:NSXUSD',
                d: 'US 100',
              },
              {
                s: 'FOREXCOM:DJI',
                d: 'Dow 30',
              },
              {
                s: 'INDEX:NKY',
                d: 'Nikkei 225',
              },
              {
                s: 'INDEX:DEU40',
                d: 'DAX Index',
              },
              {
                s: 'FOREXCOM:UKXGBP',
                d: 'UK 100',
              },
            ],
            originalTitle: 'Indices',
          },
          {
            title: 'Futures',
            symbols: [
              {
                s: 'CME_MINI:ES1!',
                d: 'S&P 500',
              },
              {
                s: 'CME:6E1!',
                d: 'Euro',
              },
              {
                s: 'COMEX:GC1!',
                d: 'Gold',
              },
              {
                s: 'NYMEX:CL1!',
                d: 'Crude Oil',
              },
              {
                s: 'NYMEX:NG1!',
                d: 'Natural Gas',
              },
              {
                s: 'CBOT:ZC1!',
                d: 'Corn',
              },
            ],
            originalTitle: 'Futures',
          },
        ],
      });

      const widgetContainer = document.querySelector('.tradingview-widget-container__widget');

      if (widgetContainer) {
        widgetContainer.appendChild(script);
        scriptLoadedRef.current = true;
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
      </div>
    </div>
  );
}

export default MarketOverview;