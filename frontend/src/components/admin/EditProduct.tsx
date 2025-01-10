import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import Modal from "../common/Modal";
import "../../style/AdminPage.css";
import "../../style/Modal.css";

type ProductDetails = {
  id: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
  quantity: number;
  image: File | null;
  specs: string;
};

// type ModalProps = {
//   show: boolean;
//   prompt: string;
//   onClose: () => void;
//   onSubmit: (id: string) => void;
// };

// const Modal: React.FC<ModalProps> = ({ show, prompt, onClose, onSubmit }) => {
//   const [productID, setProductID] = useState("");
//   const [showWarning, setShowWarning] = useState(false);

//   useEffect(() => {
//     if (!show) {
//       setProductID("");
//       setShowWarning(false);
//     }
//   }, [show]);

//   if (!show) {
//     return null;
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (productID.trim() === "") {
//       setShowWarning(true);
//       return;
//     }
//     setShowWarning(false);
//     onSubmit(productID);
//     setProductID("");
//     onClose();
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>{prompt}</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={productID}
//             onChange={(e) => setProductID(e.target.value)}
//             placeholder="Enter Product ID"
//           />
//           {showWarning && <p className="warning-message" style={{ color: "red" }}>*Please enter a Product ID.</p>}
//           <button type="submit">Submit</button>
//           <button type="button" onClick={onClose}>
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [productID, setProductID] = useState("");
  const [productDetails, setProductDetails] = useState<ProductDetails[]>([]);
  

  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage(""); // Clear error message when modal is closed
    // navigate("/profile");
  };

  const handleSubmitProductID = async (id: string) => {
    if (!id.trim()) {
      setErrorMessage("Product ID cannot be empty.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8083/backend/getProductsById?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); // Corrected URL

      console.log(response);
      
      if (!response.ok) throw new Error("Failed to fetch product data");
      const product: ProductDetails[] = await response.json();
      setProductDetails(product);
      setShowModal(false); // Close modal
      console.log(await response.body);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setErrorMessage("Failed to fetch product details. Please try again.");
    }
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
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
      <Modal
        show={showModal}
        prompt="Enter Product ID"
        onClose={handleCloseModal}
        onSubmit={handleSubmitProductID}
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {/* <h1>{productDetails.name}</h1> */}
      {productID && (
        <p>
          <strong>Entered Product ID:</strong> {productID}
        </p>
      )}
    </div>
  );
};

export default EditProduct;
