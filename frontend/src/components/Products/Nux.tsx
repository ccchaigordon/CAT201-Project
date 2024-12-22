import NavBar from "../../global/NavBar";
import SearchBar from "../../global/SearchBar";
import Footer from "../../global/Footer";

function Nux() {
  return (
    <>
      <div className="section-1">
        <NavBar />
        <SearchBar />
        <h2>NUX</h2>
      </div>
      <Footer />
    </>
  );
}

export default Nux;
