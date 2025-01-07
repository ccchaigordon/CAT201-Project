import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
//import Papa from "papaparse";
import { Link } from "react-router-dom";

type ProductInfo = {
  id: string;
  imgSrc: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  quantity: number;
  description: string;
  specs: string;
};

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

function TopSellers() {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 4;

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          // Fetch data from the servlet
          const response = await fetch("http://localhost:8080/backend/getProducts?category=topseller");
          if (!response.ok) {
            throw new Error("Failed to fetch top seller data");
          }
          const fetchedProducts: ProductInfo[] = await response.json();
        
          setProducts(fetchedProducts);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
    
      fetchProducts();
    }, []);

  const moveSlideLeft = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return Math.max(0, products.length - itemsPerSlide); // Move to the last set of products
      }
      return prevIndex - 1;
    });
  };

  const moveSlideRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= products.length - itemsPerSlide ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (!trackRef.current || products.length === 0) return;
    const cardWidth = (trackRef.current.children[0] as HTMLDivElement)
      .offsetWidth;
    trackRef.current.style.transform = `translateX(-${
      currentIndex * cardWidth
    }px)`;
  }, [currentIndex, products]);

  if (products.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="slide-container">
      <div className="title-and-buttons">
        <h2>Top Sellers</h2>
        <div className="navigation-buttons">
          <button onClick={moveSlideLeft} className="slider-button">
            <FaArrowLeft />
          </button>
          <button onClick={moveSlideRight} className="slider-button">
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="slider">
        <div className="slide-track" ref={trackRef}>
          {products.map((product, index) => (
            <Link
              key={index}
              to={`/product/${product.name.replace(/ /g, "-").toLowerCase()}`}
              state={{ product }}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <div className="slide">
                <div className="product-card">
                  <img src={product.imgSrc} alt={product.name} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <h4>
                      RM{" "}
                      {product.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </h4>
                    <div className="rating">{renderStars(product.rating)}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopSellers;
