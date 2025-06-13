const BASE_URL = "http://localhost:3000";

const handleResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Error: ${res.status} ${res.statusText}`);
};

export function getSavedArticles(token) {
  return fetch(`${BASE_URL}/articles`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResponse);
}

export function saveArticle(articleData, token) {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(articleData),
  }).then(handleResponse);
}

export function deleteArticle(articleId, token) {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResponse);
}
