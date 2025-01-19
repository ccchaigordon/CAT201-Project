import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import NavBar from "../global/NavBar";
import SearchBar from "../global/SearchBar";
import Footer from "../global/Footer";
import "../../style/Products.css";

type ProductInfo = {
  id: string;
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

const PRODUCTS_PER_PAGE = 16;

function renderStars(rating: number) {
  const totalStars = 5;
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      <span key={i} className={i <= rating ? "filled-star" : "unfilled-star"}>
        {i <= rating ? "★" : "☆"}
      </span>
    );
  }
  return stars;
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

function SearchedProducts() {
  const location = useLocation();
  const products = (location.state?.products as ProductInfo[]) || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("Latest");
  const productSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedSortOrder = localStorage.getItem("sortOrder");
    if (savedSortOrder) {
      setSortOrder(savedSortOrder);
    }
  }, []);

  useEffect(() => {
    // Scroll to product section top
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage, products]);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortOrder) {
      case "Latest":
        sorted.reverse();
        break;
      case "Price (Low to High)":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Price (High to Low)":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "Most Popular":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
    }
    return sorted;
  }, [products, sortOrder]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentPageProducts = sortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  return (
    <>
      <NavBar />
      <SearchBar />
      <div className="intro-container" style={{ margin: "2rem auto" }}>
        <p>
          Browse through our selection based on your search. Find products
          tailored to your preferences.
        </p>
      </div>
      {products.length > 0 ? (
        <div className="product-section" ref={productSectionRef}>
          <div className="filter">
            <p style={{ textAlign: "right" }}>Sort by</p>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="sort"
            >
              <option value="Most Popular">Most Popular</option>
              <option value="Latest">Latest</option>
              <option value="Price (Low to High)">Price (Low to High)</option>
              <option value="Price (High to Low)">Price (High to Low)</option>
            </select>
          </div>
          <div className="product-grid">
            {currentPageProducts.map((product, index) => (
              <Link
                to={`/product/${product.name.replace(/ /g, "-").toLowerCase()}`}
                state={{ product }}
                key={index}
                style={{ textDecoration: "none", color: "#000000" }}
              >
                <div className="product-section-card">
                  <img
                    src={product.imgSrc}
                    alt={product.name}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <div className="product-grid-info">
                    <h2>{product.name}</h2>
                    <h3>
                      RM{" "}
                      {Number(product.price)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </h3>
                    <div className="rating">{renderStars(product.rating)}</div>
                    <div
                      className="stock-status"
                      style={{ color: getStockStatus(product.quantity).color }}
                    >
                      {getStockStatus(product.quantity).text}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage <= 1}>
              Previous
            </button>
            <button onClick={handleNext} disabled={currentPage >= totalPages}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div
          className="product-not-found"
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            margin: "0",
            height: "calc(50vh - 5rem)",
            color: "#000000",
            backgroundColor: "#FFFFFF",
            alignItems: "center",
          }}
        >
          No products found
        </div>
      )}
      <Footer />
    </>
  );
}

export default SearchedProducts;
