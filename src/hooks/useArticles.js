import { useState } from "react";
import { fetchNewsArticles } from "../utils/newsApi";
import { saveArticle, deleteArticle } from "../authorization/articlesApi";

export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);

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
      setArticles(data.articles.slice(0, 9));
    } catch {
      setFetchError(true);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const save = async (articleData) => {
    try {
      const token = localStorage.getItem("jwt");
      const savedArticle = await saveArticle(articleData, token);
      setSavedArticles((prev) => [...prev, savedArticle]);
    } catch {}
  };

  const remove = async (articleId) => {
    try {
      const token = localStorage.getItem("jwt");
      await deleteArticle(articleId, token);
      setSavedArticles((prev) => prev.filter((a) => a._id !== articleId));
    } catch {}
  };

  return {
    articles,
    isLoading,
    fetchError,
    search,
    save,
    remove,
    savedArticles,
  };
}
