import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Importing CSS

export default function Home() {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    await axios
      .get("https://ecommerce-sobl.onrender.com/api/product")
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("Error from home at fetching products", err);
      });
  }

  async function addCart(productId) {
    console.log(productId);
    if (!user || !user.token) {
      alert("Please log in first");
      return;
    }
    try {
      await axios
        .post(
          "https://ecommerce-sobl.onrender.com/api/cart/add",
          { productId },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        .then((res) => {
          alert("Product added to cart");
          navigate("/cart");
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="home-container">
      <h2 className="title">Meat</h2>
      <div className="products-grid">
        {products.map((productItem) => (
          <div key={productItem._id} className="product-card">
            <h3>{productItem.name}</h3>
            <p>Price: <span className="price">${productItem.price}</span></p>
            <p>Description: {productItem.description}</p>
            <p>Stock: {productItem.stock}</p>
            <p>Category: {productItem.category}</p>
            <p>
              <img
                className="product-image"
                src={productItem.imageUrl}
                alt={productItem.name}
              />
            </p>
            {user && user.role === "user" && (
              <button className="add-cart-btn" onClick={() => addCart(productItem._id)}>
                Add to cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
