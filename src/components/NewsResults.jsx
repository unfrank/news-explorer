import "./NewsResults.css";
import React from "react";
import NewsCardList from "./NewsCardList";

function NewsResults({
  articles,
  visibleCount,
  onShowMore,
  onCardClick,
  lastVisibleIndex,
  onSaveArticle,
  onDeleteArticle,
  savedArticles,
  isLoggedIn,
}) {
  const isShowMoreVisible = articles.length > visibleCount;

  return (
    <section className="news-results">
      <NewsCardList
        articles={articles.slice(0, visibleCount)}
        onCardClick={onCardClick}
        scrollToIndex={lastVisibleIndex}
        onSaveArticle={onSaveArticle}
        savedArticles={savedArticles}
        isLoggedIn={isLoggedIn} // ✅ Pass it forward
      />
      {isShowMoreVisible && (
        <button className="news-results__button" onClick={onShowMore}>
          Show more
        </button>
      )}
    </section>
  );
}

export default NewsResults;
