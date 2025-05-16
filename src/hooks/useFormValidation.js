// import { useState, useCallback } from "react";

// export function useFormAndValidation() {
//   const [values, setValues] = useState({});
//   const [errors, setErrors] = useState({});
//   const [isValid, setIsValid] = useState(true);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     let errorMessage = e.target.validationMessage;

//     if (name === "name" && value.trim().length < 2) {
//       errorMessage = "Name must be at least 2 characters.";
//     }

//     setValues({ ...values, [name]: value });
//     setErrors({ ...errors, [name]: errorMessage });

//     setIsValid(e.target.closest("form").checkValidity());
//   };

//   const resetForm = useCallback(
//     (newValues = {}, newErrors = {}, newIsValid = false) => {
//       setValues(newValues);
//       setErrors(newErrors);
//       setIsValid(newIsValid);
//     },
//     [setValues, setErrors, setIsValid]
//   );

//   return {
//     values,
//     handleChange,
//     errors,
//     isValid,
//     resetForm,
//     setValues,
//     setIsValid,
//   };
// }

// remake

import { useState, useCallback } from "react";

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setIsValid(e.target.closest("form").checkValidity());

    let message = e.target.validationMessage;

    // Custom email error message
    if (
      e.target.type === "email" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      message = "Invalid email address";
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, setErrors, setValues };
}
