import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
// import Footer from "../global/Footer";
import AdminCard from "./AdminCard";
// import Modal from "../common/Modal";
// import EditProduct from "./EditProduct";
// import TestCard from "./testCard";
import "../../style/AdminPage.css";

const AdminPage: React.FC = () => {
  // const [showModal, setShowModal] = useState(false);
  // const [productID, setProductID] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCardClick = () => {
    // setShowModal(true);
    navigate("/admin/enterid");
  };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setErrorMessage(""); // Clear error message when modal is closed
  // };

  // const handleSubmitProductID = async (id: string) => {
  //   setProductID(id);
  //   try {
  //     // Fetch product data from the server
  //     const response = await fetch(`http://localhost:8083/backend/backend/getProducts?category=getAllProducts&id=${id}`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch product data");
  //     }
  //     const result = await response.json();

  //     // Check if the entered product ID exists
  //     if (result.exists) {
  //       console.log("Product ID submitted:", productID);
  //       navigate(`/admin/edit-product/${id}`); // Redirect to EditProduct page
  //     } else {
  //       setErrorMessage("Product ID not found. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching product data:", error);
  //     setErrorMessage("An error occurred while fetching product data. Please try again.");
  //   }
  // };

  return (
    <div
      style={{
        textAlign: "center",
        display: "block",
        backgroundColor: "#FFFFFF",
        color: "#000000",
      }}
    >
      <AdminNavBar />
      <div className="admin-content">
        <h3>Hello, Admin.</h3>
        <h2>Manage Products</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <AdminCard
                title="Update Products"
                content="Accessories, Basses, Drums, Guitars, Keyboards"
                width = "500px"
                color="#f0f0f0"
                onClick={handleCardClick}
            />
            <AdminCard
                title="Create New Products"
                content="Accessories, Basses, Drums, Guitars, Keyboards"
                width = "500px"
                color="#f0f0f0"
                onClick={handleCardClick}
            />
        </div>
        {/* <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <AdminCard
            title="Accessories"
            // imageSrc="/assets/category_accessory.png"
            // content="Card Content 1"
            color="#f0f0f0"
            // width="300px"
            // height="350px" // Adjusted height
            onClick={handleCardClick}
          />
          <AdminCard
            title="Basses"
            content="Card Content 2"
            color="#f0f0f0"
            // width="300px"
            // height="350px" // Adjusted height
            onClick={handleCardClick}
          />
          <AdminCard
            title="Drums"
            content="Card Content 3"
            color="#f0f0f0"
            // width="300px"
            // height="350px" // Adjusted height
            onClick={handleCardClick}
          />
          <AdminCard
            title="Guitars"
            content="Card Content 4"
            color="#f0f0f0"
            // width="300px"
            // height="350px" // Adjusted height
            onClick={handleCardClick}
          />
          <AdminCard
            title="Keyboards"
            content="Card Content 5"
            color="#f0f0f0"
            // width="300px"
            // height="350px" // Adjusted height
            onClick={handleCardClick}
          />
        </div> */}
      </div>

      {/* <TestCard /> */}

      
      {/* <Footer /> */}
    </div>
  );
};

export default AdminPage;
