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
      <div className="section-1">
        <NavBar />
        <SearchBar />
        <Carousel />
        <AboutUs />
      </div>
      <div className="section-2">
        <ShopByCategory />
        <TopSellers />
      </div>
      <div className="section-3">
        <ShopByBrand />
        <Faq />
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
