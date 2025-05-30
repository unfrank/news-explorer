import React, { useState, useEffect } from "react";
import "./RegisterSuccessModal.css";
import { login } from "../authorization/auth";

function RegisterSuccessModal({
  isOpen,
  onClose,
  onAuthSuccess,
  pendingLogin,
  setActiveModal,
}) {
  if (!isOpen) return null;

  const [emailError, setEmailError] = useState("");

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal__title">Registration successfully completed!</h2>
        <div className="modal__footer-registration">
          <p
            className="register-success__link"
            onClick={() => {
              if (!pendingLogin) return;

              login(pendingLogin.email, pendingLogin.password)
                .then((res) => {
                  onAuthSuccess(res);
                  setActiveModal("");
                })
                .catch((err) => {
                  console.error("Auto-login after registration failed:", err);
                });
            }}
          >
            Sign in
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterSuccessModal;
