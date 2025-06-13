import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormValidation";
import "./RegisterModal.css";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  isLoading,
  setActiveModal,
}) {
  const { setValues, setErrors } = useFormAndValidation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setEmailError("");
      setPassword("");
      setPasswordError("");
      setUsername("");
      setErrors({});
    }
  }, [isOpen, setErrors]);

  const validateEmail = (value) => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const msg = ok ? "" : "Invalid email address";
    setEmailError(msg);
    setErrors((prev) => ({ ...prev, email: msg }));
    setValues((prev) => ({ ...prev, email: value }));
  };

  const validatePassword = (value) => {
    const ok = value.length >= 2 && value.length <= 30;
    const msg = ok ? "" : "Password must be 2–30 characters";
    setPasswordError(msg);
    setErrors((prev) => ({ ...prev, password: msg }));
    setValues((prev) => ({ ...prev, password: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onRegister({ email, username, password }, setEmailError);
  };

  // Show server error if it's anything _besides_ our "Invalid email address"
  const isServerError = emailError && emailError !== "Invalid email address";

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Saving..." : "Sign up"}
      disabled={
        !email ||
        !password ||
        !username ||
        emailError ||
        passwordError ||
        isLoading
      }
      footer={
        <>
          or{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              setActiveModal("login");
            }}
          >
            Sign in
          </a>
        </>
      }
    >
      {/* — Email Field */}
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
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          className="modal__input"
          required
        />
        <span
          className={`modal__error ${
            emailError === "Invalid email address"
              ? "modal__error--visible"
              : ""
          }`}
        >
          {emailError === "Invalid email address" ? emailError : " "}
        </span>
      </div>

      {/* — Password Field */}
      <div className="modal__field">
        <label className="modal__label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          maxLength={31}
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          className="modal__input"
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

      {/* — Username Field (no error span) */}
      <div className="modal__field">
        <label className="modal__label" htmlFor="name">
          Username
        </label>
        <input
          type="text"
          id="name"
          name="name"
          maxLength={31}
          placeholder="Enter your username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="modal__input"
          required
        />
      </div>

      {/* — Server‐side “already taken” email error, reserved space */}
      <span
        className={`modal__error-server ${
          isServerError ? "modal__error--visible" : ""
        }`}
      >
        {isServerError ? "This email is not available" : " "}
      </span>
    </ModalWithForm>
  );
}

export default RegisterModal;
