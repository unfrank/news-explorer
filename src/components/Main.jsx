import "./Main.css";
import React from "react";
import SearchForm from "./SearchForm";
import NewsResults from "./NewsResults";
import Preloader from "./PreLoader";
import NothingFound from "./NothingFound";

function Main({
  onSearch,
  articles,
  isLoading,
  hasSearched,
  visibleCount,
  onShowMore,
  fetchError,
}) {
  return (
    <>
      <section className="main">
        <div className="main__overlay">
          <h1 className="main__title">What’s going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>

          <div className="main__form-wrapper">
            <SearchForm onSearch={onSearch} />
            {isLoading && <Preloader />}
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
        <NewsResults
          articles={articles}
          visibleCount={visibleCount}
          onShowMore={onShowMore}
        />
      )}
    </>
  );
}

export default Main;
