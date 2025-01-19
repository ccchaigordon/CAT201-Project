import { useState, useEffect, useRef, useMemo } from "react";
//import Papa from "papaparse";
import { Link } from "react-router-dom";

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

function Guitars() {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("Latest"); // Default to 'Latest'
  const [buttonClicked, setButtonClicked] = useState(false);
  const productSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedSortOrder = localStorage.getItem("sortOrder");
    if (savedSortOrder) {
      setSortOrder(savedSortOrder);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch data from the servlet
        const response = await fetch(
          "http://localhost:8083/backend/getProducts?category=guitar"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch guitar data");
        }
        const fetchedProducts: ProductInfo[] = await response.json();

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (buttonClicked && productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: "smooth" });
      setButtonClicked(false); // Reset after scrolling
    }
  }, [currentPage, buttonClicked]);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    if (sortOrder === "Latest") {
      sorted.reverse();
    } else if (sortOrder === "Price (Low to High)") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "Price (High to Low)") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "Most Popular") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [products, sortOrder]);

  const handleChangeSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    localStorage.setItem("sortOrder", newSortOrder);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setButtonClicked(true);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setButtonClicked(true);
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
      <h2 style={{ marginTop: "3rem" }}>Category: Guitars</h2>
      <div className="intro-container">
        <img
          src="/assets/category_guitar.jpg"
          alt="A person playing guitar"
          style={{ width: "50%", height: "auto" }}
        />
        <p>
          Dive into the world of rock, jazz, or blues with our electric guitars
          that promise versatility and innovation. Featuring models from leading
          brands, these guitars deliver a range of sounds that can be smooth and
          mellow or sharp and distorted, fulfilling the needs of any gig or
          recording session.
        </p>
      </div>
      <div className="product-section" ref={productSectionRef}>
        <div className="filter">
          <p style={{ textAlign: "right" }}>Sort by</p>
          <select
            value={sortOrder}
            onChange={handleChangeSortOrder}
            className="sort"
          >
            <option value="Price (Low to High)">Price (Low to High)</option>
            <option value="Price (High to Low)">Price (High to Low)</option>
            <option value="Most Popular">Most Popular</option>
            <option value="Latest">Latest</option>
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
                  alt={product.name || "Default name"}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="product-grid-info">
                  <h2>{product.name || "No name available"}</h2>
                  <h3>
                    RM{" "}
                    {Number(product.price)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </h3>
                  <div className="rating">{renderStars(product.rating)}</div>
                </div>
                <div
                  className="stock-status"
                  style={{
                    color: getStockStatus(product.quantity).color,
                  }}
                >
                  {getStockStatus(product.quantity).text}
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
      <Footer />
    </>
  );
}

export default Guitars;
