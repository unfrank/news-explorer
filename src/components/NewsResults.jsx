import "./NewsResults.css";
import React from "react";
import NewsCardList from "./NewsCardList";

function NewsResults({
  articles,
  visibleCount,
  onShowMore,
  onCardClick,
  lastVisibleIndex,
}) {
  const isShowMoreVisible = articles.length > visibleCount;

  return (
    <section className="news-results">
      <NewsCardList
        articles={articles.slice(0, visibleCount)}
        onCardClick={onCardClick}
        scrollToIndex={lastVisibleIndex} // 🆕
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
