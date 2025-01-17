import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import NavBar from "../global/NavBar";
import SearchBar from "../global/SearchBar";
import Footer from "../global/Footer";
import "../../style/Deals.css";

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

const productsData: ProductInfo[] = [
  {
    id: "FNDG-001",
    imgSrc: "/products/fender_p2_st_white.png",
    name: "Fender Player II Stratocaster HSS Electric Guitar, RW FB, Polar White",
    category: "Guitar",
    brand: "Fender",
    description:
      "Step into the spotlight and experience iconic Fender® sound and style with the Player II Stratocaster® HSS — a stage-ready guitar with contemporary updates to power your performance and inspire your playing. The Player II Stratocaster HSS radiates timeless Fender charm, but under the hood, it's primed for today's players.",
    price: 4799,
    rating: 5,
    quantity: 20,
    specs:
      "Body Shape: Stratocaster®;Body Material: Alder;Body Finish: Gloss Polyester;Neck Profile: Modern 'C';Fretboard Material: Slab Rosewood;Pickups: Player Series Alnico 2 Humbucker (Bridge), Player Series Alnico 5 Single-Coil (Middle, Neck);",
  },
  {
    id: "FNDG-002",
    imgSrc: "/products/fender_p2_tl_blue.png",
    name: "Fender Player II Telecaster Electric Guitar, RW FB, Aquatone Blue",
    category: "Guitar",
    brand: "Fender",
    description:
      "Step into the spotlight and experience iconic Fender® sound and style with the Player II Telecaster® — a stage-ready guitar with contemporary updates to power your performance and inspire your playing.",
    price: 4599,
    rating: 5,
    quantity: 25,
    specs:
      "Body Shape: Telecaster®;Body Material: Alder;Body Finish: Gloss Polyester;Neck Profile: Modern 'C';Pickups: Player Series Alnico 5 Tele® Single-Coil (Bridge, Neck);",
  },
  {
    id: "FNDG-018",
    imgSrc: "/products/fender_am_acous_st_natural.png",
    name: "Fender American Acoustasonic Stratocaster with Bag, Natural",
    category: "Guitar",
    brand: "Fender",
    description:
      "The American Acoustasonic™ Stratocaster® continues to embody the spirit of purposeful innovation that drives Fender guitars. The power of the Fender and Fishman®-designed Acoustic Engine is sure to deliver true inspiration.",
    price: 10109,
    rating: 5,
    quantity: 3,
    specs:
      "Body Shape: Modified Stratocaster®;Body Material: Solid A Sitka Spruce (Top), Mahogany (Back);Pickups: 3-pickup configuration: Under-Saddle Piezo/Internal Body Sensor/N4 Magnetic;",
  },
  {
    id: "DWDR-001",
    imgSrc: "/products/dw_collectors_maple_shell_pack.webp",
    name: "DW Collector's Series 5-Piece Maple Drum Shell Pack, Natural",
    category: "Drums",
    brand: "DW",
    description:
      "The DW Collector's Series Maple Drum Shell Pack delivers superior tone and craftsmanship, featuring HVLT shells for a punchy, dynamic sound.",
    price: 24999,
    rating: 5,
    quantity: 2,
    specs:
      "Included Accessories: Floor Tom Legs (x3), DW Drum Key;Dimensions: 22'' Kick, 10'' and 12'' Rack Toms, 16'' Floor Tom;Weight: 35 kg;",
  },
  {
    id: "FNDG-003",
    imgSrc: "/products/fender_p2_st_blue.png",
    name: "Fender Player II Stratocaster HSS Electric Guitar, Maple FB, Aquatone Blue",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Player II Stratocaster HSS radiates timeless Fender charm, but under the hood, it's primed for today's players.",
    price: 4799,
    rating: 4,
    quantity: 12,
    specs:
      "Body Shape: Stratocaster®;Body Material: Alder;Pickups: Player Series Alnico 2 Humbucker (Bridge), Player Series Alnico 5 Single-Coil (Middle, Neck);",
  },
  {
    id: "FNDG-019",
    imgSrc: "/products/fender_2024_collection_jp_h2_st_larimar.png",
    name: "Fender 2024 Limited Collection, Made in Japan Hybrid II Stratocaster®, Larimar",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Hybrid II Stratocaster® features a newly designed Hybrid II Custom Voiced Single Coil pickup in a well-established alder body and a two-point tremolo system with a vintage-style saddle.",
    price: 4264.81,
    rating: 5,
    quantity: 0,
    specs:
      "Body Material: Alder;Pickups: Hybrid II Custom Voiced Single Coil Stratocaster® (Bridge, Middle, Neck);Bridge: 2-Point Synchronized Tremolo;",
  },
];

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

function ArrivalPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("Latest");
  const productSectionRef = useRef<HTMLDivElement>(null);

  const sortedProducts = useMemo(() => {
    const sorted = [...productsData];
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
  }, [sortOrder]);

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
      <div className="section-1">
        <NavBar />
        <SearchBar />
        <h2>New Arrivals</h2>
        <div className="arrival-banner">
        <img src="\public\assets\ArrivalPage.webp" alt="Arrival" className="banner-image" />
        <div className="banner-info">
          <h3 className="new-arrivals">Discover Our New Arrivals!</h3>
          <p>Fresh off the shelves, our latest collection of musical instruments and accessories is here! Explore cutting-edge guitars, keyboards, drums, and more—designed to elevate your performance and ignite your creativity. Don’t miss your chance to own the newest releases from top brands. Shop now and be the first to experience the future of music!</p>
        </div>
        </div>
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
          {currentPageProducts.map((product) => (
            <Link
              to={`/product/${product.name.replace(/ /g, "-").toLowerCase()}`}
              state={{ product }}
              key={product.id}
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
                    {product.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || "No price available"}
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

export default ArrivalPage;
