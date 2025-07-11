import { useEffect, useRef } from "react";

import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  articles,
  onCardClick,
  scrollToIndex,
  onSaveArticle,
  savedArticles,
  isLoggedIn,
}) {
  const cardRefs = useRef([]);

  useEffect(() => {
    if (scrollToIndex != null && cardRefs.current[scrollToIndex]) {
      const targetCard = cardRefs.current[scrollToIndex];
      const yOffset = -24;
      const y =
        targetCard.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [scrollToIndex]);

  return (
    <section className="news-results__list">
      <h2 className="news-results__title">Search results</h2>
      <div className="news-results__grid">
        {articles.map((article, index) => (
          <NewsCard
            key={`${article.url}-${index}`}
            ref={(el) => (cardRefs.current[index] = el)}
            title={article.title}
            description={
              article.description && article.description.trim().length > 0
                ? article.description
                : article.content || "No description available."
            }
            date={new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            source={article.source.name}
            image={article.urlToImage}
            url={article.url}
            style={{ animationDelay: `${index * 0.22}s` }}
            onClick={() => onCardClick && onCardClick(article)}
            onSave={() => onSaveArticle(article)}
            isSaved={savedArticles.some((a) => a.link === article.url)}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </section>
  );
}

export default NewsCardList;
