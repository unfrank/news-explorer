import "./NewsResults.css";
import React, { useRef } from "react";
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
  const bottomRef = useRef(null);

  const handleShowMoreClick = () => {
    onShowMore();
    setTimeout(() => {
      if (bottomRef.current) {
        const y =
          bottomRef.current.getBoundingClientRect().bottom +
          window.scrollY -
          window.innerHeight +
          60;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <section className="news-results">
      <div className="layout__container">
        <NewsCardList
          articles={articles.slice(0, visibleCount)}
          onCardClick={onCardClick}
          scrollToIndex={lastVisibleIndex}
          onSaveArticle={onSaveArticle}
          savedArticles={savedArticles}
          isLoggedIn={isLoggedIn}
        />
        {isShowMoreVisible && (
          <button
            className="news-results__button"
            onClick={handleShowMoreClick}
          >
            Show more
          </button>
        )}
      </div>
      <div ref={bottomRef} />
    </section>
  );
}

export default NewsResults;
