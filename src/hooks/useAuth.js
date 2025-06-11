import { useState, useContext } from "react";
import { checkToken, register, login as apiLogin } from "../authorization/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";

export function useAuth() {
  const { setCurrentUser, setIsLoggedIn } = useContext(CurrentUserContext);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const login = async (credentials) => {
    setIsAuthLoading(true);
    try {
      const token = credentials.token;
      localStorage.setItem("jwt", token);
      setIsLoggedIn(true);
      const userInfo = await checkToken(token);
      setCurrentUser({ email: userInfo.email, username: userInfo.username });
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const registerUser = async (
    { email, username, password },
    setEmailError,
    onClose
  ) => {
    setIsAuthLoading(true);
    try {
      await register(email, username, password);
      setEmailError("");
      onClose();
    } catch (err) {
      setEmailError(
        err.message === "Email already exists"
          ? "Email already registered."
          : "Registration failed. Please try again."
      );
    } finally {
      setIsAuthLoading(false);
    }
  };

  return { isAuthLoading, login, logout, registerUser };
}
