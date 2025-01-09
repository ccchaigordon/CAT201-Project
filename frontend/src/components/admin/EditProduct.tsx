import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import "../../style/AdminPage.css";

interface ProductDetails {
  name: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
  quantity: number;
  specs: string;
  image: File | null;
}

const brand = ["Fender", "PRS", "Squier", "Marshall", "Nux", "Focusrite"];

const EditProduct: React.FC = () => {
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: "",
    brand: "",
    description: "",
    price: 0,
    rating: 0,
    quantity: 0,
    specs: "",
    image: null,
  });

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
      <div>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "left" }}>
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
