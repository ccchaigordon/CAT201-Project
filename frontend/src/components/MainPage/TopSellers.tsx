import { useEffect, useRef } from "react";

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
];

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
                  <p>{product.price}</p>
                  <div className="rating">{"★".repeat(product.rating)}</div>
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
