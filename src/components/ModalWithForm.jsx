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
//             Sign In
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

import React, { useState, useEffect } from "react";

function ModalWithForm({
  title,
  children,
  buttonText,
  onClose,
  onSubmit,
  isOpen,
}) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
    }
  }, [isOpen]);

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? "" : "Invalid email address");
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 2 || value.length > 30) {
      setPasswordError("Password must be 2–30 characters");
    } else {
      setPasswordError("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!emailError && !passwordError && email && password) {
      onSubmit({ email, password });
    }
  }

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal__title">{title}</h2>
        <form onSubmit={handleSubmit} className="modal__form" noValidate>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && <span className="modal__error">{emailError}</span>}

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && (
            <span className="modal__error">{passwordError}</span>
          )}

          <button
            type="submit"
            className="modal__submit"
            disabled={emailError || passwordError || !email || !password}
          >
            Sign in
          </button>
        </form>

        <div className="modal__footer">
          or <a href="#">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default ModalWithForm;
