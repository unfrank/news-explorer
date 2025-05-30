const BASE_URL = "http://localhost:3000";

// export const register = (email, username, password) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, username, password }),
//   })
//     .then((res) => {
//       if (!res.ok) throw new Error("Registration failed");
//       return res.json();
//     })
//     .then((res) => {
//       if (!res.token || !res.username)
//         throw new Error("No token or username received");
//       return {
//         token: res.token,
//         user: {
//           email: res.email,
//           username: res.username,
//         },
//       };
//     });
// };

export function register(email, username, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password }),
  }).then((res) => {
    if (res.status === 409) {
      throw new Error("Email already exists");
    }
    if (!res.ok) {
      throw new Error("Registration failed");
    }
    return res.json();
  });
}

export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Login failed");
      return res.json();
    })
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
  return fetch("http://localhost:3000/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Token validation failed");
      return res.json();
    })
    .then((data) => {
      console.log("✅ JWT checkToken returned:", data); // <--- add this
      return data;
    });
};
