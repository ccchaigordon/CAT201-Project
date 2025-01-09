import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (!show) {
      setProductID("");
      setShowWarning(false);
    }
  }, [show]);

  if (!show) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productID.trim() === "") {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    onSubmit(productID);
    setProductID("");
    onClose();
  };

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
          {showWarning && <p className="warning-message" style={{ color: "red" }}>*Please enter a Product ID.</p>}
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;

