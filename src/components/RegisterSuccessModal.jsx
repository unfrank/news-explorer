import React from "react";
import "./RegisterSuccessModal.css";

function RegisterSuccessModal({ isOpen, onClose, setActiveModal }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal__title">Registration successfully completed!</h2>
        <div className="modal__footer-registration">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              setActiveModal("login");
            }}
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterSuccessModal;
