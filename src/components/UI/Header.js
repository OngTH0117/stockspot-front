import React, { useState, useRef, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Header.css";


function Header() {
  const navigate = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsUserDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const user = JSON.parse(localStorage.getItem("user"));
      setUsername(user?.name || "");
      setUser(user); // set the user data in the state
    } else {
      setIsLoggedIn(false);
      setUsername("");
      setUser(null); // set user to null if not logged in
    }
  }, [isLoggedIn]);
  const handleLogout = () => {
    // remove the token and reset state
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login"); // Redirect the user to the login page after logout
  };

  return (
    <div>
      <ul>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
        

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.2.0/mdb.min.css"
          rel="stylesheet"
        />

        <script
          type="text/javascript"
          src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.2.0/mdb.min.js"
        ></script>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        />

        <script
          type="text/javascript"
          src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.2.0/mdb.min.js"
        ></script>
        <script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
          integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
          integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
          crossorigin="anonymous"
        ></script>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

       
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet"></link>
      </ul>

      <nav
        className="navbar navbar-expand-lg navbar-light bg-blue fixed-top"
        style={{ position: "fixed", marginRight: "0px", zIndex: "9999" }}
      >
        <div className="container-fluid pl-3">
          <a className="navbar-brand" href="/home">
          <img src="StockSpot.png" alt="Logo" width="40" height="40" />
          <span className="ml-2" style={{ color: 'white' }}>StockSpot</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
        
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/screener">
                  Stock Screener
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/market">
                  Market
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/news">
                News
                </a>
              </li>
              <li className="nav-item dropdown">
                <NavDropdown title="Community" id="navbarDropdown2">
                  <NavDropdown.Item href="/blog">Blog Post</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
                </NavDropdown>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav ms-auto" style={{ marginLeft: "-15px" }}>
        {!isLoggedIn && (
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>
        )}

        {isLoggedIn && (
          <li className="nav-item dropdown" ref={dropdownRef}>
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown3"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={toggleUserDropdown}
            >
              <i className="fa fa-user-circle-o me-2" aria-hidden="true"></i>
              {user.name}
            </a>
            <div
              className={`dropdown-menu dropdown-menu-end ${
                isUserDropdownOpen ? "show" : ""
              }`}
              aria-labelledby="navbarDropdown3"
              style={{ right: 0, left: "auto" }}
            >
              <a className="dropdown-item" href="/userProfile">
                Profile
              </a>
              <a className="dropdown-item" href="#" onClick={handleLogout}>
                Sign Out
              </a>
            </div>
          </li>
        )}
      </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
