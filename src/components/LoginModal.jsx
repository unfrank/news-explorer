// import React, { useState, useEffect } from "react";
// import ModalWithForm from "./ModalWithForm";
// import "./LoginModal.css";

// function LoginModal({
//   isOpen,
//   onClose,
//   onAuthSuccess,
//   isLoading,
//   buttonText,
//   setActiveModal,
// }) {
//   const [email, setEmail] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   useEffect(() => {
//     if (!isOpen) {
//       setEmail("");
//       setPassword("");
//       setEmailError("");
//       setPasswordError("");
//     }
//   }, [isOpen]);

//   const validateEmail = (value) => {
//     const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//     setEmailError(isValid ? "" : "Invalid email address");
//   };

//   const validatePassword = (value) => {
//     setPasswordError(
//       value.length >= 2 && value.length <= 30
//         ? ""
//         : "Password must be 2–30 characters"
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!emailError && !passwordError && email && password) {
//       // You can call your API here. For now, mock response:
//       const mockCredentials = {
//         token: "fake-token-123",
//         user: { _id: "abc123", email: email },
//       };
//       onAuthSuccess(mockCredentials);
//     }
//   };

//   return (
//     <ModalWithForm
//       title="Sign In"
//       isOpen={isOpen}
//       onClose={onClose}
//       onSubmit={handleSubmit}
//       buttonText={buttonText}
//     >
//       <div className="modal__field">
//         <label className="modal__label">Email</label>
//         <input
//           type="email"
//           className="modal__input"
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//             validateEmail(e.target.value);
//           }}
//           required
//         />
//         <span
//           className={`modal__error ${
//             emailError ? "modal__error--visible" : ""
//           }`}
//         >
//           {emailError || " "}
//         </span>
//       </div>

//       <div className="modal__field">
//         <label className="modal__label">Password</label>
//         <input
//           type="password"
//           className="modal__input"
//           value={password}
//           onChange={(e) => {
//             setPassword(e.target.value);
//             validatePassword(e.target.value);
//           }}
//           required
//         />
//         <span
//           className={`modal__error ${
//             passwordError ? "modal__error--visible" : ""
//           }`}
//         >
//           {passwordError || " "}
//         </span>
//       </div>

//       <button type="submit" className="modal__submit">
//         {buttonText}
//       </button>

//       <div className="modal__footer">
//         or{" "}
//         <a
//           href="#"
//           onClick={(e) => {
//             e.preventDefault();
//             setActiveModal("register");
//           }}
//         >
//           Sign up
//         </a>
//       </div>
//     </ModalWithForm>
//   );
// }

// export default LoginModal;

// remake

import React, { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import "./LoginModal.css";

function LoginModal({
  isOpen,
  onClose,
  onAuthSuccess,
  isLoading,
  buttonText,
  setActiveModal,
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

  const validateEmail = (value) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid ? "" : "Invalid email address");
  };

  const validatePassword = (value) => {
    setPasswordError(
      value.length >= 2 && value.length <= 30
        ? ""
        : "Password must be 2–30 characters"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError && !passwordError && email && password) {
      const mockCredentials = {
        token: "fake-token-123",
        user: { _id: "abc123", email: email },
      };
      onAuthSuccess(mockCredentials);
    }
  };

  return (
    <ModalWithForm
      title="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      footer={
        <>
          or{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveModal("register");
            }}
          >
            Sign up
          </a>
        </>
      }
    >
      <div className="modal__field">
        <label className="modal__label">Email</label>
        <input
          type="email"
          className="modal__input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          required
        />
        <span
          className={`modal__error ${
            emailError ? "modal__error--visible" : ""
          }`}
        >
          {emailError || " "}
        </span>
      </div>

      <div className="modal__field">
        <label className="modal__label">Password</label>
        <input
          type="password"
          className="modal__input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          required
        />
        <span
          className={`modal__error ${
            passwordError ? "modal__error--visible" : ""
          }`}
        >
          {passwordError || " "}
        </span>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
