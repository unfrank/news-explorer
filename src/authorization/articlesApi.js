// src/utils/articlesApi.js
import * as apiClient from "./apiClient";
import { getToken } from "./auth";

export function fetchAllArticles() {
  return apiClient.get("/api/articles", getToken());
}

export function fetchArticleById(id) {
  return apiClient.get(`/api/articles/${id}`, getToken());
}

export function createArticle(data) {
  return apiClient.post("/api/articles", data, getToken());
}

export function updateArticle(id, data) {
  return apiClient.put(`/api/articles/${id}`, data, getToken());
}

export function deleteArticle(id) {
  return apiClient.del(`/api/articles/${id}`, getToken());
}
