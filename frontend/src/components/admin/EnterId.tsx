import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import "../../style/AdminPage.css";

function EnterId() {
  const [productID, setProductID] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmitProductID = async () => {
    setProductID(productID);

    try {
        const response = await fetch(
        `http://localhost:8083/backend/getProductsById?productID=${productID}`,
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        });

        // const jsonContainer = document.getElementById("jsonContainer");
        // if(jsonContainer) {
        //     jsonContainer.textContent = "";
        // }

        if(response.ok) {
            const data = await response.json();
            const productData = data.product;

            // if (jsonContainer) {
            // Format and display the user data
            
            if (data.status === "not found") {
                setMessage("Product not found");
                navigate("/admin/edit-product", { state: { product: productData } });
            }
            else {
                setMessage("Product found");
                //console.log(data);
                //jsonContainer.textContent = JSON.stringify(data, null, 2)
                navigate("/admin/edit-product", { state: { product: productData } });
            }

            }
            //onClose();
                  
        else{ 
            setMessage("Product not found");
            //console.error("Fetch error: ", response.statusText);
        }
    }
    catch (error:any) { 
        console.error("Fetch error: ", error.message);
        setMessage("Network Error: Unable to reach the server. Please try again.");
    };
}

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
      <div className="admin-content" style={{ height: "50vh" }}>
        <h1>Enter Product ID</h1>
        <input
          type="text"
          placeholder="Enter product ID"
          value={productID}
          onChange={(e) => setProductID(e.target.value)}
          required
        />
        <button onClick={() => handleSubmitProductID()}>Submit</button>
      </div>
    </div>
  );
};

export default EnterId;