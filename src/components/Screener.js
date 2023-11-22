import React, { useEffect, useState } from 'react';
import Header from './UI/Header';
import Footer from './UI/Footer';
import './Screener.css'; 
import StockModal from './StockModal';
import { useNavigate } from "react-router-dom";

function Screener() {
  const [stockData, setStockData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 12;
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  
  const calculateWeightedAverageScore = (stock) => {
    const weightedScores = selectedColumns.map((column) => {
      const weight = weights[column] || 0;
      let value = 0;

      if (column === "CAGR") {
        if (stock["Price Close(3Y)"] !== 0) {
          value = calculateCAGR(
            stock["Price Close(3Y)"],
            stock["Price Close"],
            3
          );
        }
      } else if (column === "ROA") {
        value = stock["ROA"];
      } else {
        value = stock[column];
      }

      return !isNaN(value) ? weight * parseFloat(value) : 0; // Exclude non-numeric values
    });

    const totalWeightedScore = weightedScores.reduce(
      (total, score) => total + score,
      0
    );
    const totalWeight = Object.values(weights).reduce(
      (total, weight) => total + parseFloat(weight),
      0
    );

    return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
  };
  

  const handleOpenModal = (stock) => {
    setSelectedStock(stock);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedStock(null);
    setShowModal(false);
  };

    const [selectedColumns, setSelectedColumns] = useState([
      'P/E',
      'P/S ratio',
      'ROE',
      'ROA',
      'Free Cash Flow',
      'Debt to Equity',
      'Current Ratio',
      'Dividend Yield',
      'Gross Profit Margin',
      'CAGR'
    ]);

    const [weights, setWeights] = useState({
     
    });

  useEffect(() => {
    async function fetchData() {
      try {
    console.log('Fetching data...');
    const response = await fetch('http://127.0.0.1:8000/api/stockScreener');
    const data = await response.json();

    const cleanedData = data.map(stock => {
      const cleanedStock = {};
      Object.keys(stock).forEach(key => {
        const cleanedKey = key.trim(); // Clean the key by removing extra spaces
        cleanedStock[cleanedKey] = stock[key];
      });
      return cleanedStock;
    });

   
    const freeCashFlows = cleanedData.map(stock => parseFloat(stock['Free Cash Flow']));

    
    const minValue = Math.min(...freeCashFlows);
    const maxValue = Math.max(...freeCashFlows);

    
    const normalizedData = cleanedData.map(stock => {
      const originalValue = parseFloat(stock['Free Cash Flow']);
      const normalizedValue = (originalValue - minValue) / (maxValue - minValue);
      return {
        ...stock,
        'Free Cash Flow': normalizedValue, 
      };
    });

    console.log('Fetched data:', normalizedData);

    setStockData(normalizedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, []);
  console.log("isLoggedIn:", isLoggedIn);
  
  
  const totalWeight = Object.values(weights).reduce((total, weight) => total + parseFloat(weight), 0);
const maxTotalWeight = 1;
const isTotalWeightExceedingThreshold = totalWeight > maxTotalWeight;
const adjustedWeights = { ...weights };

// Automatically adjust weights if the total weight exceeds the limit
if (totalWeight > maxTotalWeight) {
  const weightMultiplier = maxTotalWeight / totalWeight;
  Object.keys(adjustedWeights).forEach(column => {
    adjustedWeights[column] = (adjustedWeights[column] * weightMultiplier).toFixed(2);
  });
}

const handleWeightChange = (column, value) => {
  const updatedWeights = {
    ...adjustedWeights,
    [column]: value,
  };

  setWeights(updatedWeights);
};
function calculateCAGR(initialValue, finalValue, years) {
  return ((finalValue / initialValue) ** (1 / years) - 1) * 100;
}
  
  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const filteredStockData = stockData.filter(
    stock =>
      stock['Identifier (RIC)'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock['Company Name'].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [sortOrder, setSortOrder] = useState('asc'); 

  const handleSortScores = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  };

  // Sort the filteredStockData based on sortOrder and weightedAverageScore
  const sortedStockData = [...filteredStockData].sort((a, b) => {
  const scoreA = calculateWeightedAverageScore(a, selectedColumns, weights);
  const scoreB = calculateWeightedAverageScore(b, selectedColumns, weights);

  // Check if either scoreA or scoreB is NaN and place them at the end
  if (isNaN(scoreA) && isNaN(scoreB)) {
    return 0; // No change in order
  } else if (isNaN(scoreA)) {
    return 1; // place scoreA (NaN) after scoreB
  } else if (isNaN(scoreB)) {
    return -1; // place scoreB (NaN) before scoreA
  } else {
    // Sort normally if both scores are valid numbers
    if (sortOrder === 'asc') {
      return scoreA - scoreB;
    } else {
      return scoreB - scoreA;
    }
  }
});

  
  

  return (
    <div className="screener-container">
      <Header />
      <div style={{ marginTop: "50px", maxWidth: "1600px", marginLeft:"25px"}}>
      <h1>Screener</h1>
      <div className="column-selection-container">
      {isLoggedIn ? (
        <>
          <h2 className="column-selection-title">Select Columns to Display:</h2>
  {isTotalWeightExceedingThreshold && (
      <div className="weight-error">
        Total weight cannot exceed 1.
      </div>
    )}
    {totalWeight === 0 && (
  <div className="note">
    Please enter weights to calculate the score.
  </div>
)}
  <div className="column-list">
    {stockData.length > 0 &&
      Object.keys(stockData[0]).map(column => {
        if (
          column !== 'Identifier (RIC)' &&
          column !== 'Company Name' &&
          column !== 'GICS Sector Name' &&
          column !== 'Price Close' &&
          column !== 'Country of Incorporation' &&
          column !== 'Total Assets' &&
          column !== 'Price Close(3Y)' &&
          column !== 'Operating Income'
        ) {
          return (
            <div className="column-checkbox" key={column}>
              <label>
                <input
                  type="checkbox"
                  value={column}
                  checked={selectedColumns.includes(column)}
                  onChange={event => {
                    const value = event.target.value;
                    setSelectedColumns(prevColumns =>
                      prevColumns.includes(value)
                        ? prevColumns.filter(col => col !== value)
                        : [...prevColumns, value]
                    );
                  }}
                />
                {column}
              </label>
              {selectedColumns.includes(column) && (
                <input
                type="number"
                value={adjustedWeights[column] || ''}
                onChange={event => {
                  const value = event.target.value;
                  handleWeightChange(column, value);
                }}
                placeholder="0"
                min="0"
                max={maxTotalWeight}
                step="0.01"
                className="weight-input"
              />
              )}
            </div>

            
            
          );
          
        }
        return null;
      })}
      <div className="column-checkbox" key="CAGR">
  <label>
    <input
      type="checkbox"
      value="CAGR"
      checked={selectedColumns.includes("CAGR")}
      onChange={event => {
        const value = event.target.value;
        setSelectedColumns(prevColumns =>
          prevColumns.includes(value)
            ? prevColumns.filter(col => col !== value)
            : [...prevColumns, value]
        );
      }}
    />
    CAGR
  </label>
  {selectedColumns.includes("CAGR") && (
    <input
      type="number"
      value={weights["CAGR"] || ''}
      onChange={event => {
        const value = event.target.value;
        handleWeightChange("CAGR", value);
      }}
      placeholder="0"
      min="0"
      max={maxTotalWeight}
      step="0.01"
      className="weight-input"
    />
  )}
</div>
</div>
        </>
      ) : (
        <>
          <p>Please log in to use the set score feature and see the scores.</p>
          <button onClick={() => navigate("/login")}>Log In</button>
        </>
      )}
  
</div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Identifier or Company Name"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </div>
      <table className="stock-table">
      <thead>
  <tr>
    <th>Identifier</th>
    <th>Company Name</th>
    <th>Sector</th>
    <th>Price</th>
    
    {selectedColumns.map((column) => (
              <th key={column}>{column}</th>
            ))}
            <th>
              <button className="sort-button" onClick={handleSortScores}>
                Sort Score {sortOrder === 'asc' ? '▲' : '▼'}
              </button>
            </th>
  </tr>
  
</thead>
<tbody>
{sortedStockData
            .slice(startIndex, endIndex)
            .map((stock, index) => {
  const weightedScores = selectedColumns.map(column => {
    const weight = weights[column] || 0;
    let value = 0;

    if (column === 'CAGR') {
      if (stock['Price Close(3Y)'] !== 0) {
        value = calculateCAGR(stock['Price Close(3Y)'], stock['Price Close'], 3);
      }
    } else if (column === 'ROA') {
      value = stock['ROA'];
    } else {
      value = stock[column];
    }

    return !isNaN(value) ? weight * parseFloat(value) : 0; // exclude non-numeric values
  });

  const totalWeightedScore = weightedScores.reduce((total, score) => total + score, 0);
  const totalWeight = Object.values(weights).reduce((total, weight) => total + parseFloat(weight), 0);

  const weightedAverageScore = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;


  return (
    <tr key={index}>
      <td>{stock['Identifier (RIC)']}</td>
        <td> <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              handleOpenModal(stock);
            }}
            className="text-decoration-none"
          >
            {stock['Company Name']}
          </a></td>
        <td>{stock['GICS Sector Name']}</td>
        <td>{stock['Price Close'].toFixed(2)}</td>
      
      {selectedColumns.map(column => (
          <td key={column}>
             {column === 'CAGR' 
            ? calculateCAGR(stock['Price Close(3Y)'], stock['Price Close'], 3).toFixed(2)
             :column === 'ROA'
           ? stock['ROA'].toFixed(2) 
           :column === 'P/E'
              ? stock['P/E'].toFixed(2)
              : column === 'P/S ratio'
              ? stock['P/S ratio']
                ? stock['P/S ratio'].toFixed(2)
                : 'N/A'
              : column === 'ROE'
              ? stock['ROE'].toFixed(2)
              : column === 'Debt to Equity'
              ? stock['Debt to Equity'].toFixed(2)
              : column === 'Dividend Yield'
              ? (stock['Dividend Yield'] * 100).toFixed(2)
              : column === 'Gross Profit Margin'
              ? (stock['Gross Profit Margin'] * 100).toFixed(2)
              : stock[column]}
          </td>
          
        ))}
        <td>{weightedAverageScore.toFixed(2)}</td>
    </tr>
  );
})}
   
  </tbody>
      </table>

      {showModal && (
        <StockModal stock={selectedStock} onClose={handleCloseModal} />
      )}
      
      <div className="pagination">
      <button
        className="button-4"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className="button-4"
        onClick={handleNextPage}
        disabled={endIndex >= stockData.length}
      >
        Next
      </button>
    </div>
      </div>

      
      <Footer />
    </div>
  );
}

export default Screener;
