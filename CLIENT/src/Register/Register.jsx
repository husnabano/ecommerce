import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Importing CSS

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
  });

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    axios
      .post("https://ecommerce-sobl.onrender.com/api/auth/signup", formData)
      .then((res) => {
        console.log("Response from register", res);
        localStorage.setItem("token", res.data.token);
        setUser({ token: res.data.token, role: res.data.role });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="register-container">
      <form className="register-form">
        <h2>Register</h2>
        <div className="input-group">
          <input type="text" placeholder="Name" name="username" onChange={handleChange} />
        </div>
        <div className="input-group">
          <input type="email" placeholder="Email ID" name="email" onChange={handleChange} />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" name="password" onChange={handleChange} />
        </div>
        <div className="input-group">
          <input type="text" placeholder="Mobile Number" name="mobile" onChange={handleChange} />
        </div>
        <button className="register-btn" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
}
