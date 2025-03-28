import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to Home Page after login
      navigate("/home"); 
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container auth-container">
      <h2 className="text-center">Login</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleLogin} className="">
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
