import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./UI/Header";
import Footer from "./UI/Footer";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // store the token and user data in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // redirect to the homepage
      navigate("/Home");
    } catch (error) {
      console.log("Login error:", error);
      console.log("Response data:", error.response ? error.response.data : null);
  
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        if (errors && errors.email) {
          alert(errors.email[0]);
        } else if (errors && errors.password) {
          alert(errors.password[0]);
        } else {
          alert("Login failed. Please try again.");
        }
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };
  return (
    <div>
      <Header />
      <div className="container h-100" style={{ marginTop: "100px" }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row d-flex align-items-center justify-content-center h-100">
                  <div className="col-md-8 col-lg-7 col-xl-6">
                    <img src="https://img.freepik.com/free-vector/welcome-word-flat-cartoon-people-characters_81522-4207.jpg?size=626&ext=jpg&ga=GA1.1.287529206.1693749358&semt=sph" className="img-fluid" alt="Phone image"  />
                  </div>
                  <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Login
                    </p>
                    <form onSubmit={handleLogin}>
                      <div className="form-floating mb-4">
                        <input
                          className="form-control form-control-lg"
                          id="form1Example13"
                          placeholder="Email"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="form1Example13">Email</label>
                      </div>
                      <div className="form-floating mb-4">
                        <input
                          className="form-control form-control-lg"
                          id="form1Example23"
                          placeholder="Password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="form1Example23">Password</label>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="form1Example3"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form1Example3"
                          >
                            {" "}
                            Remember me{" "}
                          </label>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                        style={{ fontSize: "14px" }}
                      >
                        Sign in
                      </button>
                      <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0 text-muted">
                          OR
                        </p>
                      </div>
                      <div className="text-center mt-3">
                        <p className="text-muted">
                          Don't have an account?{" "}
                          <a href="/register" className="text-primary">
                            Sign up
                          </a>
                        </p>
                      </div>
                    </form>
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

export default Login;
