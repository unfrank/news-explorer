import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";
import { useContext, useState, useMemo, useRef } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SavedNews({ savedArticles, onDeleteArticle }) {
  const { currentUser } = useContext(CurrentUserContext);
  const displayName =
    currentUser?.username?.charAt(0).toUpperCase() +
      currentUser?.username?.slice(1) || "You";

  const [fadingCardIds, setFadingCardIds] = useState([]);
  const cardRefs = useRef([]);

  const visibleArticles = savedArticles;

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
      <div className="saved-news__title-container">
        <div className="app__layout-container">
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
      </div>

      <div className="app__layout-container">
        <div className="saved-news__grid">
          {visibleArticles.map((article, index) => {
            const isFading = fadingCardIds.includes(article._id);

            if (isFading) {
              return (
                <NewsCard
                  key={article._id} // use stable key
                  title={article.title}
                  description={article.text}
                  date={article.date}
                  source={article.source}
                  keyword={article.keyword}
                  image={article.image}
                  url={article.link}
                  isSaved={false}
                  isSavedView={true}
                  isLoggedIn={true}
                  onSave={() => {}}
                  onRemove={() => onDeleteArticle(article._id)}
                  style={{ animationDelay: `${index * 0.25}s` }}
                  shouldFadeOut={isFading}
                />
              );
            }

            return (
              <NewsCard
                key={`${article.url}-${index}`}
                ref={(el) => (cardRefs.current[index] = el)}
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
                onSave={() =>
                  setFadingCardIds((prev) => [...prev, article._id])
                }
                onRemove={() => onDeleteArticle(article._id)}
                style={{ animationDelay: `${index * 0.25}s` }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SavedNews;
