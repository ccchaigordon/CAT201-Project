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
        <h2 style={{ marginTop: "0.25rem" }}>Frequently Asked Questions</h2>
        <Faq />
      </div>
      <div style={{ scrollSnapAlign: "start" }}>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
