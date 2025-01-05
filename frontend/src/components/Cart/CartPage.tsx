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
  const [total, setTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  useEffect(() => {
    updateTotal(cartItems);
  }, [cartItems]);

  const updateTotal = (cartItems: ProductInfo[]) => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(total);

    const shipping = total >= 5000 ? 0 : 100;
    setShippingCost(shipping);
  };

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
    setCartItems((prevCartItems) => {
      const newCartItems = [...prevCartItems];
      const item = { ...newCartItems[index] };
      const newQuantity = item.quantity + change;

      if (newQuantity >= 1 && newQuantity <= item.maxQuantity) {
        item.quantity = newQuantity;
        newCartItems[index] = item;
        localStorage.setItem("cart", JSON.stringify(newCartItems));
        updateTotal(newCartItems);
        return newCartItems;
      }
      return prevCartItems;
    });
  };

  const handClearAll = () => {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
    updateTotal([]);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          color: "#000000",
        }}
      >
        <NavBar />
        <div className="cart-n-checkout">
          <div className="cart-container">
            <div className="header-n-clear-all">
              <h1 className="cart-header">SHOPPING CART</h1>
              <button onClick={handClearAll}>Clear All</button>
            </div>

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
                    <h3
                      style={{
                        fontWeight: "500",
                        fontSize: "1rem",
                        margin: "0.5rem auto 1rem",
                      }}
                    >
                      {item.name}
                    </h3>
                    <p className="price">
                      Price: RM{" "}
                      {item.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
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
              <div className="empty-cart">
                <img
                  src="https://img.icons8.com/nolan/96/shopping-cart.png"
                  width="130"
                  height="130"
                />
                <h3>
                  <strong>Your Cart is Empty</strong>
                </h3>
                <a href="/#categories" className="browse-btn" data-abc="true">
                  Continue Browsing
                </a>
              </div>
            )}
          </div>
          <div className="order-summary">
            <div className="summary-details">
              <h1>ORDER SUMMARY</h1>
              <div className="summary-row">
                <p className="summary-title">Subtotal (including tax):</p>
                <p className="summary-value">
                  RM{" "}
                  {total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="summary-row">
                <p className="summary-title">Shipping:</p>{" "}
                <p
                  className="summary-value"
                  style={{ color: "#196A0B", fontWeight: "500" }}
                >
                  {shippingCost === 0
                    ? "Free"
                    : `RM ${shippingCost.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`}
                </p>
              </div>
              <div className="summary-row">
                <p className="summary-title">Tax (10%):</p>{" "}
                <p className="summary-value">
                  RM{" "}
                  {((total / 1.1) * 0.1).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <hr style={{ margin: "1rem 2rem" }} />
              <div className="summary-row">
                <p className="summary-title" style={{ fontWeight: "600" }}>
                  Expected Total:
                </p>{" "}
                <p className="summary-value" style={{ fontWeight: "600" }}>
                  RM{" "}
                  {total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <button className="payment-btn">Proceed to Payment</button>
              <hr style={{ margin: "1rem 2rem" }} />
              <div className="payment-methods">
                <h3 style={{ fontWeight: "700", margin: "0.5rem 2rem" }}>
                  PAYMENT METHODS
                </h3>{" "}
                <ul className="payment-logo">
                  <li className="Ei2TcA">
                    <img
                      src="https://down-my.img.susercontent.com/file/735e9b602704f9fcecc0fc589358d5df"
                      alt="Paymentlogo"
                    />
                  </li>
                  <li className="Ei2TcA">
                    <img
                      src="https://down-my.img.susercontent.com/file/8612df33671e5fcf4e3896dddc09126f"
                      alt="Paymentlogo"
                    />
                  </li>
                  <li className="Ei2TcA">
                    <img
                      src="https://down-my.img.susercontent.com/file/be96ecd1fe21e89d006f285bae7db4ee"
                      alt="Paymentlogo"
                    />
                  </li>
                  <li className="Ei2TcA">
                    <img
                      src="https://down-my.img.susercontent.com/file/2b9fdf2b116defb1373ec0ca833b622e"
                      alt="Paymentlogo"
                    />
                  </li>
                  <li className="Ei2TcA">
                    <img
                      src="https://down-my.img.susercontent.com/file/9c50afbccfc08119c4e14038c64cc0ab"
                      alt="Paymentlogo"
                    />
                  </li>
                  <li className="Ei2TcA">
                    <img
                      src="https://down-my.img.susercontent.com/file/f3a5219c3d68c4408a9eb1095fb820b8"
                      alt="Paymentlogo"
                    />
                  </li>
                  <li className="Ei2TcA">
                    <img
                      src="https://down-my.img.susercontent.com/file/1c15be6ef971c4b91e758590c2b96742"
                      alt="Paymentlogo"
                    />
                  </li>
                  <li className="Ei2TcA">
                    <img
                      src="https://down-my.img.susercontent.com/file/fd3605c25740d44da2609c8a1436abc5"
                      alt="Paymentlogo"
                    />
                  </li>
                  <li className="Ei2TcA">
                    <img
                      src="https://down-my.img.susercontent.com/file/35c12ef72a9150918b2f25f90b0aad44"
                      alt="Paymentlogo"
                    />
                  </li>
                  <li className="Ei2TcA">
                    <img
                      src="https://down-my.img.susercontent.com/file/4033bf33861a853bcba707d544694940"
                      alt="Paymentlogo"
                    />
                  </li>
                  <li className="Ei2TcA">
                    <img
                      src="https://down-my.img.susercontent.com/file/f9064fd45144e68e314586ee350b52dd"
                      alt="Paymentlogo"
                    />
                  </li>
                  <li className="Ei2TcA">
                    <img
                      src="https://down-my.img.susercontent.com/file/2d504b9eaad31ffb9d9a5070a7f3207b"
                      alt="Paymentlogo"
                    />
                  </li>
                </ul>
              </div>
              <hr style={{ margin: "1rem 2rem" }} />
              <p
                className="disclaimer"
                style={{ fontSize: "0.75rem", margin: "0 0 2rem 2rem" }}
              >
                By proceeding to checkout you're agreeing to our{" "}
                <span>
                  <a
                    href="/legal/privacy-policy"
                    style={{ textDecoration: "underline" }}
                  >
                    Privacy Policy
                  </a>
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CartPage;
