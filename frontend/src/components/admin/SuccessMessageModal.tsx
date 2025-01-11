import React from 'react';
import '../../style/SuccessMessageModal.css';// Create a CSS file for styling the modal

interface SuccessMessageModalProps {
  message: string;
  onClose: () => void;
}

const SuccessMessageModal: React.FC<SuccessMessageModalProps> = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessMessageModal;