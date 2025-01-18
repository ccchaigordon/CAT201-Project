import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useId } from "react";
import AdminNavBar from "./AdminNavBar";
import SuccessMessageModal from "./SuccessMessageModal";
// import "../../style/AdminPage.css";
import "../../style/EditProduct.css";
import "../../style/SuccessMessageModal.css";

interface UserDetails {
  userID: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phoneNum: string;
}

const EditUserDetails: React.FC = () => {
  const location = useLocation();
  const user = location.state?.user as UserDetails;
  const [userDetails, setUserDetails] = useState<UserDetails>(user);
  const [editableFields, setEditableFields] = useState<{
    [key: string]: boolean;
  }>({});
  const [warningMessage, setWarningMessage] = useState<{
    [key: string]: string | null;
  }>({
    email: null,
    password: null,
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const nonEditableFields: (keyof UserDetails)[] = ["userID"];
  const navigate = useNavigate();

  console.log("Product Data:", user);
  console.log("Location state:", location.state);
  console.log("UserID:", user.userID);

  if (user === null || user === undefined)
    console.error("Product data is null or undefined");

  const fieldDisplayedNames: { [key: string]: string } = {
    id: "User ID",
    name: "Name",
    email: "Email",
    password: "Password",
    address: "Address",
    phoneNum: "Phone Number",
  };

  const handleInputChange = (field: keyof UserDetails, value: string) => {
    if (field === "email") {
      const ratingValue = parseFloat(value);
      if (ratingValue < 1 || ratingValue > 5) {
        setWarningMessage((prev) => ({
          ...prev,
          rating: "Email cannot be empty.",
          //   price: "Price must be positive value."
        }));
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          [field]: "", // Clear the input field
        }));
        return;
      } else {
        setWarningMessage((prev) => ({ ...prev, rating: null })); // Clear the warning message
      }
    }

    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value, // Explicitly update the field
    }));
  };

  const handleSaveChangesClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8083/backend/updateUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userDetails.userID,
          name: userDetails.name,
          email: userDetails.email,
          password: userDetails.password,
          address: userDetails.address,
          phoneNum: userDetails.phoneNum,
        }),
      });
      if (response.ok) {
        const data = await response.json();

        if (data.status) {
          console.log(data.status);
          console.log("User details updated successfully");
          setSuccessMessage(
            `User details with ID ${userDetails.userID} successfully updated.`
          );
        } else {
          console.error("Failed to update user details");
          setSuccessMessage("Failed to update user details. Please try again.");
        }
      } else {
        console.error("Failed to update product oho");
        setMessage("Failed to update user details.");
      }
    } catch (error) {
      console.error("Unable to connect to server", error);
      setMessage(
        "Network Error: Unable to reach the server. Please try again."
      );
    }
  };

  // Check if productDetails is null
  if (!user) {
    return <p style={{ color: "red" }}>user not found</p>;
  }

  const handleCloseModal = () => {
    setSuccessMessage(null);
    navigate("/profile");
  };

  const isFieldDisabled = (field: keyof UserDetails) => {
    const nonEditableFields: (keyof UserDetails)[] = ["userID"];
    return nonEditableFields.includes(field);
  };

  return (
    <>
      <div>
        <AdminNavBar />
      </div>
      <div className="form-content">
        <h1>Edit User Details</h1>
        <form className="edit-form">
          {Object.keys(userDetails).map((field) => {
            const id = useId();
            const typedField = field as keyof UserDetails;
            return (
              <div className="form-field" key={field}>
                <label htmlFor={id} className="from-label">
                  {fieldDisplayedNames[typedField]}
                </label>
                <input
                  id={id}
                  type="text"
                  value={userDetails[typedField]}
                  onChange={(e) =>
                    handleInputChange(typedField, e.target.value)
                  }
                  className="custom-input"
                  disabled={isFieldDisabled(typedField)}
                />
              </div>
            );
          })}
          <button type="submit" onClick={handleSaveChangesClick}>
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUserDetails;