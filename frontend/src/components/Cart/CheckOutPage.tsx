import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

function CheckOutPage() {
  const [cartItems, setCartItems] = useState<ProductInfo[]>([]);
  const [total, setTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    country: "",
    city: "",
    postCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    //console.log(cart)
    setCartItems(cart);
  }, []);

  console.log(cartItems);

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

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8083/backend/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          address: formData.address,
          country: formData.country,
          city: formData.city,
          postcode: formData.postCode,
          orderDate: "2025-01-18",
          paymentMethod: "Credit Card",
          paymentStatus: "Paid",
          cartItems: cartItems,
        }),
      });
      if (response.ok) {
        const data = await response.json();

        if (data.status) {
          console.log(data.status);
          console.log("Checkout successfully");
          // setMessage("Product updated successfully");
          setSuccessMessage(`Checkout successfully`);
          navigate("/invoice");
        } else {
          console.error("Failed to checkout");
          // setMessage("Failed to update product. Please try again.");
          setSuccessMessage("Failed to checkout. Please try again.");
        }
      } else {
        console.error("Failed to checkout oho");
        setSuccessMessage("Failed to checkout.");
      }
    } catch (error) {
      console.error("Unable to connect to server", error);
      setSuccessMessage(
        "Network Error: Unable to reach the server. Please try again."
      );
    }
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
        <div className="payment-summary">
          <div className="payment-container">
            <div>
              <h1 className="checkout-header">Payment Information</h1>
              <hr style={{ width: "calc(100% - 4rem)" }} />
              <h3 style={{ margin: "2rem 2rem 1rem" }}>Personal Details</h3>
              <form onSubmit={handlePlaceOrder}>
                <div className="checkout-details">
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Full Name
                        <span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="i.e. Wong Mei Zhen"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Phone Number
                        <span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder="i.e. 012-3456789"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Email
                        <span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="i.e. youremail@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Address
                        <span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        placeholder="i.e. 123 Happy Road"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row-address">
                  <div className="form-group">
                    <label>
                      Country
                      <span style={{ color: "red" }}> *</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      placeholder="i.e. Malaysia"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      City
                      <span style={{ color: "red" }}> *</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="i.e. Sarawak"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Post Code
                      <span style={{ color: "red" }}> *</span>
                    </label>
                    <input
                      type="text"
                      name="postCode"
                      placeholder="i.e. 93200"
                      value={formData.postCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="payment-btn">
                  Place Order
                </button>
              </form>
            </div>
          </div>
          <div className="order-summary">
            <div className="summary-details">
              <h1>ORDER SUMMARY</h1>
              <div className="summary-row">
                <p className="summary-title">Subtotal:</p>
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
                <p className="summary-title">Tax (10% incl.):</p>{" "}
                <p className="summary-value">
                  RM{" "}
                  {((total / 1) * 0.1).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <hr style={{ margin: "1rem 2rem" }} />
              <div className="summary-row">
                <p className="summary-title" style={{ fontWeight: "600" }}>
                  Total:
                </p>{" "}
                <p className="summary-value" style={{ fontWeight: "600" }}>
                  RM{" "}
                  {((total / 1) * 1.1).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              {/* <button
                                type="button"
                                className="payment-btn"
                                // onClick={handlePlaceOrder}
                            >
                                Place Order
                            </button> */}
              {/* <div>{successMessage && <p>{successMessage}</p>}</div> */}
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
}

export default CheckOutPage;
