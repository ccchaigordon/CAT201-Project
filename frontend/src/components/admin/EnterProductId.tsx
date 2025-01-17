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
        }
      );

      if (response.ok) {
        const data = await response.json();
        const productData = data.product;

        if (data.status == "error") {
          setMessage("Product not found");
          navigate("/admin/enter-product-id");
        } else {
          setMessage("Product found");
          //console.log(data);
          //jsonContainer.textContent = JSON.stringify(data, null, 2)
          navigate("/admin/edit-product", { state: { product: productData } });
        }
      } else {
        setMessage("Please Enter Product ID.");
        console.error("Fetch error: ", response.statusText);
      }
    } catch (error: any) {
      console.error("Fetch error: ", error.message);
      setMessage(
        "Network Error: Unable to reach the server. Please try again."
      );
    }
  };

  // if (response.ok) {
  //       const data = await response.json();
  //       const productData = data.product;

  //       if (!productData || data.status === "not found") {
  //         setMessage("Product not found");
  //       } else {
  //         console.log(productData);
  //         setMessage("Product found");
  //         setTimeout(() => {
  //         navigate("/admin/edit-product", { state: { product: productData } });
  //         });
  //       }
  //     } else {
  //       setMessage("Product not found");
  //     }
  //   } catch (error: any) {
  //     console.error("Fetch error: ", error.message);
  //     setMessage("Network Error: Unable to reach the server. Please try again.");
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
        {message && <p style={{ color: "red" }}>{message}</p>}
      </div>
    </div>
  );
}

export default EnterId;
