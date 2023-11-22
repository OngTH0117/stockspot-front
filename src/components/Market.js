import React, { useState, useEffect } from 'react';
import Header from './UI/Header';
import Footer from './UI/Footer';
import './Market.css';

function Market() {
  const [marketData, setMarketData] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [mostActive, setMostActive] = useState([]);


  useEffect(() => {
    // fetch data from the API
    fetch('https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=T2M8WX41XQRRC0XU')
      .then((response) => response.json())
      .then((data) => {
        // filter out Forex and Cryptocurrency market types
        const filteredData = data.markets.filter(
          (market) =>
            market.market_type !== 'Forex' &&
            market.market_type !== 'Cryptocurrency'
        );
        // Set the filtered data 
        setMarketData(filteredData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    
    fetch('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=T2M8WX41XQRRC0XU')
      .then((response) => response.json())
      .then((data) => {
       

        //extract top gainers, top losers, and most active from the fetched data
        setTopGainers(data.top_gainers);
        setTopLosers(data.top_losers);
        setMostActive(data.most_actively_traded);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const getStatusColor = (status) => {
    return status === 'closed' ? 'red' : 'green';
  };

  return (
    <div>
    <Header />
    <div style={{ marginTop: '100px' }}>
      <h1 style={{ marginLeft: '20px' }}>Market Status</h1>
      <div className="market-grid">
        {marketData.map((market, index) => (
          <div
            key={index}
            className="market-item"
            style={{ borderLeftColor: getStatusColor(market.current_status) }}
          >
            <strong>{market.region}</strong>
            <p style={{ color: getStatusColor(market.current_status) }}>
              {market.current_status}
            </p>
            <p>
              {market.current_status === 'open'
                ? `Close Time: ${market.local_close}`
                : `Open Time: ${market.local_open}`}
            </p>
          </div>
        ))}
      </div>
      <h1 style={{ marginLeft: '20px', marginTop:'20px' }}>Top Gainers</h1>
      <div className="gainers">
      <ul className="gainers-losers-list">
  {topGainers.map((gainer, index) => (
    <li key={index} className={`gainers-losers-item gainer-item`}>
      <div className="stock-info">
        <p className="stock-name">{gainer.ticker}</p>
        <p className="stock-volume">Volume: {gainer.volume}</p>
      </div>
      <div className="stock-details">
  <p className="stock-price"> {gainer.price}</p>
  <div className="stock-change">
    <div className="change-icon">
      <img src="data:image/png;base64,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" alt="Up Arrow" />
    </div>
    <p style={{color: '	#50C878'}}> 
      {gainer.change_amount} ({gainer.change_percentage})
    </p>
  </div>
</div>
      
    </li>
  ))}
</ul>
      </div>

      <h1 style={{ marginLeft: '20px' }}>Top Losers</h1>
<div className="losers">
  <ul className="gainers-losers-list">
    {topLosers.map((loser, index) => (
      <li key={index} className={`gainers-losers-item loser-item`}>
        <div className="stock-info">
          <p className="stock-name">{loser.ticker}</p>
          <p className="stock-volume">Volume: {loser.volume}</p>
        </div>
        <div className="stock-details">
          <p className="stock-price"> {loser.price}</p>
          <div className="stock-change">
            <div className="change-icon">
              <img src="https://cdn0.iconfinder.com/data/icons/flat-round-arrow-arrow-head/512/Red_Arrow_Down-512.png" alt="Down Arrow" />
            </div>
            <p style={{color: '	#DC143C'}}>
              {loser.change_amount} ({loser.change_percentage})
            </p>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>

<h1 style={{ marginLeft: '20px' }}>Most Active</h1>
<div className="mostActive">
  <ul className="gainers-losers-list">
    {mostActive.map((active, index) => (
      <li key={index} className={`gainers-losers-item active-item`}>
        <div className="stock-info">
          <p className="stock-name">{active.ticker}</p>
          <p className="stock-volume">Volume: {active.volume}</p>
        </div>
        <div className="stock-details">
          <p className="stock-price"> {active.price}</p>
          <div className="stock-change">
            <div className="change-icon">
              <img
                src={active.change_amount >= 0 ? "data:image/png;base64,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" : "https://cdn0.iconfinder.com/data/icons/flat-round-arrow-arrow-head/512/Red_Arrow_Down-512.png"}
                alt={active.change_amount >= 0 ? "Up Arrow" : "Down Arrow"}
              />
            </div>
            <p style={{ color: active.change_amount >= 0 ? '	#50C878' : '	#DC143C' }}>
              {active.change_amount} ({active.change_percentage})
            </p>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>
    </div>
    <Footer />
  </div>
  );
}

export default Market;