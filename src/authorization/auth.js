import * as apiClient from "../utils/apiClient";

// export function register({ name, email, password }) {
//   return apiClient.post("/signup", { name, email, password });
// }

export function register({ name, email, password }) {
  return apiClient.post("/signup", { username: name, email, password });
}

export function register({ name, email, password }) {
  return apiClient.post("/signup", { username: name, email, password });
}

export function login({ email, password }) {
  return apiClient.post("/signin", { email, password });
}

export function getCurrentUser(token) {
  return apiClient.get("/users/me", token);
}

export function checkToken(token) {
  return apiClient.get("/users/me", token);
}
export function logout(token) {
  return apiClient.post("/signout", null, token);
}

// export function saveArticle(articleData, token) {
//   return apiClient.post("/articles", articleData, token);
// }
// export function getSavedArticles(token) {
//   return apiClient.get("/articles", token);
// }
// export function deleteArticle(articleId, token) {
//   return apiClient.del(`/articles/${articleId}`, token);
// }
// export function getArticles(token) {
//   return apiClient.get("/articles", token);
// }
// export function getUserInfo(token) {
//   return apiClient.get("/users/me", token);
// }
// export function updateUserInfo({ name, email }, token) {
//   return apiClient.patch("/users/me", { name, email }, token);
// }
