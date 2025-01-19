import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useId } from "react";
import AdminNavBar from "./AdminNavBar";
import SuccessMessageModal from "./SuccessMessageModal";
import "../../style/AdminPage.css";
import "../../style/EditProduct.css";
import "../../style/SuccessMessageModal.css";

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

const EditProduct: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product as ProductDetails;
  const [message, setMessage] = useState<string>(""); // Add state for message
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // For showing success message after save
  const [productDetails, setProductDetails] = useState<ProductDetails>(product);
  const [editableFields, setEditableFields] = useState<{
    [key: string]: boolean;
  }>({});
  const [warningMessage, setWarningMessage] = useState<{
    [key: string]: string | null;
  }>({
    price: null,
    rating: null,
  });
  const nonEditableFields: (keyof ProductDetails)[] = ["id", "category"];
  const navigate = useNavigate();

  console.log("Product Data:", product);
  console.log("Location state:", location.state);

  if (product === null || product === undefined)
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

  // const handleEditClick = (field: keyof ProductDetails) => {
  //   setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }));
  // };

  const handleSaveChangesClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8083/backend/updateProducts?category=${product.category}&action=update`,
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
          // setMessage("Product updated successfully");
          setSuccessMessage(
            `Product with ID ${productDetails.id} successfully updated.`
          );
        } else {
          console.error("Failed to update product");
          // setMessage("Failed to update product. Please try again.");
          setSuccessMessage("Failed to update product. Please try again.");
        }
      } else {
        console.error("Failed to update product oho");
        setMessage("Failed to update product.");
      }
    } catch (error) {
      console.error("Unable to connect to server", error);
      setMessage(
        "Network Error: Unable to reach the server. Please try again."
      );
    }
  };

  // Check if productDetails is null
  if (!product) {
    return <p style={{ color: "red" }}>Product not found</p>;
  }

  const handleCloseModal = () => {
    setSuccessMessage(null);
    navigate("/admin");
  };

  // Example condition to disable fields
  const isFieldDisabled = (field: keyof ProductDetails) => {
    // Disable "brand" and "category" fields, but keep "imgSrc", "name", "description", and "specs" editable
    const nonEditableFields: (keyof ProductDetails)[] = ["id", "category"];
    return nonEditableFields.includes(field);
  };

  const brandOptions = [
    "Fender",
    "Focusrite",
    "Marshall",
    "Nux",
    "Prs",
    "Squier",
  ];

  // Display the product details
  return (
    <>
      <div>
        <AdminNavBar />
      </div>
      <div className="content">
        <div className="form-container" style={{ backgroundColor: "white" }}>
          <form>
            <h1 style={{ color: "black", textAlign: "center" }}>
              Edit Product
            </h1>

            {Object.keys(productDetails).map((field) => {
              const id = useId();
              const typedField = field as keyof ProductDetails; // Explicit casting here
              return (
                <div
                  key={field}
                  className="form-field"
                  style={{
                    color: "black",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                    gap: "30px",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <label htmlFor={id} className="form-label">
                    {fieldDisplayNames[typedField]}:
                  </label>
                  {field === "brand" ? (
                    <select
                      id={id}
                      value={productDetails[typedField]}
                      onChange={(e) =>
                        handleInputChange(typedField, e.target.value)
                      }
                      className="custom-select"
                      disabled={isFieldDisabled(typedField)}
                    >
                      {brandOptions.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  ) : field === "price" ? (
                    <>
                      <input
                        id={field}
                        type="number"
                        value={productDetails[typedField]}
                        onChange={(e) =>
                          handleInputChange(typedField, e.target.value)
                        }
                        className="custom-input"
                        disabled={isFieldDisabled(typedField)}
                        step={0.01}
                        min="0.00"
                      />
                    </>
                  ) : field === "rating" ? (
                    <>
                      <input
                        id={field}
                        type="number"
                        value={productDetails[typedField]}
                        onChange={(e) =>
                          handleInputChange(typedField, e.target.value)
                        }
                        className="custom-input"
                        disabled={isFieldDisabled(typedField)}
                        step={1}
                        min="1"
                        max="5"
                      />
                      {warningMessage.rating && (
                        <p style={{ color: "red" }}>{warningMessage.rating}</p>
                      )}
                    </>
                  ) : field === "quantity" ? (
                    <>
                      <input
                        id={field}
                        type="number"
                        value={productDetails[typedField]}
                        onChange={(e) =>
                          handleInputChange(typedField, e.target.value)
                        }
                        className="custom-input"
                        disabled={isFieldDisabled(typedField)}
                        step={1}
                        min="0"
                      />
                    </>
                  ) : (
                    <input
                      id={id}
                      type="text"
                      value={productDetails[typedField]}
                      onChange={(e) =>
                        handleInputChange(typedField, e.target.value)
                      }
                      className="custom-input"
                      disabled={isFieldDisabled(typedField)}
                    />
                  )}
                  {/* {!nonEditableFields.includes(typedField) && (
                  <button
                    type="button"
                    onClick={() => handleEditClick(typedField)}
                  >
                    {editableFields[typedField] ? "Lock" : "Edit"}
                  </button>
                )} */}
                </div>
              );
            })}
            <button type="submit" onClick={handleSaveChangesClick}>
              Save Changes
            </button>
            {/* {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>} */}
          </form>
          {successMessage && (
            <SuccessMessageModal
              message={successMessage}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default EditProduct;
