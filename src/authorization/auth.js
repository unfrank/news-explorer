const BASE_URL = "http://localhost:3000";

function handleResponse(res, errorMsg = "Request failed") {
  if (!res.ok) throw new Error(errorMsg);
  return res.json();
}

export function register(email, username, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password }),
  }).then((res) => {
    if (res.status === 409) throw new Error("Email already exists");
    return handleResponse(res, "Registration failed");
  });
}

export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => handleResponse(res, "Login failed"))
    .then((res) => {
      if (!res.token || !res.username)
        throw new Error("Incomplete login response");
      localStorage.setItem("jwt", res.token);
      return {
        token: res.token,
        user: { email: res.email, username: res.username },
      };
    });
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => handleResponse(res, "Token validation failed"));
};
