import { useEffect, useRef } from "react";

type ProductInfo = {
  imgSrc: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
};

const products: ProductInfo[] = [
  {
    imgSrc: "./src/assets/products/fender_p2_st_white.png",
    name: "Fender Player II Stratocaster HSS Electric Guitar, RW FB, Polar White",
    category: "Guitar",
    brand: "Fender",
    price: 4799,
    rating: 5,
  },
  {
    imgSrc: "./src/assets/products/fender_p2_tl_blue.png",
    name: "Fender Player II Telecaster Electric Guitar, RW FB, Aquatone Blue",
    category: "Guitar",
    brand: "Fender",
    price: 4599,
    rating: 5,
  },
  {
    imgSrc: "./src/assets/products/fender_p2_st_blue.png",
    name: "Fender Player II Stratocaster HSS Electric Guitar, Maple FB, Aquatone Blue",
    category: "Guitar",
    brand: "Fender",
    price: 4799,
    rating: 5,
  },
  {
    imgSrc: "./src/assets/products/fender_p2_prec_black.png",
    name: "Fender Player II Precision Bass Guitar, Maple FB, Black",
    category: "Bass",
    brand: "Fender",
    price: 4599,
    rating: 5,
  },
  {
    imgSrc: "./src/assets/products/squier_helkit_st_pink.png",
    name: "Fender Squier Limited Edition Hello Kitty Stratocaster Electric Guitar, Maple FB, Pink",
    category: "Guitar",
    brand: "Fender",
    price: 2799,
    rating: 3,
  },
  {
    imgSrc: "./src/assets/products/squier_debut_prec_red.png",
    name: "Squier Debut Series Precision Bass Guitar, Laurel FB, Dakota Red",
    category: "Bass",
    brand: "Squier",
    price: 799,
    rating: 4,
  },
  {
    imgSrc: "./src/assets/products/focusrite_solo_3rd.png",
    name: "Focusrite Scarlett Solo Studio Pack (3rd Generation)",
    category: "Accessory",
    brand: "Focusrite",
    price: 876.75,
    rating: 5,
  },
];

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

function TopSellers() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const totalWidth = trackRef.current ? trackRef.current.scrollWidth / 2 : 0;

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
  }, []);

  return (
    <div className="slide-container">
      <h2>Top Sellers</h2>
      <div className="slider">
        <div className="slide-track" ref={trackRef}>
          {products.concat(products).map((product, index) => (
            <div className="slide" key={index}>
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopSellers;
