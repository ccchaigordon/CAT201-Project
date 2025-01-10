import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useLocation } from "react-router-dom";
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
  image: string;
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
  const [productDetails, setProductDetails] = useState<ProductDetails>(product);
  const [editableFields, setEditableFields] = useState<{
    [key: string]: boolean;
  }>({});
  const nonEditableFields: (keyof ProductDetails)[] = ["id"];
  // console.log("Product Data:", product)

  const handleInputChange = (field: string, value: string) => {
    if (productDetails) {
      setProductDetails({ ...productDetails, [field]: value });
    }
  };

  // const handleEditClick = (field: string) => {
  //   setEditableFields((prev) => ({ ...prev, [field]: true }));
  // };

    const handleEditClick = (field: keyof ProductDetails) => {
    setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Check if productDetails is null
  if (!product) {
    return (
      <p style={{ color: "white" }}>
        No product data found. Please go back and try again.
      </p>
    );
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
            return (
              <div key={field} className="form-field" style={{ color: "black" }}>
                <label htmlFor={id} className="form-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <div className="input-container">
              
                </div>
                <input
                  id={id}
                  type="text"
                  value={productDetails[field as keyof ProductDetails]}
                  onChange={(e) =>
                    handleInputChange(
                      field as keyof ProductDetails,
                      e.target.value
                    )
                  }
                  disabled={
                    !editableFields[field] ||
                    nonEditableFields.includes(field as keyof ProductDetails)
                  }
                />
                {!nonEditableFields.includes(field as keyof ProductDetails) && (
                  <button
                    type="button"
                    onClick={() =>
                      handleEditClick(field as keyof ProductDetails)
                    }
                  >
                    {editableFields[field] ? "Lock" : "Edit"}
                  </button>
                )}
              </div>
            );
          })}
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
