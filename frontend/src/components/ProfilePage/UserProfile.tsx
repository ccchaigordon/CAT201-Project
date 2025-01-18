import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../userContext"; // Import the custom look
import { useId } from "react";
// import AdminNavBar from "../admin/AdminNavBar";
import NavBar from "../global/NavBar";
import SuccessMessageModal from "../admin/SuccessMessageModal";
import "../../style/EditProduct.css";
import "../../style/SuccessMessageModal.css";

interface UserDetails {
    userID: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    address: string | null;
    phoneNum: string | null;
    role: string | null;
  }

const UserProfile: React.FC = () => {
    const { userId, name, email, password, address, phoneNum, role } = useUser();

//   const location = useLocation();
//   const user = location.state?.user as UserDetails;
  const [userDetails, setUserDetails] = useState<UserDetails>({
    userID: "",
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNum: "",
    role: "",
  });
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
  const nonEditableFields: (keyof UserDetails)[] = ["userID","role"];
  const navigate = useNavigate();

  console.log("User Data:", name);
  console.log("Address:", address);
  console.log("User id:", userId);

  if (name === null || name === undefined)
    console.error("Product data is null or undefined");

  useEffect(() => {
    setUserDetails({ userID: userId, name, email, password, address, phoneNum, role });
}, [userId, name, email, password, address, phoneNum, role]);


  const fieldDisplayedNames: { [key: string]: string } = {
    userID: "User ID",
    name: "Name",
    email: "Email",
    password: "Password",
    address: "Address",
    phoneNum: "Phone Number",
    role: "Role",
  };

  const handleInputChange = (field: keyof UserDetails, value: string) => {
    if (field === "email") {
    //   const ratingValue = parseFloat(value);
      if (value === "") {
        setWarningMessage((prev) => ({
          ...prev,
          email: "Email cannot be empty.",
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
    // console.log("User details:", userDetails);
    console.log("User ID:", userDetails.userID);

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
  if (!name) {
    return <p style={{ color: "red" }}>user not found</p>;
  }

  const handleCloseModal = () => {
    setSuccessMessage(null);
    navigate("/");
  };

  const isFieldDisabled = (field: keyof UserDetails) => {
    const nonEditableFields: (keyof UserDetails)[] = ["userID","role"];
    return nonEditableFields.includes(field);
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="content">
        <h1>Edit User Details</h1>
        <form className="form-container">
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
                  value={userDetails[typedField] ?? ""}
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
        {successMessage && (
          <SuccessMessageModal
            message="User details updated successfully!"
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default UserProfile;
