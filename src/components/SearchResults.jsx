import "./SearchResults.css";
import React from "react";
import NewsCardList from "./NewsCardList";

function SearchResults({ articles, visibleCount, onShowMore }) {
  const isShowMoreVisible = articles.length > visibleCount;

  return (
    <section className="results">
      <NewsCardList articles={articles.slice(0, visibleCount)} />
      {isShowMoreVisible && (
        <button className="results__button" onClick={onShowMore}>
          Show more
        </button>
      )}
    </section>
  );
}

export default SearchResults;
