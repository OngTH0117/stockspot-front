import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Stock() {
  const [selectedRatios, setSelectedRatios] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [ratioInputs, setRatioInputs] = useState([]);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const response = await axios.get('/api/stocks');
      setStocks(response.data);
      initializeRatioInputs(response.data.length);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const initializeRatioInputs = (count) => {
    const initialInputs = Array(count).fill({});
    setRatioInputs(initialInputs);
  };

  const handleRatioSelection = (ratio) => {
    if (selectedRatios.length < 10 && !selectedRatios.includes(ratio)) {
      setSelectedRatios((prevSelectedRatios) => [...prevSelectedRatios, ratio]);
    }
  };

  const handleRatioInputChange = (event, index) => {
    const { name, value } = event.target;
    setRatioInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index] = { ...updatedInputs[index], [name]: value };
      return updatedInputs;
    });
  };

  const calculateWeightedAverage = (ratios, weights) => {
    let sum = 0;
    let totalWeight = 0;

    for (let i = 0; i < ratios.length; i++) {
      const ratio = parseFloat(ratios[i]) || 0;
      const weight = parseFloat(weights[i]) || 0;

      sum += ratio * weight;
      totalWeight += weight;
    }

    if (totalWeight === 0) {
      return 0;
    }

    return sum / totalWeight;
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Ratios</h1>
      <div className="d-flex justify-content-between mb-4">
        <div className="btn-group">
         
        </div>
        <div className="btn-group">
         
        </div>
      </div>
      <hr />
      <h2 className="my-3">Stocks</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company Name</th>
              <th>Code</th>
              <th>Category</th>
              <th>Price</th>
              <th>Change</th>
              <th>Volume</th>
              <th>EPS</th>
              <th>DPS</th>
              <th>ROE</th>
              <th>PE</th>
              <th>M Cap</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <td>
                  <a href="/chart">{stock.name}</a>
                </td>
                <td>{stock.company_name}</td>
                <td>{stock.code}</td>
                <td>{stock.category}</td>
                <td>{stock.price}</td>
                <td>{stock.change}</td>
                <td>{stock.volume}</td>
                <td>{stock.eps}</td>
                <td>{stock.dps}</td>
                <td>{stock.roe}</td>
                <td>{stock.pe}</td>
                <td>{stock.m_cap}</td>
                <td>
                  {ratioInputs[index] && selectedRatios.length > 0 ? (
                    calculateWeightedAverage(Object.values(ratioInputs[index]), selectedRatios).toFixed(2)
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      <h2 className="my-3">Enter Ratios</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Stock</th>
              {selectedRatios.map((ratio, index) => (
                <th key={index}>{ratio}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.name}</td>
                {selectedRatios.map((ratio, idx) => (
                  <td key={idx}>
                    <input
                      type="number"
                      name={ratio}
                      value={ratioInputs[index][ratio] || ''}
                      onChange={(event) => handleRatioInputChange(event, index)}
                      className="form-control"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Stock;