import React, { useState } from "react";
import { useId } from "react";

// import AdminNavBar from "./AdminNavBar";
import "../../style/AdminPage.css";

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

function Form() {
  const productInputId = useId();
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    id: "",
    name: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    rating: "",
    quantity: "",
    image: "",
    specs: "",
  });
  const [editableFields, setEditableFields] = useState<Record<string, boolean>>(
    {}
  );

  const handleEditClick = (field: keyof ProductDetails) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (field: keyof ProductDetails, value: string) => {
    setProductDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      {/* <AdminNavBar /> */}
      <label>
        <div className="form-container">
          {Object.keys(productDetails).map((field) => {
            const id = useId();
            return (
              <div key={field} className="form-field">
                <label htmlFor={id}>{field}</label>
                <input
                  id={id}
                  type="text"
                  value={productDetails[field as keyof ProductDetails]}
                  onChange={(e) => handleInputChange(field as keyof ProductDetails, e.target.value)}
                  readOnly={!editableFields[field]}
                />
                <button type="button" onClick={() => handleEditClick(field as keyof ProductDetails)}>
                  {editableFields[field] ? "Save" : "Edit"}
                </button>
              </div>
            );
          })}
        </div>
      </label>
    </>
  );
}

export default Form;
