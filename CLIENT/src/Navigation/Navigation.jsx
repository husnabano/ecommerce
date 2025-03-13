import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Navigation.css"; // Importing CSS

export default function Navigation() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-title">Delishaas</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            {user && user.role === "user" && <Link to="/cart">Cart</Link>}
            {user && user.role === "admin" && <Link to="/add-product">Add Product</Link>}
            <Link onClick={logout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
