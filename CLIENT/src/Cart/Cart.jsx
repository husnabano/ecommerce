import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css"; // Importing CSS

export default function Cart() {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartProducts();
  }, []);

  async function fetchCartProducts() {
    await axios
      .get("https://ecommerce-sobl.onrender.com/api/cart", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        console.log(res.data);
        setCart(res.data.products);
      })
      .catch((err) => {
        console.log("Error fetching cart items", err);
      });
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);

  function handleCheckout() {
    navigate("/checkout", { state: { cart } });
  }

  async function removeFromCart(productId) {
    try {
      await axios
        .delete(`https://ecommerce-sobl.onrender.com/api/cart/remove/${productId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          console.log(res.data.cart.products);
          setCart(res.data.cart.products);
        });
    } catch (err) {
      console.log("Error removing item from cart", err);
    }
  }

  if (!user) return <p className="login-message">Please log in to view your cart details.</p>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">No products in cart</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.productId._id} className="cart-item">
              <img src={item.productId.imageUrl} alt={item.productId.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.productId.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: Rs. {item.productId.price}</p>
                <p>Description: {item.productId.description}</p>
                <p className="item-total">Total: Rs. {(item.quantity * item.productId.price).toFixed(2)}</p>
                <button className="remove-btn" onClick={() => removeFromCart(item.productId._id)}>
                  Remove Item
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total Price: Rs. {totalPrice.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
