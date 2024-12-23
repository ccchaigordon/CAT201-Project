import { useState, useEffect } from "react";
import NavBar from "../../global/NavBar";
import SearchBar from "../../global/SearchBar";
import Footer from "../../global/Footer";

type ProductInfo = {
  imgSrc: string;
  name: string;
  price: string;
  rating: number;
};

const products: ProductInfo[] = [
  {
    imgSrc: "./src/assets/products/fender_p2_st_white.png",
    name: "Fender Player II Stratocaster HSS Electric Guitar, RW FB, Polar White",
    price: "RM 4799.00",
    rating: 5,
  },
  {
    imgSrc: "./src/assets/products/fender_p2_tl_blue.png",
    name: "Fender Player II Telecaster Electric Guitar, RW FB, Aquatone Blue",
    price: "RM 4599.00",
    rating: 5,
  },
  {
    imgSrc: "./src/assets/products/fender_p2_st_blue.png",
    name: "Fender Player II Stratocaster HSS Electric Guitar, Maple FB, Aquatone Blue",
    price: "RM 4799.00",
    rating: 4,
  },
  {
    imgSrc: "./src/assets/products/fender_p2_prec_black.png",
    name: "Fender Player II Precision Bass Guitar, Maple FB, Black",
    price: "RM 4599.00",
    rating: 4,
  },
  {
    imgSrc: "./src/assets/products/squier_helkit_st_pink.png",
    name: "Fender Squier Limited Edition Hello Kitty Stratocaster Electric Guitar, Maple FB, Pink",
    price: "RM 2799.00",
    rating: 4,
  },
  {
    imgSrc: "./src/assets/products/squier_debut_prec_red.png",
    name: "Squier Debut Series Precision Bass Guitar, Laurel FB, Dakota Red",
    price: "RM 799.00",
    rating: 4,
  },
  {
    imgSrc: "./src/assets/products/focusrite_solo_3rd.png",
    name: "Focusrite Scarlett Solo Studio Pack (3rd Generation)",
    price: "RM 876.75",
    rating: 4,
  },
  {
    imgSrc: "./src/assets/products/focusrite_solo_3rd.png",
    name: "Focusrite Scarlett Solo Studio Pack (3rd Generation)",
    price: "RM 876.75",
    rating: 4,
  },
  {
    imgSrc: "./src/assets/products/focusrite_solo_3rd.png",
    name: "Focusrite Scarlett Solo Studio Pack (3rd Generation)",
    price: "RM 876.75",
    rating: 4,
  },
  {
    imgSrc: "./src/assets/products/focusrite_solo_3rd.png",
    name: "Focusrite Scarlett Solo Studio Pack (3rd Generation)",
    price: "RM 876.75",
    rating: 4,
  },
  {
    imgSrc: "./src/assets/products/focusrite_solo_3rd.png",
    name: "Focusrite Scarlett Solo Studio Pack (3rd Generation)",
    price: "RM 876.75",
    rating: 4,
  },
  {
    imgSrc: "./src/assets/products/focusrite_solo_3rd.png",
    name: "Focusrite Scarlett Solo Studio Pack (3rd Generation)",
    price: "RM 876.75",
    rating: 4,
  },
  {
    imgSrc: "./src/assets/products/focusrite_solo_3rd.png",
    name: "Focusrite Scarlett Solo Studio Pack (3rd Generation)",
    price: "RM 876.75",
    rating: 4,
  },
  {
    imgSrc: "./src/assets/products/focusrite_solo_3rd.png",
    name: "Focusrite Scarlett Solo Studio Pack (3rd Generation)",
    price: "RM 876.75",
    rating: 4,
  },
  {
    imgSrc: "./src/assets/products/focusrite_solo_3rd.png",
    name: "Focusrite Scarlett Solo Studio Pack (3rd Generation)",
    price: "RM 876.75",
    rating: 4,
  },
  {
    imgSrc: "./src/assets/products/focusrite_solo_3rd.png",
    name: "Focusrite Scarlett Solo Studio Pack (3rd Generation)",
    price: "RM 876.75",
    rating: 4,
  },
  {
    imgSrc: "./src/assets/products/focusrite_solo_3rd.png",
    name: "Focusrite Scarlett Solo Studio Pack (3rd Generation)",
    price: "RM 876.75",
    rating: 4,
  },
];

const PRODUCTS_PER_PAGE = 16;

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
      const priceA = parseFloat(a.price.replace("RM ", "").replace(",", ""));
      const priceB = parseFloat(b.price.replace("RM ", "").replace(",", ""));
      return sortOrder === "Price (Low to High)"
        ? priceA - priceB
        : priceB - priceA;
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
        <img src="./src/assets/fender.png" alt="Fender Logo" />
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
          </select>
        </div>
        <div className="product-grid">
          {currentPageProducts.map((product, index) => (
            <div className="product-section-card" key={index}>
              <img
                src={product.imgSrc}
                alt={product.name}
                style={{ width: "100%", height: "auto" }}
              />
              <div className="product-grid-info">
                <h2>{product.name}</h2>
                <h3>{product.price}</h3>
                <div className="rating">{"★".repeat(product.rating)}</div>
              </div>
            </div>
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
