import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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

const products: ProductInfo[] = [
  {
    imgSrc: "/products/fender_p2_st_white.png",
    name: "Fender Player II Stratocaster HSS Electric Guitar, RW FB, Polar White",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 4799,
    rating: 5,
  },
  {
    imgSrc: "/products/fender_p2_tl_blue.png",
    name: "Fender Player II Telecaster Electric Guitar, RW FB, Aquatone Blue",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 4599,
    rating: 5,
  },
  {
    imgSrc: "/products/fender_p2_st_blue.png",
    name: "Fender Player II Stratocaster HSS Electric Guitar, Maple FB, Aquatone Blue",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 4799,
    rating: 4,
  },
  {
    imgSrc: "/products/fender_p2_prec_black.png",
    name: "Fender Player II Precision Bass Guitar, Maple FB, Black",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 4599,
    rating: 4,
  },
  {
    imgSrc: "/products/squier_helkit_st_pink.png",
    name: "Fender Squier Limited Edition Hello Kitty Stratocaster Electric Guitar, Maple FB, Pink",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 2799,
    rating: 3,
  },
  {
    imgSrc: "/products/fender_p_st_maple_fb_sunburst.png",
    name: "Fender Ltd Ed Player Stratocaster Electric Guitar, Maple FB, 3-Tone Sunburst",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 3608.1,
    rating: 5,
  },
  {
    imgSrc: "/products/fender_ p_tl_maple_fb_sunburst.png",
    name: "Fender Ltd Ed Player Telecaster Electric Guitar, Roasted Maple FB, Sienna Sunburst",
    category: "Guitar",
    brand: "Fender",
    description:
      'Step into the spotlight and experience iconic Fender® sound and style with the Player II Telecaster® — a stage-ready guitar with contemporary updates to power your performance and inspire your playing. The Player II Telecaster radiates timeless Fender charm, but under the hood, it\'s primed for today\'s players. Everything about the neck is designed for fast and fluid playability, from the Modern "C"-profile with silky satin urethane finish on the back to the comfy 9.5"-radius slab rosewood or maple fingerboard with smooth rolled edges and 22 medium jumbo frets. Player Series Alnico V Single-Coil Tele® pickups offer crystalline highs, musical mids and tight lows that elevate any genre. The 3-way blade switch lets you dial in everything from smooth neck pickup chime to cutting bridge pickup twang and all points in between, while a 6-saddle bridge, block steel saddles and ClassicGear™ tuners ensure precise tuning stability for the flexibility to explore endless sonic possibilities.\n\nPerfect for crafting your own sound, the Player II Telecaster has the looks, tone and feel that only a Fender delivers.',
    price: 3815.1,
    rating: 5,
  },
  {
    imgSrc: "/products/fender_p_jm_pau_ferro_fb_orange.png",
    name: "Fender Player Jazzmaster Electric Guitar, Pau Ferro FB, Capri Orange",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 3923.1,
    rating: 4,
  },
  {
    imgSrc: "/products/fender_custom_tl_amber.png",
    name: "Fender Special Edition Custom Telecaster FMT HH Electric Guitar, Amber",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 4039,
    rating: 5,
  },
  {
    imgSrc: "/products/fender_p_tl_pau_ferro_fb_white.png",
    name: "Fender Player Telecaster Electric Guitar, Pau Ferro FB, Polar White",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 4130.1,
    rating: 5,
  },
  {
    imgSrc: "/products/fender_jp_h2_tl_rw_fb_forest_blue.png",
    name: "Fender Japan Hybrid II Telecaster Electric Guitar, RW FB, Forest Blue",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 4489,
    rating: 5,
  },
  {
    imgSrc: "/products/fender_cw_st_rw_fb_surf_green.png",
    name: "Fender Limited Edition Cory Wong Stratocaster Electric Guitar, RW FB, Surf Green",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 12649,
    rating: 5,
  },
  {
    imgSrc: "/products/fender_fsr_american_ult_st_ebony_fb.png",
    name: "Fender FSR American Ultra HSS Stratocaster Electric Guitar, Ebony FB, Tiger",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 13449.1,
    rating: 5,
  },
  {
    imgSrc: "/products/fender_custom_ml_1968_relic_st_sunburst.png",
    name: "Fender Custom Shop Michael Landau Signature 1968 Relic Stratocaster Electric Guitar, 3-Tone Sunburst",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 26549,
    rating: 5,
  },
  {
    imgSrc: "/products/fender_am_ult2_tl_ebony_fb_solar_flare.png",
    name: "Fender American Ultra II Telecaster Electric Guitar, Ebony FB, Solar Flare",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 12339,
    rating: 5,
  },
  {
    imgSrc: "/products/fender_custom_db_1951_relic_tl_aged_natural.png",
    name: "Fender Custom Shop David Brown Masterbuilt 1951 Loaded CuNiFe Heavy Relic Telecaster, Aged Natural",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 47569,
    rating: 5,
  },
  {
    imgSrc: "/products/fender_acous_p_tl_arctic_white.png",
    name: "Fender Acoustasonic Player Telecaster Electric Guitar, Arctic White",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 6029,
    rating: 4,
  },
  {
    imgSrc: "/products/fender_am_acous_st_natural.png",
    name: "Fender American Acoustasonic Stratocaster with Bag, Natural",
    category: "Guitar",
    brand: "Fender",
    description:
      "The Fender American Ultra series stands as the pinnacle of Fender's instrument innovation, catering to the needs of modern guitarists in search of unparalleled performance, precision, and tone. These contemporary models surpass previous top-of-the-line Fender series, offering cutting-edge features while staying true to the iconic roots that define the brand. Tailored for the modern-minded musician, the American Ultra series represents a harmonious blend of tradition and innovation, delivering an exceptional playing experience for those who demand the best from their instruments.",
    price: 10109,
    rating: 5,
  },
];

