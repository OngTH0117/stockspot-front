import React, { useEffect } from 'react';

function Ticker() {
  useEffect(() => {
    const container = document.getElementById('ticker-widget-container');
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';

    // check if the script is not already present in the container before appending it
    if (!container.querySelector('script[src*="embed-widget-tickers.js"]')) {
      container.appendChild(script);
    }

    // Clean up the script 
    return () => {
      container.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div className="tradingview-widget-container" id="ticker-widget-container">
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}

export default Ticker;