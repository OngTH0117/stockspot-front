

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

      return !isNaN(value) ? weight * parseFloat(value) : 0; 
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
   
        console.log('Fetched data:', cleanedData);
        setStockData(cleanedData);
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

// automatically adjust weights if the total weight exceeds the limit
if (totalWeight > maxTotalWeight) {
  const weightMultiplier = maxTotalWeight / totalWeight;
  Object.keys(adjustedWeights).forEach(column => {
    adjustedWeights[column] = (adjustedWeights[column] * weightMultiplier).toFixed(2);
  });
}


  
  

  return (
    <div className="screener-container">
      <Header />
      <div style={{ marginTop: "50px", maxWidth: "1600px", marginLeft:"25px"}}>
      <h1>Screener</h1>
      <div className="column-selection-container">
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

    return !isNaN(value) ? weight * parseFloat(value) : 0; 
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
