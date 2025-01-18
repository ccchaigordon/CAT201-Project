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
  const [query, setQuery] = useState(""); // State for search query
  const [results, setResults] = useState<ProductInfo[]>([]); // State for search results
  const [message, setMessage] = useState(""); // State for message

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value); // Update query state when input changes
  };

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission

    if (query.trim() === "")
      return; // Ignore if query is empty

    try {
      const response = await fetch(`http://localhost:8083/backend/getProductsByNameBrand?query=${query}`);     

      if (response.ok) {
        const data = await response.json();
        const productData = data.products;

        if (!data.status) {
          setMessage("Product not found");
          // navigate("/admin/enterId", { state: { product: productData } });
        } else {
          setMessage("Product found");
          //console.log(data);
          //jsonContainer.textContent = JSON.stringify(data, null, 2)
          console.log(productData);
          navigate("/searchedproducts", { state: { product: productData } });
        }

        setResults(data); // Update state with search results
      } else {
        setResults([]); // Handle errors or no results
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]); // Handle error
    }
  };

  return (
    <div>
      <form className="search-container" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          id="search-bar"
          placeholder="Search item or brand"
          value={query}
          onChange={handleSearchChange}
        />
        <a href="#" onClick={handleSearchSubmit}>
          <img
            className="search-icon"
            src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
            alt="search"
          />
        </a>
      </form>      
    </div>
  );
}

export default SearchBar;
