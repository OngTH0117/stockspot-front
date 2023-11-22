import React, { useEffect, useRef } from 'react';

function MarketWidget() {
  const scriptLoadedRef = useRef(false);

  //Trading view script
  useEffect(() => {
    if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src =
        'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        colorTheme: 'light',
        dateRange: '1D',
        exchange: 'US',
        showChart: true,
        locale: 'en',
        largeChartUrl: '',
        isTransparent: false,
        showSymbolLogo: true,
        showFloatingTooltip: false,
        width: '600',
        height: '600',
        plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
        plotLineColorFalling: 'rgba(41, 98, 255, 1)',
        gridLineColor: 'rgba(42, 46, 57, 0)',
        scaleFontColor: 'rgba(106, 109, 120, 1)',
        belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
        belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
        belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
        belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
        symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
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

export default MarketWidget;