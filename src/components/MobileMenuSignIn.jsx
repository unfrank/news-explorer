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
import React, { useEffect } from "react";
import "./MobileMenuSignIn.css";
import closeIcon from "../assets/icons/icon-btn-close.svg";

export default function MobileMenuSignIn({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
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
    <div className="mm-signin">
      <div className="mm-signin__overlay" onClick={onClose} />
      <button className="mm-signin__close-button" onClick={onClose}>
        <img src={closeIcon} alt="Close" />
      </button>

      <div className="mm-signin__form-container">
        <h3 className="mm-signin__form-title">Sign in</h3>
        <form className="mm-signin__form" onSubmit={onSubmit} noValidate>
          <label className="mm-signin__label" htmlFor="email-mobile">
            Email
          </label>
          <input
            id="email-mobile"
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
            type="password"
            placeholder="Enter password"
            className="mm-signin__input"
            required
          />

          <button
            type="submit"
            className="mm-signin__submit"
            disabled={isLoading}
          >
            Sign in
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
