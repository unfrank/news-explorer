// import React, { useEffect } from "react";
// import "./ModalWithForm.css";
// import closeIcon from "../assets/icons/icon-btn-close.svg";

// function ModalWithForm({
//   title,
//   children,
//   buttonText,
//   onClose,
//   onSubmit,
//   isOpen,
// }) {
//   if (!isOpen) return null;

//   useEffect(() => {
//     function handleKeyDown(e) {
//       if (e.key === "Escape") {
//         onClose();
//       }
//     }

//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [onClose]);

//   return (
//     <div className="modal">
//       <div className="modal__overlay" onClick={onClose} />
//       <div className="modal__content">
//         <button className="modal__close" onClick={onClose}>
//           <img src={closeIcon} alt="Close" />
//         </button>
//         <h2 className="modal__title">{title}</h2>
//         <form onSubmit={onSubmit} className="modal__form">
//           {children}
//           <button type="submit" className="modal__submit">
//             {buttonText}
//           </button>
//           <div className="modal__footer">
//             or <a href="#">Sign up</a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ModalWithForm;

import React, { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../assets/icons/icon-btn-close.svg";

function ModalWithForm({
  title,
  children,
  buttonText,
  onClose,
  onSubmit,
  isOpen,
  footer,
}) {
  if (!isOpen) return null;

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form onSubmit={onSubmit} className="modal__form" noValidate>
          {children}
          {buttonText && (
            <button type="submit" className="modal__submit">
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
