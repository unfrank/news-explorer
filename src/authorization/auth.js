export function login(email, password) {
  const fakeToken = "fake-jwt-token";
  localStorage.setItem("jwt", fakeToken);
  return Promise.resolve({ token: fakeToken, email });
}

export function register(email, password) {
  return Promise.resolve({ email });
}

export function checkToken(token) {
  if (token === "fake-jwt-token") {
    return Promise.resolve({ email: "user@example.com" });
  } else {
    return Promise.reject("Invalid token");
  }
}
