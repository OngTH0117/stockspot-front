import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const Watchlist = ({ stock, onClose }) => {
  console.log('Stock data:', stock);
    return (
      <Modal show={true} onHide={onClose} centered dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">
          {stock['Company Name']} ({stock['Identifier (RIC)']})
        </Modal.Title>

      </Modal.Header>
      <Modal.Body>
        <div className="modal-content-columns">
          <div className="modal-column">
            <dl className="stock-info-list">
              <div className="info-item">
                <dt>Country of Incorporation</dt>
                <dd>{stock['Country of Incorporation']}</dd>
              </div>
              <div className="info-item">
              <dt>Price</dt>
            <dd>{stock['Price Close']}</dd>
              </div>
              <div className="info-item">
              <dt>Total Assets(RM)</dt>
            <dd>{stock['Total Assets']}</dd>
              </div>
              <div className="info-item">
              <dt>Current Ratio</dt>
              <dd>{stock['Current Ratio']}</dd>
            </div>
              <div className="info-item">
              <dt>Debt to Equity</dt>
            <dd>{stock['Debt to Equity']}</dd>
              </div>
              <div className="info-item">
              <dt>Dividend Yield</dt>
            <dd>{stock['Dividend Yield']}</dd>
              </div>
              <div className="info-item">
              <dt>Gross Profit Margin</dt>
            <dd>{stock['Gross Profit Margin']}</dd>
              </div>
            </dl>
          </div>
          <div className="modal-column">
            <dl className="stock-info-list">
              <div className="info-item">
                <dt>GICS Sector Name</dt>
                <dd>{stock['GICS Sector Name']}</dd>
              </div>
              <div className="info-item">
              <dt>Free Cash Flow(RM)</dt>
            <dd>{stock['Free Cash Flow']}</dd>
              </div>
              <div className="info-item">
              <dt>Operating Income(RM)</dt>
            <dd>{stock['Operating Income']}</dd>
              </div>
              <div className="info-item">
              <dt>P/E</dt>
            <dd>{stock['P/E']}</dd>
              </div>
              <div className="info-item">
              <dt>P/S ratio</dt>
            <dd>{stock['P/S ratio']}</dd>
              </div>
              <div className="info-item">
              <dt>ROA</dt>
            <dd>{stock['ROA']}</dd>
              </div>
              <div className="info-item">
              <dt>ROE</dt>
            <dd>{stock['ROE']}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Modal.Body>
    </Modal>
        
      
    );
  
  };
  export default Watchlist;