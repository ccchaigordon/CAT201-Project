import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Modal.css";

interface ModalProps {
  show: boolean;
  prompt: string;
  onClose: () => void;
  onSubmit: (productID: string) => void;
}

const Modal: React.FC<ModalProps> = ({ show, prompt, onClose, onSubmit }) => {
  const [productID, setProductID] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!show) {
      setProductID("");
      setShowWarning(false);
    }
  }, [show]);

  if (!show) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // if (productID.trim() === "") {
    //   setShowWarning(true);
    //   return;
    // }
    // setShowWarning(false);
    // onSubmit(productID);
    // //setProductID(productID);
    // navigate("/admin/edit-product", { state: { productID: productID } });
    // onClose();

    e.preventDefault();

    try {
        const response = await fetch(
        `http://localhost:8083/backend/getProductsById?productID=${productID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const jsonContainer = document.getElementById("jsonContainer");

        if(response.ok) {
          const data = await response.json();
          console.log(data);
          //navigate("/admin/edit-product", { state: { productID: productID } });

        if (jsonContainer) {
          // Format and display the user data
          jsonContainer.textContent = JSON.stringify(data, null, 2)
          setMessage("Product found");
          //navigate("/loggedin", { state: { user: data } });
        };
          //onClose();
        }   
    }
    catch (error:any) { 
      console.error("Fetch error: ", error.message);
      setMessage("Network Error: Unable to reach the server. Please try again.");
    };
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{prompt}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={productID}
            onChange={(e) => setProductID(e.target.value)}
            placeholder="Enter Product ID"
          />
          {showWarning && (
            <p className="warning-message" style={{ color: "red" }}>
              *Please enter a Product ID.
            </p>
          )}
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
        <p>{message}</p>
        <div id="jsonContainer" style={{ whiteSpace: "pre-wrap", backgroundColor: "#f0f0f0", padding: "10px", border: "1px solid #ccc", marginTop: "10px", color: 'black'}}></div>
      </div>
    </div>
  );
};

export default Modal;