const PRODUCTS_PER_PAGE = 16;

function renderStars(rating: number) {
  const totalStars = 5;
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} className="filled-star">
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="unfilled-star">
          ☆
        </span>
      );
    }
  }
  return stars;
}

function Fender() {
  const [currentPage, setCurrentPage] = useState(1);
  const [userClicked, setUserClicked] = useState(false);
  const [sortOrder, setSortOrder] = useState("Price (Low to High)");

  useEffect(() => {
    if (userClicked) {
      const productSection = document.querySelector(".product-section");
      productSection?.scrollIntoView({ behavior: "smooth" });
      setUserClicked(false);
    }
  }, [userClicked]);

  const sortProducts = (products: ProductInfo[]) => {
    return products.sort((a, b) => {
      if (sortOrder === "Price (Low to High)") {
        return a.price - b.price;
      } else if (sortOrder === "Price (High to Low)") {
        return b.price - a.price;
      } else if (sortOrder === "Most Popular") {
        return b.rating - a.rating;
      }
      return 0;
    });
  };

  const sortedProducts = sortProducts([...products]);

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
      <h2 style={{ marginTop: "3rem" }}>Fender</h2>
      <div className="intro-container">
        <img src="/assets/fender.png" alt="Fender Logo" />
        <p>
          Discover the legendary sound of Fender, a hallmark of quality and
          innovation in the music industry since 1946. Renowned for
          revolutionizing the guitar landscape, Fender offers a rich heritage of
          classic models like the Stratocaster and Telecaster. <br />
          <br />
          Each instrument is crafted with precision and designed to inspire,
          making Fender a top choice for musicians around the globe. Explore our
          selection and find the perfect Fender guitar to ignite your musical
          journey.
        </p>
      </div>
      <div className="product-section">
        <div className="filter">
          <p style={{ textAlign: "right" }}>Sort by</p>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort"
          >
            <option value="Price (Low to High)">Price (Low to High)</option>
            <option value="Price (High to Low)">Price (High to Low)</option>
            <option value="Most Popular">Most Popular</option>
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
                    {product.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </h3>
                  <div className="rating">{renderStars(product.rating)}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="pagination">
          <button
            onClick={() => {
              setCurrentPage((page) => Math.max(1, page - 1));
              setUserClicked(true);
            }}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setCurrentPage((page) => Math.min(totalPages, page + 1));
              setUserClicked(true);
            }}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Fender;
