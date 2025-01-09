import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
// import Footer from "../global/Footer";
import AdminCard from "./AdminCard";
import Modal from "../common/Modal";
import EditProduct from "./EditProduct";
// import TestCard from "./testCard";
import "../../style/AdminPage.css";

const AdminPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [productID, setProductID] = useState("");
  const navigate = useNavigate();

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitProductID = (id: string) => {
    setProductID(id);
    console.log("Product ID submitted:", productID);
    navigate(`/admin/edit-product/${id}`); // Redirect to EditProduct page
  };

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
        {/* <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <AdminCard
                title="Manage Products"
                content="click to manage products"
                width = "500px"
                color="#f0f0f0"
                onClick={handleCardClick}
            />
        </div> */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
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
        </div>
      </div>

      {/* <TestCard /> */}

      <Modal
        show={showModal}
        prompt="Enter Product ID"
        onClose={handleCloseModal}
        onSubmit={handleSubmitProductID}
        // title= "Enter Product ID"
        // content= "Enter Product ID:"
      />
      {/* <Footer /> */}
    </div>
  );
};

export default AdminPage;
