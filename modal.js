// Modal.js
import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
