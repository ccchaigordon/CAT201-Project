import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import AdminCard from "./AdminCard";
import "../../style/AdminPage.css";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/admin/enterid");
  };

  const handleAddCardClick = () => {
    navigate("/admin/add-product");
  };

  const handleUserCardClick = () => {
    navigate("/admin/enter-user-id");
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
        <div className="update-products">
            <AdminCard
              title="Update Products"
              content="Accessories, Basses, Drums, Guitars, Keyboards"
              width="500px"
              color="#f0f0f0"
              onClick={handleCardClick}
            />
            <AdminCard
              title="Create New Products"
              content="Accessories, Basses, Drums, Guitars, Keyboards"
              width="500px"
              color="#f0f0f0"
              onClick={handleAddCardClick}
            />
        </div>
        <div className="update-users">
          <div>
            <AdminCard
              title="Update Users Details"
              // content="Accessories, Basses, Drums, Guitars, Keyboards"
              width="500px"
              color="#f0f0f0"
              onClick={handleUserCardClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
