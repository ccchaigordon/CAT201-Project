import NavBar from "../../global/NavBar";
import SearchBar from "../../global/SearchBar";
import Footer from "../../global/Footer";

function ArrivalPage() {
  return (
    <>
      <div className="section-1">
        <NavBar />
        <SearchBar />
        <h2>New Arrivals</h2>
      </div>
      <Footer />
    </>
  );
}

export default ArrivalPage;
