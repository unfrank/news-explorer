// src/authorization/auth.js
import * as apiClient from "../utils/apiClient";

export function register({ name, email, password }) {
  return apiClient.post("/signup", { name, email, password });
}

export function login({ email, password }) {
  return apiClient.post("/signin", { email, password });
}

export function getCurrentUser(token) {
  return apiClient.get("/users/me", token);
}
