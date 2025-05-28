import "./SavedNews.css";
import NewsCard from "./NewsCard";
import React, { useContext, useState, useMemo } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function SavedNews({ savedArticles, onDeleteArticle }) {
  console.log("🔥 SavedNews mounted");
  console.log(
    "🔍 Saved Articles:",
    savedArticles.map((a) => a.keyword)
  );

  const { currentUser } = useContext(CurrentUserContext);
  const displayName =
    currentUser?.username?.charAt(0).toUpperCase() +
      currentUser?.username?.slice(1) || "You";

  const [fadingCardIds, setFadingCardIds] = useState([]);

  const visibleArticles = useMemo(
    () =>
      savedArticles.filter((article) => !fadingCardIds.includes(article._id)),
    [savedArticles, fadingCardIds]
  );

  const keywordCounts = useMemo(() => {
    const counts = {};
    savedArticles.forEach((article) => {
      const keyword = article.keyword?.trim();
      if (keyword) {
        counts[keyword] = (counts[keyword] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([keyword]) => keyword);
  }, [savedArticles]);

  const topKeywords = keywordCounts.slice(0, 3);

  const capitalize = (word) =>
    word ? word.charAt(0).toUpperCase() + word.slice(1) : "";

  const renderKeywordSummary = () => {
    const total = keywordCounts.length;

    if (total === 0) return null;

    if (total <= 3) {
      return keywordCounts
        .map((kw) => kw.charAt(0).toUpperCase() + kw.slice(1))
        .join(", ");
    }

    const [first, second] = topKeywords;
    const others = total - 2;

    return `${capitalize(first)}, ${capitalize(second)}, and ${others} other${
      others > 1 ? "s" : ""
    }`;
  };

  return (
    <section className="saved-news">
      <div className="section-inner">
        <div className="saved-news__title-container">
          <h1 className="saved-news__title">Saved Articles</h1>

          <p className="saved-news__subtitle">
            {displayName}, you have {visibleArticles.length} saved article
            {visibleArticles.length !== 1 ? "s" : ""}
          </p>
          <p className="saved-news__keywords">
            <span className="saved-news__keywords-label">By keywords:</span>{" "}
            <span className="saved-news__keywords-values">
              {renderKeywordSummary()}
            </span>
          </p>
        </div>
        <div className="saved-news__grid">
          {savedArticles.map((article, index) => (
            <NewsCard
              key={article._id}
              title={article.title}
              description={article.text}
              date={article.date}
              source={article.source}
              keyword={article.keyword}
              image={article.image}
              url={article.link}
              isSaved={true}
              isSavedView={true}
              isLoggedIn={true}
              onSave={() => {
                if (!fadingCardIds.includes(article._id)) {
                  setFadingCardIds((prev) => [...prev, article._id]);
                  setTimeout(() => {
                    onDeleteArticle(article._id);
                  }, 600);
                }
              }}
              style={{ animationDelay: `${index * 0.25}s` }}
              extraClass={
                fadingCardIds.includes(article._id) ? "news-card--fade-out" : ""
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SavedNews;
