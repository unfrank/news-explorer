import { useState, useRef, useEffect } from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import NewsResults from "../NewsResults/NewsResults";
import Preloader from "../Preloader/Preloader";
import NothingFound from "../NothingFound/NothingFound";

function Main({
  onSearch,
  articles,
  isLoading,
  hasSearched,
  fetchError,
  isLoggedIn,
  onSaveArticle,
  savedArticles,
}) {
  const [visibleCount, setVisibleCount] = useState(3);
  const resultsRef = useRef(null);
  const [lastVisibleIndex, setLastVisibleIndex] = useState(null);

  const handleShowMore = () => {
    setLastVisibleIndex(visibleCount + 1);
    setVisibleCount((prev) => prev + 3);
  };

  const handleSearch = (query) => {
    setVisibleCount(3);
    onSearch(query);
  };

  const handleSave = (article) => {
    if (isLoggedIn) {
      onSaveArticle(article);
    }
  };

  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("justSearched") === "true";

    if (
      shouldScroll &&
      !isLoading &&
      hasSearched &&
      articles.length > 0 &&
      resultsRef.current
    ) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
      sessionStorage.removeItem("justSearched");
    }
  }, [isLoading, hasSearched, articles]);

  return (
    <>
      <section className="main">
        <div className="main__overlay">
          <h1 className="main__title">What’s going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>

          <Preloader
            className={isLoading ? "preloader preloader--visible" : "preloader"}
          />

          <div className="main__form-wrapper">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {!isLoading && hasSearched && fetchError && (
        <div className="main__search-error">
          <h3>Something went wrong</h3>
          <p>Please try again later.</p>
        </div>
      )}

      {!isLoading && hasSearched && !fetchError && articles.length === 0 && (
        <NothingFound />
      )}

      {!isLoading && hasSearched && articles.length > 0 && (
        <div ref={resultsRef}>
          <NewsResults
            articles={articles}
            visibleCount={visibleCount}
            onShowMore={handleShowMore}
            lastVisibleIndex={lastVisibleIndex}
            onSaveArticle={handleSave}
            savedArticles={savedArticles}
            isLoggedIn={isLoggedIn}
          />
        </div>
      )}
    </>
  );
}

export default Main;
