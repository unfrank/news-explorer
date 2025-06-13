import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import { login } from "../../authorization/auth";

function LoginModal({
  isOpen,
  onClose,
  onAuthSuccess,
  isLoading,
  buttonText,
  setActiveModal,
}) {
  if (!isOpen) return null;
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
      login(email, password)
        .then(onAuthSuccess)
        .catch((err) => {
          console.error("Login failed:", err);
          setPasswordError("Invalid credentials");
        });
    }
  };

  return (
    <ModalWithForm
      title="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      disabled={!email || !password || emailError || passwordError || isLoading}
      footer={
        <>
          or{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              setTimeout(() => setActiveModal("register"), 0);
            }}
          >
            Sign up
          </a>
        </>
      }
    >
      <div className="modal__field">
        <label className="modal__label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          maxLength={62}
          placeholder="Enter email"
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
        <label className="modal__label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          maxLength={31}
          id="password"
          name="password"
          placeholder="Enter password"
          className="modal__input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          required
        />

        <span
          className={`modal__error modal__error-last ${
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
