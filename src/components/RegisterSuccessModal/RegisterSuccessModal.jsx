import { useState } from "react";
import "./RegisterSuccessModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import closeIcon from "../../assets/icons/icon-btn-close.svg";

function RegisterSuccessModal({
  isOpen,
  onClose,
  onAuthSuccess,
  pendingLogin,
  setActiveModal,
}) {
  if (!isOpen) return null;

  const [authError, setAuthError] = useState("");

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__content">
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close registration success modal"
        >
          <img src={closeIcon} alt="Close" />
        </button>
        <h2 className="modal__title">Registration successfully completed!</h2>
        <div className="modal__footer-registration">
          <p
            className="register-success__link"
            onClick={() => {
              if (!pendingLogin) return;

              onAuthSuccess(
                { email: pendingLogin.email, password: pendingLogin.password },
                (msg) => {
                  setAuthError(msg);
                },
                () => setActiveModal("")
              );
            }}
          >
            Sign in
          </p>
        </div>
        {authError && (
          <span className="modal__error-server modal__error--visible">
            {authError}
          </span>
        )}
      </div>
    </div>
  );
}

export default RegisterSuccessModal;
