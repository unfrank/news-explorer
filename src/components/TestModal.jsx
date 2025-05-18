import React from "react";
import "./TestModal.css";

function TestModal({ isOpen, onClose, description }) {
  if (!isOpen) return null;

  return (
    <div className="test-modal">
      <div className="test-modal__overlay" onClick={onClose} />
      <div className="test-modal__content">
        <button className="test-modal__close" onClick={onClose}>
          ×
        </button>
        <h2 className="test-modal__title">Full Article Text</h2>
        <div className="test-modal__body">{description}</div>
      </div>
    </div>
  );
}

export default TestModal;
