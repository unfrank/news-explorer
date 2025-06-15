const NEWS_API_BASE_URL = "https://newsapi.org/v2/everything";
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

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

export const fetchNewsArticles = ({ query, from, to }) => {
  const url = new URL(NEWS_API_BASE_URL);
  url.searchParams.append("q", query);
  url.searchParams.append("from", from);
  url.searchParams.append("to", to);
  url.searchParams.append("pageSize", 9);
  url.searchParams.append("language", "en");
  url.searchParams.append("apiKey", NEWS_API_KEY);

  return fetch(url).then(handleResponse);
};
