import { useEffect, useState, useRef } from "react";
import NavBar from "../global/NavBar";
import SearchBar from "../global/SearchBar";
import Carousel from "./Carousel";
import AboutUs from "./AboutUs";
import ShopByCategory from "./ShopByCategory";
import TopSellers from "./TopSellers";
import ShopByBrand from "./ShopByBrand";
import Faq from "./Faq";
import Footer from "../global/Footer";
import "../../style/Global.css";
import "../../style/MainPage.css";

function MainPage() {
  const [backgroundSize, setBackgroundSize] = useState("150%");
  const [contentOpacity, setContentOpacity] = useState(0);
  const [showCategory, setShowCategory] = useState(false);
  const [showTopSellers, setShowTopSellers] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  const categoryRef = useRef(null);
  const topSellersRef = useRef(null);
  const brandRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    const backgroundTimeout = setTimeout(() => {
      setBackgroundSize("100%");
    }, 500);

    const contentTimeout = setTimeout(() => {
      setContentOpacity(1);
    }, 2000);

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            switch (entry.target) {
              case categoryRef.current:
                setShowCategory(true);
                break;
              case topSellersRef.current:
                setShowTopSellers(true);
                break;
              case brandRef.current:
                setShowBrand(true);
                break;
              case faqRef.current:
                setShowFAQ(true);
                break;
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (categoryRef.current) observer.observe(categoryRef.current);
    if (topSellersRef.current) observer.observe(topSellersRef.current);
    if (brandRef.current) observer.observe(brandRef.current);
    if (faqRef.current) observer.observe(faqRef.current);

    return () => {
      clearTimeout(backgroundTimeout);
      clearTimeout(contentTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        className="section-1"
        style={{
          backgroundSize: backgroundSize,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          transition: "background-size 1.5s ease-out",
        }}
      >
        <NavBar />
        <div
          style={{
            opacity: contentOpacity,
            transition: "opacity 1s ease-out",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <SearchBar />
          <Carousel />
          <AboutUs />
        </div>
      </div>
      <div className="section-2">
        <div
          ref={categoryRef}
          className={`fade-in ${showCategory ? "visible" : ""}`}
        >
          <ShopByCategory />
        </div>
        <div
          ref={topSellersRef}
          className={`fade-in ${showTopSellers ? "visible" : ""}`}
        >
          <TopSellers />
        </div>
      </div>
      <div className="section-3">
        <div ref={brandRef} className={`fade-in ${showBrand ? "visible" : ""}`}>
          <ShopByBrand />
        </div>
        <h2
          style={{ marginTop: "4rem" }}
          ref={faqRef}
          className={`fade-in ${showFAQ ? "visible" : ""}`}
        >
          Frequently Asked Questions
        </h2>
        <div
          ref={faqRef}
          className={`fade-in ${showFAQ ? "visible" : ""}`}
          style={{ width: "100%", margin: "0 auto 1rem" }}
        >
          <Faq />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
