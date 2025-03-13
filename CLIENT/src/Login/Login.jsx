import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importing CSS

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("https://ecommerce-sobl.onrender.com/api/auth/login", formData)
      .then((res) => {
        console.log("Login response", res);
        if (res.status === 200) {
          setUser({ token: res.data.token, role: res.data.role });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error from login", err);
      });
  }

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <input type="email" placeholder="Email ID" name="email" onChange={handleChange} />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" name="password" onChange={handleChange} />
        </div>
        <button className="login-btn" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}
