import "./Main.css";
import React from "react";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import Preloader from "./PreLoader";

function Main({
  onSearch,
  articles,
  isLoading,
  hasSearched,
  visibleCount,
  onShowMore,
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

      {!isLoading && hasSearched && articles.length > 0 && (
        <SearchResults
          articles={articles}
          visibleCount={visibleCount}
          onShowMore={onShowMore}
        />
      )}
    </>
  );
}

export default Main;
