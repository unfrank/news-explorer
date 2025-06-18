const NEWS_API_BASE_URL = "https://news-explorer-api-n5y3.onrender.com/news";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`News API Error: ${res.status} ${res.statusText}`);
};

/**
 * Fetch articles from News API
 * @param {Object} params
 * @param {string} params.query - The keyword to search for
 * @param {string} params.from - ISO date string (7 days ago)
 * @param {string} params.to - ISO date string (today)
 * @returns {Promise}
 */

export const fetchNewsArticles = ({ query }) => {
  const url = new URL(NEWS_API_BASE_URL);
  url.searchParams.append("query", query);

  return fetch(url).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`News API Error: ${res.status} ${res.statusText}`);
  });
};
