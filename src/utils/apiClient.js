const BASE_URL = "http://localhost:3000";

async function request(endpoint, method = "GET", data = null, token = null) {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (data) {
    // 🔥 Log the exact object we’re about to send:
    console.log("[apiClient] ↗️", method, endpoint, "payload:", data);
    config.body = JSON.stringify(data);
  } else {
    console.log("[apiClient] ↗️", method, endpoint, "no payload");
  }

  // 🔥 Log the final fetch arguments:
  console.log("[apiClient] 🔗 fetch args:", BASE_URL + endpoint, config);
  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error("API request failed");
    error.data = errorData;
    throw error;
  }

  return response.json();
}

export function get(endpoint, token) {
  return request(endpoint, "GET", null, token);
}

export function post(endpoint, data, token) {
  return request(endpoint, "POST", data, token);
}

export function patch(endpoint, data, token) {
  return request(endpoint, "PATCH", data, token);
}

export function del(endpoint, token) {
  return request(endpoint, "DELETE", null, token);
}
