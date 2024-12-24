import { useLocation } from "react-router-dom";
import NavBar from "../global/NavBar";
import SearchBar from "../global/SearchBar";
import Footer from "../global/Footer";

type ProductInfo = {
  imgSrc: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
};

function ProductPage() {
  const location = useLocation();
  const product = location.state?.product as ProductInfo;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="product-details-container">
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
        <div className="product-details-row-1">
          <img src={product.imgSrc} alt={product.name} />
        </div>
        <div className="product-details-row-2">
          <div className="product-details-desc">
            <h2>About This Product</h2>
            <p>{product.description}</p>
          </div>
          <div className="price-cart">
            <div className="price-cart-card">
              <h2 className="price">
                RM{" "}
                {product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </h2>
              <div className="quantity-control">
                <button className="decrease">
                  <i className="minus-icon">-</i>
                </button>
                <input type="number" value="1" className="quantity-input" />
                <button className="increase">
                  <i className="plus-icon">+</i>
                </button>
              </div>
              <button className="add-to-cart">
                <i className="cart-icon"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;
