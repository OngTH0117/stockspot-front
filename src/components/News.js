import React, { useEffect, useState } from 'react';
import Header from './UI/Header';
import Footer from './UI/Footer';
import axios from 'axios';

function News() {
  const [newsData, setNewsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
        'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&time_from=20220410T0130&limit=1000&apikey=T2M8WX41XQRRC0XU'
        );

        // Check if 'feed' exists in the response data
        if (response.data && response.data.feed) {
          setNewsData(response.data.feed);
        } else {
          console.error('News data is missing "feed" property:', response.data);
        }
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchData();
  }, []);

  function getTimeDifference(publishedTime) {
    const currentTime = new Date();
    const currentUtcTime = new Date(currentTime.toUTCString());
    const publishedUtcTime = new Date(
      parseInt(publishedTime.slice(0, 4)), 
      parseInt(publishedTime.slice(4, 6)) - 1, 
      parseInt(publishedTime.slice(6, 8)), 
      parseInt(publishedTime.slice(9, 11)), 
      parseInt(publishedTime.slice(11, 13)), 
      parseInt(publishedTime.slice(13, 15)) 
    );
    const timeDifferenceInSeconds = Math.floor(
      (currentUtcTime - publishedUtcTime) / 1000
    );

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} second${
        timeDifferenceInSeconds !== 1 ? "s" : ""
      } ago`;
    }

    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);

    if (timeDifferenceInMinutes < 60) {
      return `${timeDifferenceInMinutes} minute${
        timeDifferenceInMinutes !== 1 ? "s" : ""
      } ago`;
    }

    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);

    if (timeDifferenceInHours < 24) {
      return `${timeDifferenceInHours} hour${
        timeDifferenceInHours !== 1 ? "s" : ""
      } ago`;
    }

    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
    return `${timeDifferenceInDays} day${
      timeDifferenceInDays !== 1 ? "s" : ""
    } ago`;
  }


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredNewsData = newsData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
    <Header />
    <div style={{ marginTop: '100px' }}>
      <div className="container my-4" style={{ maxWidth: '1500px', marginTop: '120px' }}>
        <h1 className="mb-4">Global Market news</h1>
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search news..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {filteredNewsData.map((item, index) => (
            <div className="col" key={`${item.time_published}_${index}`} style={{ flexBasis: '25%' }}>
              <div className="card h-100">
                  <img
                    src={item.banner_image}
                    alt="News"
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <h5 className="card-title mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 3, overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical' }}>
                        {item.title}
                      </h5>
                    </a>
                    <p className="card-text">{item.authors}</p>
                    <p className="card-text">{getTimeDifference(item.time_published)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default News;