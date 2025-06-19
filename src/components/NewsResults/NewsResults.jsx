import "./NewsResults.css";

import NewsCardList from "../NewsCardList/NewsCardList";

function NewsResults({
  articles,
  visibleCount,
  onShowMore,
  onCardClick,
  onSaveArticle,
  savedArticles,
  isLoggedIn,
}) {
  const isShowMoreVisible = articles.length > visibleCount;

  const handleShowMoreClick = () => {
    onShowMore();
  };

  return (
    <section className="news-results">
      <div className="layout-container">
        <NewsCardList
          articles={articles.slice(0, visibleCount)}
          onCardClick={onCardClick}
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
    </section>
  );
}

export default NewsResults;
