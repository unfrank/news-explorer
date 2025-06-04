// import React, { useEffect } from "react";
// import "./MobileMenuSignIn.css";
// import closeIcon from "../assets/icons/icon-btn-close.svg";

// export default function MobileMenuSignIn({
//   isOpen,
//   onClose,
//   onSubmit,
//   isLoading,
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
//     <div className="mm-signin">
//       <div className="mm-signin__overlay" onClick={onClose} />

//       <div className="mm-signin__form-container">
//         <button className="mm-signin__close-button" onClick={onClose}>
//           <img src={closeIcon} alt="Close" />
//         </button>

//         <h3 className="mm-signin__form-title">Sign in</h3>
//         <form className="mm-signin__form" onSubmit={onSubmit} noValidate>
//           <label className="mm-signin__label" htmlFor="email-mobile">
//             Email
//           </label>
//           <input
//             id="email-mobile"
//             type="email"
//             placeholder="Enter email"
//             className="mm-signin__input"
//             required
//           />

//           <label className="mm-signin__label" htmlFor="password-mobile">
//             Password
//           </label>
//           <input
//             id="password-mobile"
//             type="password"
//             placeholder="Enter password"
//             className="mm-signin__input"
//             required
//           />

//           <button
//             type="submit"
//             className="mm-signin__submit"
//             disabled={isLoading}
//           >
//             Sign in
//           </button>

//           <div className="mm-signin__footer">
//             or{" "}
//             <a href="#" className="mm-signin__signup-link">
//               Sign up
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// hamburger buillshit
import React, { useEffect, useContext, useState } from "react";
import "./MobileMenuSignIn.css";
import closeIcon from "../assets/icons/icon-btn-close.svg";

import CurrentUserContext from "../contexts/CurrentUserContext";
import { login } from "../authorization/auth";

export default function MobileMenuSignIn({ isOpen, onClose }) {
  const { handleLogin } = useContext(CurrentUserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Always register the Escape‐key listener, but bail if isOpen is false
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // If the overlay is not open, render nothing (after the hooks above run)
  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target["email-mobile"].value.trim();
    const password = e.target["password-mobile"].value.trim();

    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    // Call the same login() from auth.js that your desktop LoginModal uses
    login(email, password)
      .then(({ token, user }) => {
        // `user` = { username, email }
        handleLogin({ token, user });
        setIsSubmitting(false);
        onClose();
      })
      .catch((err) => {
        console.error("Mobile login failed:", err);
        setErrorMessage("Invalid email or password.");
        setIsSubmitting(false);
      });
  }

  return (
    <div className="mm-signin">
      {/* We removed the semi‐opaque overlay entirely, so no overlay div here */}

      {/* Close button (always on top at 16px from edges) */}
      <button className="mm-signin__close-button" onClick={onClose}>
        <img src={closeIcon} alt="Close" />
      </button>

      <div className="mm-signin__form-container">
        <h3 className="mm-signin__form-title">Sign in</h3>

        <form className="mm-signin__form" onSubmit={handleSubmit} noValidate>
          <label className="mm-signin__label" htmlFor="email-mobile">
            Email
          </label>
          <input
            id="email-mobile"
            name="email-mobile"
            type="email"
            placeholder="Enter email"
            className="mm-signin__input"
            required
          />

          <label className="mm-signin__label" htmlFor="password-mobile">
            Password
          </label>
          <input
            id="password-mobile"
            name="password-mobile"
            type="password"
            placeholder="Enter password"
            className="mm-signin__input"
            required
          />

          {errorMessage && (
            <div className="mm-signin__error">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="mm-signin__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>

          <div className="mm-signin__footer">
            or{" "}
            <a href="#" className="mm-signin__signup-link">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
