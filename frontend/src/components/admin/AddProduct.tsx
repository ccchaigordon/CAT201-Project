import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import SuccessMessageModal from "./SuccessMessageModal";
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
  //const location = useLocation();
  //const product = location.state?.product as ProductDetails;
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
  const categoryOptions = ["Accessories", "Bass", "Drum", "Guitar", "Keyboard"];

  const [warningMessage, setWarningMessage] = useState<{
    [key: string]: string | null;
  }>({
    price: null,
    rating: null,
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkProductIdExists = async (productId: string): Promise<boolean> => {
    try {
      const response = await fetch(
        "http://localhost:8083/backend/checkProductId",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify({
            id: productId,
          }),
        }
      );
      const data = await response.json();
      return data.status; // true if ProductID exists, false otherwise
    } catch (error) {
      console.error("Error checking ProductID:", error);
      return false; // Default to false on error
    }
  };

  const handleInputChange = async (
    field: keyof ProductDetails,
    value: string
  ) => {
    if (field === "id") {
      const exists = await checkProductIdExists(value);
      if (exists) {
        setWarningMessage((prev) => ({
          ...prev,
          id: "ProductID already exists. Please use a unique ID.",
        }));
        setProductDetails((prevDetails) => ({
          ...prevDetails,
          [field]: "", // Clear the input field
        }));
        return;
      } else {
        setWarningMessage((prev) => ({ ...prev, id: null })); // Clear warning
      }
    }

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

  const handleSaveChangesClick = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log("Product Details:", productDetails);
    console.log("Sending payload:", JSON.stringify(productDetails));

    try {
      const response = await fetch(
        `http://localhost:8083/backend/updateProducts?category=${productDetails.category}&action=add`,
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
          console.log("Product INSERTED successfully");
          // setMessage("Product updated successfully");
          setSuccessMessage(
            `Product with ID ${productDetails.id} successfully inserted.`
          );
        } else {
          console.error("Failed to insert product");
          // setMessage("Failed to update product. Please try again.");
          setSuccessMessage("Failed to insert product. Please try again.");
        }
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
    }
  };

  const handleClosePopup = () => {
    setSuccessMessage(null);
    navigate("/admin");
  };

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
      <div className="content">
        <div className="form-container">
          <form>
            <h1 style={{ color: "black", textAlign: "center" }}>Add Product</h1>

          {Object.keys(productDetails).map((field) => {
            const typedField = field as keyof ProductDetails;
            return (
              <div
                key={field}
                className="form-field"
                style={{ color: "black" }}
              >
                <label htmlFor={field} style={{ marginBottom: 5 }}>
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
                    style={{ maxWidth: "66.7%", marginBottom: 5, marginLeft: "22%"}}
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
                    style={{ maxWidth: "66.7%", marginBottom: 5, marginLeft: "22%"}}
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
                      style={{ marginBottom: 5 , marginLeft: "22%"}}
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
                        style={{ marginBottom: 5 , marginLeft: "22%"}}
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
                      style={{ marginBottom: 10 , marginLeft: "22%"}}
                    />
                  ) : field === "imgSrc" ? (
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
                      style={{ marginBottom: 10 , marginLeft: "22%"}}
                    />
                  ) : field === "id" ? (
                    <>
                      <input
                        id={field}
                        type="text"
                        value={productDetails[typedField] || ""}
                        onChange={(e) =>
                          handleInputChange(typedField, e.target.value)
                        }
                        required
                        className="custom-input"
                        style={{ marginBottom: 5 , marginLeft: "22%"}}
                      />
                      {warningMessage.id && (
                        <p style={{ color: "red" }}>{warningMessage.id}</p>
                      )}
                    </>
                  ) : (
                    <input
                      id={field}
                      type="text"
                      value={productDetails[typedField] || ""}
                      onChange={(e) =>
                        handleInputChange(typedField, e.target.value)
                      }
                      required
                      style={{ marginBottom: 5 , marginLeft: "22%" }}
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
            <SuccessMessageModal
              message={successMessage}
              onClose={handleClosePopup}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AddProduct;
