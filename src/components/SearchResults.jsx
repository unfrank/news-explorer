import React from "react";
import NewsCardList from "./NewsCardList";
import "./SearchResults.css";

function SearchResults({ articles, onShowMore }) {
  return (
    <section className="search-results">
      <h2 className="search-results__title">Search results</h2>
      <NewsCardList articles={articles} />
      <button className="search-results__button" onClick={onShowMore}>
        Show more
      </button>
    </section>
  );
}

export default SearchResults;
