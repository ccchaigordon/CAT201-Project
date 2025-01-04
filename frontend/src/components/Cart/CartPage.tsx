import React, { useState, useEffect } from "react";
import NavBar from "../global/NavBar";
import Footer from "../global/Footer";
import "../../style/Cart.css";

type ProductInfo = {
  imgSrc: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  quantity: number; // Quantity in cart
  maxQuantity: number; //Quantity in stock
  specs: string;
};

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<ProductInfo[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) {
      return { text: "Out of stock", color: "red" };
    } else if (quantity > 0 && quantity <= 5) {
      return { text: "Low in stock", color: "orange" };
    } else {
      return { text: "Available", color: "green" };
    }
  };

  const handleRemove = (index: number) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleQuantityChange = (index: number, change: number) => {
    const newCart = [...cartItems];
    const item = newCart[index];

    const newQuantity = item.quantity + change;

    if (newQuantity >= 1 && newQuantity <= item.maxQuantity) {
      newCart[index].quantity = newQuantity;
      setCartItems(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#FFFFFF", color: "#000000" }}>
        <NavBar />
        <div className="cart-container">
          <h1 className="cart-header">Your Cart</h1>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-image">
                  <img
                    src={item.imgSrc}
                    alt={item.name}
                    style={{ height: "15rem", width: "auto" }}
                  />
                </div>
                <div className="cart-item-info">
                  <h3 style={{ fontWeight: "500" }}>{item.name}</h3>
                  <p className="price">Price: RM {item.price.toFixed(2)}</p>
                  <p
                    style={{
                      color: getStockStatus(item.maxQuantity).color,
                      margin: "1rem 0 0",
                    }}
                  >
                    {getStockStatus(item.maxQuantity).text}
                  </p>
                  <div className="cart-action">
                    <div className="quantity-control">
                      <button onClick={() => handleQuantityChange(index, -1)}>
                        -
                      </button>
                      {item.quantity}
                      <button onClick={() => handleQuantityChange(index, 1)}>
                        +
                      </button>
                    </div>
                    <button
                      className="remove-button"
                      onClick={() => handleRemove(index)}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CartPage;
