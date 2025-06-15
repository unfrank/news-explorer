import * as apiClient from "./apiClient";
import { getToken } from "./auth";

export function fetchAllArticles() {
  return apiClient.get("/articles", getToken());
}

export function fetchArticleById(id) {
  return apiClient.get(`/articles/${id}`, getToken());
}

export function createArticle(data) {
  return apiClient.post("/articles", data, getToken());
}

export function updateArticle(id, data) {
  return apiClient.put(`/articles/${id}`, data, getToken());
}

export function deleteArticle(id) {
  return apiClient.del(`/articles/${id}`, getToken());
}
