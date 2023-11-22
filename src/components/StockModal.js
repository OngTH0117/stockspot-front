import React from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import "./StockModal.css";
import { toast } from "react-toastify";

const StockModal = ({ stock, onClose }) => {
  const addToWatchlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/addToWatchlist",
        {
          stockIdentifier: stock["Identifier (RIC)"],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Stock added to watchlist:", response.data);
      toast.success("Stock added to your watchlist!", {
        position: "top-left",
        autoClose: 3000, //Close after 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <Modal show={true} onHide={onClose} centered dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">
          {stock["Company Name"]} ({stock["Identifier (RIC)"]})
        </Modal.Title>

        {isLoggedIn && (
          <button
            className="button-4"
            style={{ marginLeft: "20px" }}
            onClick={addToWatchlist}
          >
            Add to Watchlist
          </button>
        )}
      </Modal.Header>
      <Modal.Body>
        <div className="modal-content-columns">
          <div className="modal-column">
            <dl className="stock-info-list">
              <div className="info-item">
                <dt>Country of Incorporation</dt>
                <dd>{stock["Country of Incorporation"]}</dd>
              </div>
              <div className="info-item">
                <dt>Price</dt>
                <dd>{stock["Price Close"]}</dd>
              </div>
              <div className="info-item">
                <dt>Total Assets(RM)</dt>
                <dd>{stock["Total Assets"]}</dd>
              </div>
              <div className="info-item">
                <dt>Current Ratio</dt>
                <dd>{stock["Current Ratio"]}</dd>
              </div>
              <div className="info-item">
                <dt>Debt to Equity</dt>
                <dd>{stock["Debt to Equity"]}</dd>
              </div>
              <div className="info-item">
                <dt>Dividend Yield</dt>
                <dd>{stock["Dividend Yield"]}</dd>
              </div>
              <div className="info-item">
                <dt>Gross Profit Margin</dt>
                <dd>{stock["Gross Profit Margin"].toFixed(2)}</dd>
              </div>
            </dl>
          </div>
          <div className="modal-column">
            <dl className="stock-info-list">
              <div className="info-item">
                <dt>GICS Sector Name</dt>
                <dd>{stock["GICS Sector Name"]}</dd>
              </div>
              <div className="info-item">
                <dt>Free Cash Flow(RM)</dt>
                <dd>{stock["Free Cash Flow"]}</dd>
              </div>
              <div className="info-item">
                <dt>Operating Income(RM)</dt>
                <dd>{stock["Operating Income"]}</dd>
              </div>
              <div className="info-item">
                <dt>P/E</dt>
                <dd>{stock["P/E"].toFixed(2)}</dd>
              </div>
              <div className="info-item">
                <dt>P/S ratio</dt>
                <dd>{stock["P/S ratio"].toFixed(2)}</dd>
              </div>
              <div className="info-item">
                <dt>ROA</dt>
                <dd>{stock["ROA"].toFixed(2)}</dd>
              </div>
              <div className="info-item">
                <dt>ROE</dt>
                <dd>{stock["ROE"].toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default StockModal;
