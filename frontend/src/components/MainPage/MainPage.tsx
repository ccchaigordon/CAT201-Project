import NavBar from "../../global/NavBar";
import SearchBar from "../../global/SearchBar";
import Carousel from "./Carousel";
import AboutUs from "./AboutUs";
import ShopByCategory from "./ShopByCategory";
import TopSellers from "./TopSellers";
import ShopByBrand from "./ShopByBrand";
import Faq from "./Faq";
import Footer from "../../global/Footer";
// import { Link } from "react-router-dom";

function MainPage() {
  return (
    <>
      <div className="section-1" style={{ scrollSnapAlign: "start" }}>
        <NavBar />
        <SearchBar />
        <Carousel />
        <AboutUs />
      </div>
      <div className="section-2" style={{ scrollSnapAlign: "start" }}>
        <ShopByCategory />
        <TopSellers />
      </div>
      <div className="section-3" style={{ scrollSnapAlign: "start" }}>
        <ShopByBrand />
        <Faq />
      </div>
      <div style={{ scrollSnapAlign: "start" }}>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
