import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./UI/Header";
import Footer from "./UI/Footer";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showModal, setShowModal] = useState(false); 

  const handleRegister = (e) => {
    e.preventDefault();

    const userData = {
      name: name,
      email: email,
      contactNumber: contactNumber,
      address: address,
      password: password,
      password_confirmation: confirmPassword,
    };

    axios
      .post("http://127.0.0.1:8000/api/register", userData)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setError(null);
        setShowModal(true); // open the success modal
        // Redirect to login.js after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch((error) => {
        setError(error.response.data.error);
        setSuccessMessage(null);
        setShowModal(true); // Open the error modal
      });
  };

  const shouldShowLabel = (inputValue) => {
    return inputValue.length > 0;
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <style>
        {`
        .modal {
          /* Your existing styles */
          transition: opacity 0.3s;
        }

        .fade-out {
          opacity: 0;
        }
        .fade-in {
          animation: fade-in-animation 0.2s ease-in;
        }
        
        @keyframes fade-in-animation {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        `}
      </style>
      
      <Header />
      {showModal && (
         <div
         className={`modal ${showModal ? "fade-in" : ""}`}
         style={{ display: "block", marginTop: "40px" }}
       >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {successMessage ? "Success" : "Error"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}
                {error && <div className="alert alert-danger">{error}</div>}
              </div>
             
            </div>
          </div>
        </div>
      )}

      <div className="container h-100" style={{ marginTop: "100px" }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <form className="mx-1 mx-md-4">
                      <div className="mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw align-middle"></i>
                        <div
                          className={`form-outline mb-0 d-inline-block w-75 ${
                            shouldShowLabel(name) ? "active" : ""
                          }`}
                        >
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="name"
                            style={{ display: shouldShowLabel(name) ? "none" : "block" }}
                          >
                            Your Name
                          </label>
                        </div>
                      </div>

                      <div className="mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw align-middle"></i>
                        <div
                          className={`form-outline mb-0 d-inline-block w-75 ${
                            shouldShowLabel(email) ? "active" : ""
                          }`}
                        >
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="email"
                            style={{ display: shouldShowLabel(email) ? "none" : "block" }}
                          >
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div className="mb-4">
                        <i className="fas fa-phone fa-lg me-3 fa-fw align-middle"></i>
                        <div
                          className={`form-outline mb-0 d-inline-block w-75 ${
                            shouldShowLabel(contactNumber) ? "active" : ""
                          }`}
                        >
                          <input
                            type="text"
                            id="contactNumber"
                            className="form-control"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="contactNumber"
                            style={{
                              display: shouldShowLabel(contactNumber) ? "none" : "block",
                            }}
                          >
                            Contact Number
                          </label>
                        </div>
                      </div>

                      <div className="mb-4">
                        <i className="fas fa-map-marker fa-lg me-3 fa-fw align-middle"></i>
                        <div
                          className={`form-outline mb-0 d-inline-block w-75 ${
                            shouldShowLabel(address) ? "active" : ""
                          }`}
                        >
                          <input
                            type="text"
                            id="address"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="address"
                            style={{ display: shouldShowLabel(address) ? "none" : "block" }}
                          >
                            Your Address
                          </label>
                        </div>
                      </div>

                      <div className="mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw align-middle"></i>
                        <div
                          className={`form-outline mb-0 d-inline-block w-75 ${
                            shouldShowLabel(password) ? "active" : ""
                          }`}
                        >
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="password"
                            style={{ display: shouldShowLabel(password) ? "none" : "block" }}
                          >
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw align-middle"></i>
                        <div
                          className={`form-outline mb-0 d-inline-block w-75 ${
                            shouldShowLabel(confirmPassword) ? "active" : ""
                          }`}
                        >
                          <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="confirmPassword"
                            style={{
                              display: shouldShowLabel(confirmPassword) ? "none" : "block",
                            }}
                          >
                            Repeat your password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          data-toggle="modal" 
                          data-target="#exampleModal"
                          style={{ fontSize: "16px" }}
                          onClick={handleRegister}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg?w=2000" className="img-fluid" alt="image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;
