import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css"; // Importing CSS

export default function AddProduct() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    imageUrl: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function addProduct(e) {
    e.preventDefault();
    axios
      .post("https://ecommerce-sobl.onrender.com/api/product/add", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        console.log("Response from add product", res);
        alert("Product added successfully!");
        navigate("/"); // Redirect to home after adding
      })
      .catch((error) => {
        console.log("Error from add product", error);
      });
  }

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form className="add-product-form">
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            name="description"
            placeholder="Enter product description"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            name="price"
            placeholder="Enter product price"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            name="stock"
            placeholder="Enter product stock"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            name="category"
            placeholder="Enter product category"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            name="imageUrl"
            placeholder="Enter product image URL"
            onChange={handleChange}
            required
          />
        </div>
        <button className="add-product-btn" onClick={addProduct}>
          Add Product
        </button>
      </form>
    </div>
  );
}
