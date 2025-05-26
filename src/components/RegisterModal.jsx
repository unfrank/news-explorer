import React, { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "../hooks/useFormValidation";
import "./RegisterModal.css";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  isLoading,
  setActiveModal,
}) {
  const { values, setValues, setErrors, errors, isValid } =
    useFormAndValidation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
      setEmailError("");
      setPasswordError("");
      setErrors({});
    }
  }, [isOpen, setErrors]);

  const validateEmail = (value) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const msg = isValid ? "" : "Invalid email address";
    setEmailError(msg);
    setErrors((prev) => ({ ...prev, email: msg }));
    setValues((prev) => ({ ...prev, email: value }));
  };

  const validatePassword = (value) => {
    const isValid = value.length >= 2 && value.length <= 30;
    const msg = isValid ? "" : "Password must be 2–30 characters";
    setPasswordError(msg);
    setErrors((prev) => ({ ...prev, password: msg }));
    setValues((prev) => ({ ...prev, password: value }));
  };

  const validateUsername = (value) => {
    const isValid = value.length >= 2 && value.length <= 30;
    const msg = isValid ? "" : "Username must be 2–30 characters";
    setErrors((prev) => ({ ...prev, name: msg }));
    setValues((prev) => ({ ...prev, name: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onRegister({ email, password, username });
      onClose();
      setActiveModal("register-success");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

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
        errors.name ||
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
          id="password"
          maxLength={31}
          name="password"
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

      <div className="modal__field">
        <label className="modal__label" htmlFor="name">
          Username
        </label>
        <input
          type="text"
          id="name"
          maxLength={31}
          name="name"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            validateUsername(e.target.value);
          }}
          className="modal__input"
          required
        />
        <span
          className={`modal__error ${
            errors.name ? "modal__error--visible" : ""
          }`}
        >
          {errors.name || " "}
        </span>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
