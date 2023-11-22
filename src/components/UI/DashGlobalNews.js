import React, { useEffect, useState } from "react";
import axios from "axios";

const DashNews = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=T2M8WX41XQRRC0XU"
        );
  
       
        if (response.data && response.data.feed) {
          setNewsData(response.data.feed);
        } else {
          console.error("News data is missing 'feed' property:", response.data);
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
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

  
  return (
    <div
    className="container mt-5"
    style={{ maxWidth: "900px", display: "flex" }} 
  >
  <div
        className="row d-flex align-items-center"
        style={{ display: "flex", flex: "1", flexDirection: "column" }} 
      >
        <div className="col-md-12">
    <div className="col-md-12">
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">Latest Global News/Article</h4>
          <div className="table-responsive">
            <table className="table table-sm">
              <tbody >
                <tr >
                <td style={{ width: "50%" }} className="h-100">
                    <table className="table table-borderless" >
                      <tbody  >
                        {newsData.slice(0, 5).map((item) => (
                          <tr key={item.time_published}>
                            <td
                              style={{
                                width: "200px",
                                border: "1px solid #dee2e6",
                                padding: "5px",
                              }}
                              className="align-middle"
                            >
                              <img
                                src={item.banner_image}
                                alt="News"
                                className="img-fluid"
                                style={{ maxWidth: "100%", height: "auto" }}
                              />
                            </td>
                            <td
                              style={{
                                border: "1px solid #dee2e6",
                                padding: "5px",
                                minWidth: "300px",
                                width: "50%",
                              }}
                              className="align-middle"
                            >
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none" }}
                              >
                                <h6
                                  className="title-text"
                                  style={{
                                    color: "black",
                                    marginBottom: "0",
                                    fontSize: "14px",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 2,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {item.title}
                                </h6>
                              </a>
                              <p
                                style={{
                                  marginBottom: "10px",
                                  width: "200px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.authors}
                              </p>
                              <p style={{ marginTop: "3px" }}>
                                {getTimeDifference(item.time_published)}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td style={{ width: "50%" }} className="h-100">
                    <table className="table table-borderless">
                      <tbody>
                        {newsData.slice(5, 10).map((item) => (
                          <tr key={item.time_published}>
                            <td
                              style={{
                                width: "200px",
                                border: "1px solid #dee2e6",
                                padding: "5px",
                              }}
                              className="align-middle"
                            >
                              <img
                                src={item.banner_image}
                                alt="News"
                                className="img-fluid"
                                style={{ maxWidth: "100%", height: "auto" }}
                              />
                            </td>
                            <td
                              style={{
                                border: "1px solid #dee2e6",
                                padding: "5px",
                                minWidth: "300px",
                                width: "50%",
                              }}
                              className="align-middle"
                            >
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none" }}
                              >
                                <h6
                                  className="title-text"
                                  style={{
                                    color: "black",
                                    marginBottom: "0",
                                    fontSize: "14px",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 2,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {item.title}
                                </h6>
                              </a>
                              <p
                                style={{
                                  marginBottom: "10px",
                                  width: "200px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.authors}
                              </p>
                              <p style={{ marginTop: "3px" }}>
                                {getTimeDifference(item.time_published)}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-center">
            <a href="/news" className="text-decoration-none">
              See More News <span>&raquo;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  );
};

export default DashNews;
