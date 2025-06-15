import { useState } from "react";

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setIsValid(e.target.closest("form").checkValidity());

    let message = e.target.validationMessage;

    if (
      e.target.type === "email" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      message = "Invalid email address";
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  return { values, handleChange, errors, isValid, setErrors, setValues };
}
