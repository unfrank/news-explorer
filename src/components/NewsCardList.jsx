import React, { useEffect, useRef } from "react";
import NewsCard from "./NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  onCardClick,
  scrollToIndex,
  onSaveArticle,
  savedArticles,
  isLoggedIn,
}) {
  const cardRefs = useRef([]);

  setTimeout(() => {
    const targetCard = cardRefs.current[scrollToIndex];
    if (targetCard) {
      const yOffset = -24;
      const y =
        targetCard.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, 1000);

  const handleSave = (article) => {
    if (isLoggedIn) {
      onSaveArticle(article);
    }
  };

  return (
    <section className="news-results__list">
      <h2 className="news-results__title">Search results</h2>
      <div className="news-results__grid">
        {articles.map((article, index) => (
          <NewsCard
            key={`${article.url}-${index}`}
            ref={(el) => (cardRefs.current[index] = el)}
            title={article.title}
            description={article.description}
            date={new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            source={article.source.name}
            image={article.urlToImage}
            url={article.url}
            style={{ animationDelay: `${index * 0.33}s` }}
            onClick={() => onCardClick && onCardClick(article)}
            onSave={() => handleSave(article)}
            isSaved={savedArticles.some((a) => a.url === article.url)}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </section>
  );
}

export default NewsCardList;
