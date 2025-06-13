import React, { useEffect, useContext, useState } from "react";

import "./MobileMenuSignIn.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { login } from "../../authorization/auth";

export default function MobileMenuSignIn({ isOpen, onClose }) {
  const { handleLogin } = useContext(CurrentUserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

    login(email, password)
      .then(({ token, user }) => {
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
      <div className="mm-signin__form-container">
        {/* Remove the close icon here—it's now up in Header.jsx */}
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
        </form>

        <div className="mm-signin__footer">
          or{" "}
          <a href="#" className="mm-signin__signup-link">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
