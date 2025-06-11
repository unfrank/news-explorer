import { useState } from "react";
import { fetchNewsArticles } from "../utils/newsApi";

export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const search = async (query) => {
    setFetchError(false);
    setIsLoading(true);
    try {
      const today = new Date().toISOString().slice(0, 10);
      const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);

      const data = await fetchNewsArticles({
        query,
        from: lastWeek,
        to: today,
      });
      setArticles(data.articles.slice(0, 9)); // simplified from validate loop :contentReference[oaicite:3]{index=3}
    } catch {
      setFetchError(true);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const save = async (articleData, savedArticles, setSavedArticles) => {};

  return { articles, isLoading, fetchError, search, save };
}
