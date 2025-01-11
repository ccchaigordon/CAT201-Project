import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import { useId } from "react";
import AdminNavBar from "./AdminNavBar";
// import Form from "./Form";
import "../../style/AdminPage.css";
import "../../style/EditProduct.css";

interface ProductDetails {
  id: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  price: string;
  rating: string;
  quantity: string;
  imgSrc: string;
  specs: string;
}

// export default function Form(){
//   const productInputId = useId();

//   return(
//     <>
//     <label>
//       Product ID:
//       <input type="text" id={productInputId} />
//     </label>
//     </>
//   );
// }

// const editableFields = {
//   id: false,
//   category: false,
// };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (productID.trim() === "") {
//       setShowWarning(true);
//       return;
//     }
//     setShowWarning(false);
//     onSubmit(productID);
//     setProductID("");
//     onClose();
//   };

const EditProduct: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product as ProductDetails;
  const [message, setMessage] = useState<string>(""); // Add state for message
  const [successMessage, setSuccessMessage] = useState(""); // For showing success message after save
  const [productDetails, setProductDetails] = useState<ProductDetails>(product);
  const [editableFields, setEditableFields] = useState<{
    [key: string]: boolean;
  }>({});
  const nonEditableFields: (keyof ProductDetails)[] = ["id", "category"];
  const navigate = useNavigate();
  console.log("Product Data:", product)
  console.log("Location state:", location.state);
  if(product === null || product === undefined)
    console.error("Product data is null or undefined");
  
  const fieldDisplayNames: { [key in keyof ProductDetails]: string } = {
    id: "Product ID",
    name: "Name",
    category: "Category",
    brand: "Brand",
    description: "Description",
    price: "Price",
    rating: "Rating",
    quantity: "Quantity",
    imgSrc: "Image Source",
    specs: "Specifications",
  };

  const handleInputChange = (field: keyof ProductDetails, value: string) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value, // Explicitly update the field
    }));
  };

  // const handleEditClick = (field: string) => {
  //   setEditableFields((prev) => ({ ...prev, [field]: true }));
  // };

  const handleEditClick = (field: keyof ProductDetails) => {
    setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveChangesClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       const response = await fetch(
      `http://localhost:8083/backend/updateProducts?category=${product.category}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },      
          body: JSON.stringify({
            id: productDetails.id,
            name: productDetails.name,
            category: productDetails.category,
            brand: productDetails.brand,
            description: productDetails.description,
            price: productDetails.price,
            rating: productDetails.rating,
            quantity: productDetails.quantity,
            imgSrc: productDetails.imgSrc,
            specs: productDetails.specs,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();

        if (data.status) {
          console.log(data.status);
          console.log("Product updated successfully");
          setMessage("Product updated successfully");
        } else {
          console.error("Failed to update product");
          setMessage("Failed to update product. Please try again.");
        }
      } else {
      console.error("Failed to update product oho");
      setMessage("Failed to update product.");
      }
    } catch (error) {
      console.error("Unable to connect to server", error);
      setMessage("Network Error: Unable to reach the server. Please try again.");
    }
  };

  // Check if productDetails is null
  if (!product) {
    return <p style={{ color: "red" }}>Product not found</p>;
  }

  // Display the product details
  return (
    <>
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
      </div>
      {/* <div>
        <h1 style={{ color: "white" }}>Product id: {product.id}</h1>
        <p style={{ color: "white" }}>Product name: {product.name}</p>
        <p style={{ color: "white" }}>Product brand: {product.brand}</p>
        <p style={{ color: "white" }}>Product category: {product.category}</p>
        <p style={{ color: "white" }}>
          Product description: {product.description}
        </p>
        <p style={{ color: "white" }}>Product price: {product.price}</p>
        <p style={{ color: "white" }}>Product rating: {product.rating}</p>
        <p style={{ color: "white" }}>Product quantity: {product.quantity}</p>
        <p style={{ color: "white" }}>Product image: {product.image}</p>
        <p style={{ color: "white" }}>Product specs: {product.specs}</p>
      </div> */}
      {/* <Form /> */}

      <div className="form-container">
        <form>
        {Object.keys(productDetails).map((field) => {
          const id = useId();
          const typedField = field as keyof ProductDetails; // Explicit casting here
          return (
            <div key={field} className="form-field" style={{ color: "black" }}>
              <label htmlFor={id} className="form-label">
                {fieldDisplayNames[typedField]}:
              </label>
              <input
                id={id}
                type="text"
                value={productDetails[typedField]} // Use typedField here
                onChange={(e) => handleInputChange(typedField, e.target.value)} // Pass as keyof ProductDetails
                disabled={
                  !editableFields[typedField] || nonEditableFields.includes(typedField)
                }
              />
              {!nonEditableFields.includes(typedField) && (
                <button
                  type="button"
                  onClick={() => handleEditClick(typedField)}
                >
                  {editableFields[typedField] ? "Lock" : "Edit"}
                </button>
              )}
            </div>
          );
        })}
          <button type="submit" onClick={handleSaveChangesClick}>
            Save Changes
          </button>
          {/* {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>} */}
        </form>
      </div>
    </>
  );
};

export default EditProduct;
