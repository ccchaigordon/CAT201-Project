import { useState, useEffect, useRef, useMemo } from "react";
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

function Squier() {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("Latest"); // Set Default to 'Latest'
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
          "http://localhost:8083/backend/getAllProducts"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch guitar data");
        }
        const fetchedProducts: ProductInfo[] = await response.json();

        // Filter and update the products state with the fetched data
        const filteredProducts = fetchedProducts.filter((product) =>
          product.id.startsWith("SQR")
        );
        setProducts(filteredProducts);
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
      <h2 style={{ marginTop: "3rem" }}>Squier by Fender</h2>
      <div className="intro-container">
        <img
          src="/assets/squier.png"
          alt="Squier Logo"
          style={{ height: "7rem", width: "auto", filter: "invert(100%)" }}
        />
        <p>
          Squier by Fender: Affordable Excellence with Classic Heritage.
          <br />
          <br />A subsidiary of the renowned Fender brand, delivers exceptional
          value by bringing the iconic designs, classic aesthetics, and
          distinguished tones of Fender instruments to an affordable price
          point. Established to cater to beginners and emerging musicians,
          Squier offers a range of electric guitars, basses, and acoustic
          instruments that don't compromise on quality. Each model is crafted
          with the care and attention to detail that Fender is famous for,
          ensuring that every musician can experience the feel and sound of a
          classic Fender, whether they're strumming their first chords or
          rocking out on stage.
        </p>
      </div>
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

export default Squier;
