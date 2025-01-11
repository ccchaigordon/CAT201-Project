import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
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

const AddProduct: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product as ProductDetails;
  //   const [category, setCategory] = useState<string>("");
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    id: "",
    name: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    rating: "",
    quantity: "",
    imgSrc: "",
    specs: "",
  });
  //   const [editableFields, setEditableFields] = useState<{
  //     [key: string]: boolean;
  //   }>({});
  //   const nonEditableFields: (keyof ProductDetails)[] = ["id", "category"];
  //   const navigate = useNavigate();
  // console.log("Product Data:", product)

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

  const brandOptions = [
    "Fender",
    "Focusrite",
    "Marshall",
    "Nux",
    "Prs",
    "Squier",
  ];
  const categoryOptions = [
    "Accessories",
    "Basses",
    "Drums",
    "Guitars",
    "Keyboards",
  ];

  const [warningMessage, setWarningMessage] = useState<{
    [key: string]: string | null;
  }>({
    price: null,
    rating: null,
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (field: keyof ProductDetails, value: string) => {
    if (field === "rating") {
      const ratingValue = parseFloat(value);
      if (ratingValue < 1 || ratingValue > 5) {
        setWarningMessage((prev) => ({
          ...prev,
          rating: "Rating must be between 1 and 5.",
          //   price: "Price must be positive value."
        }));
        setProductDetails((prevDetails) => ({
          ...prevDetails,
          [field]: "", // Clear the input field
        }));
        return;
      } else {
        setWarningMessage((prev) => ({ ...prev, rating: null })); // Clear the warning message
      }
    }

    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value, // Explicitly update the field
    }));
  };
  // const handleEditClick = (field: string) => {
  //   setEditableFields((prev) => ({ ...prev, [field]: true }));
  // };

  //   const handleEditClick = (field: keyof ProductDetails) => {
  //     setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }));
  //   };

  const handleSaveChangesClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8083/backend/updateProducts?category=${product.category}&action=add`,
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
        setSuccessMessage(
          `New product with ID ${productDetails.id} successfully added.`
        );
      } else {
        setWarningMessage((prev) => ({
          ...prev,
          form: "Failed to add product. Please try again.",
        }));
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setWarningMessage((prev) => ({
        ...prev,
        form: "Network error. Please try again.",
      }));
      //     const data = await response.json();

      //     if (data.status) {
      //       console.log(data.status);
      //       console.log("Product updated successfully");
      //       //navigate("/profile");
      //     } else {
      //       console.error("Failed to update product");
      //     }
      //   } else {
      //     console.error("Failed to update product oho");
      //   }
      // } catch (error) {
      //   console.error("Unable to connect to server", error);
    }
  };

  const handleClosePopup = () => {
    setSuccessMessage(null);
    navigate("/profile");
  };

  //   // Check if productDetails is null
  //   if (!product) {
  //     return (
  //       <p style={{ color: "white" }}>
  //         No product data found. Please go back and try again.
  //       </p>
  //     );
  //   }

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
      <div className="form-container">
        <form>
          <h1 style={{ color: "black" , textAlign: "center" }}>Add Product</h1>

          {Object.keys(productDetails).map((field) => {
            const typedField = field as keyof ProductDetails;
            return (
              <div
                key={field}
                className="form-field"
                style={{ color: "black" }}
              >
                <label htmlFor={field}>
                  {fieldDisplayNames[typedField]}
                  <span style={{ color: "red" }}> *</span>
                </label>
                {field === "brand" ? (
                  <select
                    className="custom-select"
                    id={field}
                    value={productDetails[typedField]}
                    onChange={(e) =>
                      handleInputChange(typedField, e.target.value)
                    }
                    required
                  >
                    <option value="" disabled>
                      Select a brand
                    </option>
                    {brandOptions.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                ) : field === "category" ? (
                  <select
                    id={field}
                    value={productDetails[typedField]}
                    onChange={(e) =>
                      handleInputChange(typedField, e.target.value)
                    }
                    required
                    className="custom-select"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                ) : field === "price" ? (
                  <>
                    <input
                      id={field}
                      type="number"
                      value={productDetails[typedField] || ""}
                      onChange={(e) =>
                        handleInputChange(typedField, e.target.value)
                      }
                      required
                      className="custom-input"
                      step="0.01" // Allow decimal values
                      min="0.00" // Minimum value
                    />
                    {/* {warningMessage.price && (
                      <p style={{ color: "red" }}>{warningMessage.price}</p>
                    )} */}
                  </>
                ) : field === "rating" ? (
                  <>
                    <input
                      id={field}
                      type="number"
                      value={productDetails[typedField] || ""}
                      onChange={(e) =>
                        handleInputChange(typedField, e.target.value)
                      }
                      required
                      className="custom-input"
                      step="1"
                      min="1"
                      max="5"
                    />
                    {warningMessage.rating && (
                      <p style={{ color: "red" }}>{warningMessage.rating}</p>
                    )}
                  </>
                ) : field === "quantity" ? (
                  <input
                    id={field}
                    type="number"
                    value={productDetails[typedField] || ""}
                    onChange={(e) =>
                      handleInputChange(typedField, e.target.value)
                    }
                    required
                    className="custom-input"
                    step={1}
                    min="0"
                  />
                ) : (
                  <input
                    id={field}
                    type="text"
                    value={productDetails[typedField] || ""}
                    onChange={(e) =>
                      handleInputChange(typedField, e.target.value)
                    }
                    required
                  />
                )}
              </div>
            );
          })}
          <button type="submit" onClick={handleSaveChangesClick}>
            Save Changes
          </button>
        </form>
        {successMessage && (
          <div className="popup">
            <div className="popup-content">
              <p>{successMessage}</p>
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddProduct;
