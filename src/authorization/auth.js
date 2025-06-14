// src/authorization/auth.js
import * as apiClient from "../utils/apiClient";

// sign up a new user
export function register({ name, email, password }) {
  console.log("[auth.js] 🔥 register got:", { name, email, password });

  return apiClient.post(
    "/signup", // no /auth prefix
    { username: name, email, password }
  );
}

// log in an existing user
export function login({ email, password }) {
  return apiClient.post(
    "/signin", // no /auth prefix
    { email, password }
  );
}

// get current user profile
export function getCurrentUser(token) {
  return apiClient.get("/users/me", token);
}

// alias for profile check
export function checkToken(token) {
  return apiClient.get("/users/me", token);
}

// sign out (client-only)
export function logout() {
  localStorage.removeItem("jwt"); // clear stored token
  return Promise.resolve(); // preserve promise interface
}
