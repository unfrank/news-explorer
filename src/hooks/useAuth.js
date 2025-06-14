import { useState, useContext } from "react";
import {
  checkToken,
  register,
  login as apiLogin, // keep this
} from "../authorization/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";

export function useAuth() {
  const { setCurrentUser, setIsLoggedIn } = useContext(CurrentUserContext);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // 1. Proper login flow
  const login = async ({ email, password }, setAuthError) => {
    setIsAuthLoading(true);
    try {
      // call backend
      const {
        token,
        email: respEmail,
        username: respUsername,
      } = await apiLogin({ email, password });

      // store + update context
      localStorage.setItem("jwt", token);
      setIsLoggedIn(true);
      setCurrentUser({
        email: respEmail,
        username: respUsername,
      });
      setAuthError("");
    } catch (err) {
      setAuthError(err.error || "Login failed. Please try again.");
    } finally {
      setIsAuthLoading(false);
    }
  };

  // 2. Logout stays the same
  const logout = () => {
    console.log("[useAuth] 🔒 logging out");
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // 3. Register flow you already nailed
  const registerUser = async (
    { email, username, password },
    setEmailError,
    onClose
  ) => {
    setIsAuthLoading(true);
    try {
      const {
        token,
        email: respEmail,
        username: respUsername,
      } = await register({ name: username, email, password });

      localStorage.setItem("jwt", token);
      setIsLoggedIn(true);
      setCurrentUser({
        email: respEmail,
        username: respUsername,
      });

      setEmailError("");
      onClose();
    } catch (err) {
      setEmailError(
        err.message === "User already exists"
          ? "Email already registered."
          : "Registration failed. Please try again."
      );
    } finally {
      setIsAuthLoading(false);
    }
  };

  return {
    isAuthLoading,
    login,
    logout,
    registerUser,
  };
}
