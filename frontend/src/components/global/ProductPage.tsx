import { useLocation } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Faq from "../MainPage/Faq";
import Footer from "./Footer";
import "../../style/Global.css";
import "../../style/Products.css";
import "../../style/MainPage.css";

type ProductInfo = {
  imgSrc: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
  quantity: number;
  specs: string;
};

function ProductPage() {
  const location = useLocation();
  const product = location.state?.product as ProductInfo;
  const topRef = useRef<HTMLDivElement>(null);
  const [inputQuantity, setInputQuantity] = useState(1);

  useEffect(() => {
    if (product && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [product]);

  const addToCart = () => {
    if (product.quantity === 0) {
      alert("This product is out of stock and cannot be added to the cart.");
      return; // Prevent adding out-of-stock items
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = cart.findIndex(
      (item: ProductInfo) => item.name === product.name
    );

    if (existingProductIndex !== -1) {
      const newQuantity = cart[existingProductIndex].quantity + inputQuantity;
      // Ensure not to exceed the available stock
      cart[existingProductIndex].quantity = Math.min(
        newQuantity,
        product.quantity
      );
    } else {
      // Add new product with current input quantity and maxQuantity as product.quantity
      const newProduct = {
        ...product,
        quantity: inputQuantity,
        maxQuantity: product.quantity,
      };
      cart.push(newProduct);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  const handleIncrease = () => {
    setInputQuantity((prev) => {
      if (prev < product.quantity) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handleDecrease = () => {
    setInputQuantity((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  const specsArray = product.specs
    ? product.specs.split(";").map((spec) => {
        const [key, value] = spec.split(":").map((item) => item.trim());
        return { key, value };
      })
    : [];

  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const imgContainer = imgContainerRef.current;
    const img = imgRef.current;
    if (!imgContainer || !img) return;

    const rect = imgContainer.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(3)";
  };

  const handleMouseLeave = () => {
    const img = imgRef.current;
    if (!img) return;

    img.style.transformOrigin = "center center";
    img.style.transform = "scale(1)";
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  function getStockStatus(quantity: number) {
    if (quantity === 0) {
      return { text: "Out of stock", color: "red" };
    } else if (quantity > 0 && quantity <= 5) {
      return { text: "Low in stock", color: "orange" };
    } else {
      return { text: "Available", color: "green" };
    }
  }

  return (
    <>
      <div className="product-details-container" ref={topRef}>
        <NavBar />
        <SearchBar />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <hr
            style={{
              border: "none",
              height: "2px",
              backgroundColor: "#000000",
              width: "70%",
              margin: "10px 0",
              textAlign: "center",
            }}
          />
        </div>
        <h2 style={{ textAlign: "left" }}>{product.name}</h2>
        <div
          ref={imgContainerRef}
          className="product-details-image-container"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img ref={imgRef} src={product.imgSrc} alt={product.name} />
        </div>
        <div className="product-details-row-2">
          <div className="product-details-desc">
            <h2>About This Product</h2>
            <p>{product.description}</p>
          </div>
          <div className="price-cart">
            <div className="price-cart-card">
              <h2
                className="price"
                style={{ fontFamily: "Poppins", fontSize: "1.85rem" }}
              >
                RM{" "}
                {Number(product.price)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h2>
              <div
                className="stock-status"
                style={{
                  color: getStockStatus(product.quantity).color,
                  textAlign: "center",
                }}
              >
                {getStockStatus(product.quantity).text}
              </div>
              <div className="quantity-control">
                <button
                  className="decrease"
                  onClick={handleDecrease}
                  style={{ width: "30px" }}
                >
                  <i className="minus-icon">-</i>
                </button>
                <input
                  type="number"
                  value={inputQuantity}
                  readOnly
                  className="quantity-input"
                />
                <button
                  className="increase"
                  onClick={handleIncrease}
                  style={{ width: "30px" }}
                >
                  <i className="plus-icon">+</i>
                </button>
              </div>
              <button className="add-to-cart" onClick={addToCart}>
                <i className="cart-icon"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
        <h2 style={{ textAlign: "left", margin: "0 auto" }}>Specifications</h2>
        <div className="product-details-row-3">
          <div className="product-details-specs">
            {specsArray.length > 0 && (
              <div className="specs-container">
                <table>
                  <tbody style={{ fontSize: "0.9rem" }}>
                    {specsArray.map((spec, index) => (
                      <tr key={index}>
                        <td style={{ width: "20%" }}>
                          <strong>{spec.key}</strong>
                        </td>
                        <td>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className="section-3" style={{ backgroundColor: "#000000" }}>
          <h2
            style={{
              margin: "0 auto 2rem",
              fontSize: "2rem",
              color: "#FFFFFF",
            }}
          >
            Frequently Asked Questions
          </h2>
          <Faq />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;
