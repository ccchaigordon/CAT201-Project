import React, { useState, useEffect } from "react";

// import { Link } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
// import AdminPage from "./AdminPage";
import Modal from "../common/Modal";
import "../../style/AdminPage.css";

 type ProductDetails = {
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
  quantity: number;
  specs: string;
  image: File | null;
}

const brand = ["Fender", "PRS", "Squier", "Marshall", "Nux", "Focusrite"];
const category = ["Guitar", "Bass", "Drums", "Keyboard", "Accessories"];

const EditProduct: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [productID, setProductID] = useState("");
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: "",
    category: "",
    brand: "",
    description: "",
    price: 0,
    rating: 0,
    quantity: 0,
    specs: "",
    image: null,
  });

  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage(""); // Clear error message when modal is closed
  };

  // const handleSubmitProductID = async (id: string) => {
  //   setProductID(id);
  //   try {
  //     // Fetch product data from the server
  //     const response = await fetch(
  //       `http://localhost:8083/backend/backend/getProducts?category=getAllProducts&id=${id}`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch product data");
  //     }
  //     const result = await response.json();

  //     // Check if the entered product ID exists
  //     if (result.exists) {
  //       console.log("Product ID submitted:", productID);
  //       // navigate(`/admin/edit-product/${id}`); // Redirect to EditProduct page
  //     } else {
  //       setErrorMessage("Product ID not found. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching product data:", error);
  //     setErrorMessage(
  //       "An error occurred while fetching product data. Please try again."
  //     );
  //   }
  // };

  const handleSubmitProductID = async (id: string) => {
    setProductID(id);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        image: file,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Product details submitted:", productDetails);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // before fetch data, check if productID is empty
        if (productID === "") {
          return;
        }
        // Fetch data from the servlet
        const response = await fetch(
          "http://localhost:8083/backend/getAllProducts"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products data");
        }
        const fetchedProducts: ProductDetails[] = await response.json();

        if (fetchedProducts.length > 0) {
          setProductDetails(fetchedProducts[0]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <div
      style={{
        textAlign: "left",
        display: "block",
        margin: "0 auto",
        backgroundColor: "#FFFFFF",
        color: "#000000",
      }}
    >
      <AdminNavBar />
      <Modal
        show={showModal}
        prompt="Enter Product ID"
        onClose={handleCloseModal}
        onSubmit={handleSubmitProductID}
        // title= "Enter Product ID"
        // content= "Enter Product ID:"
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div>
        <h2>Edit Product</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "left",
          }}
        >
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productDetails.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={productDetails.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              {category.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="brand">Brand:</label>
            <select
              id="brand"
              name="brand"
              value={productDetails.brand}
              onChange={handleInputChange}
            >
              <option value="">Select Brand</option>
              {brand.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={productDetails.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productDetails.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={productDetails.rating}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={productDetails.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="specs">Specs:</label>
            <textarea
              id="specs"
              name="specs"
              value={productDetails.specs}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="image">Product Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
