import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type ProductInfo = {
  id: string;
  imgSrc: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
  quantity: number;
  specs: string;
};

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault(); // Correct event type used here
    if (query.trim() === "") {
      console.log("Search query is empty.");
      return; // Return early if the query is empty
    }

    try {
      const response = await fetch(
        `http://localhost:8083/backend/getProductsByNameBrand?query=${query}`
      );
      if (response.ok) {
        const data = await response.json();
        const productData: ProductInfo[] = data.products;
        navigate("/searchedproducts", { state: { products: productData } });
      } else {
        console.error("No results found or error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <form className="search-container" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        id="search-bar"
        placeholder="Search item or brand"
        value={query}
        onChange={handleSearchChange}
        style={{ color: "#000000" }}
      />
      <div>
        <img
          className="search-icon"
          src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
          alt="Search"
        />
      </div>
    </form>
  );
}

export default SearchBar;
