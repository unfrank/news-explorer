import { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/icons/icon-btn-close.svg";

function ModalWithForm({
  title,
  children,
  buttonText,
  onClose,
  onSubmit,
  isOpen,
  footer,
  disabled,
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__content">
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="Close" />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form onSubmit={onSubmit} className="modal__form" noValidate>
          {children}
          {buttonText && (
            <button
              type="submit"
              className={`modal__submit ${
                disabled ? "modal__submit--disabled" : ""
              }`}
              disabled={disabled}
            >
              {buttonText}
            </button>
          )}
          {footer && <div className="modal__footer">{footer}</div>}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
