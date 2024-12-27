import { useEffect, useRef, useState } from "react";
import Papa from "papaparse";
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
  const offsetRef = useRef(0);

  useEffect(() => {
    const fetchTopSellers = async () => {
      const response = await fetch("/TopSellers.csv");
      const csvData = await response.text();
      const parsedData = Papa.parse<ProductInfo>(csvData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      }).data;
      setProducts(parsedData);
    };

    fetchTopSellers();
  }, []);

  useEffect(() => {
    if (!trackRef.current || products.length === 0) return;

    const totalWidth = trackRef.current.scrollWidth / 2;

    const moveSlide = () => {
      if (!trackRef.current) return;
      offsetRef.current += 0.5;
      if (offsetRef.current > totalWidth) {
        offsetRef.current = 0;
      }
      trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
    };

    const intervalId = setInterval(moveSlide, 20);
    return () => clearInterval(intervalId);
  }, [products]);

  if (products.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="slide-container">
      <h2>Top Sellers</h2>
      <div className="slider">
        <div className="slide-track" ref={trackRef}>
          {products.concat(products).map((product, index) => (
            <Link
              to={`/product/${product.name.replace(/ /g, "-").toLowerCase()}`}
              state={{ product }}
              key={index}
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
