import React, { forwardRef } from "react";
import NewsCardList from "./NewsCardList";
import "./SearchResults.css";

const SearchResults = forwardRef(({ articles, onShowMore }, ref) => {
  return (
    <section className="search-results" ref={ref}>
      <h2 className="search-results__title">Search results</h2>
      <NewsCardList articles={articles} />
      <button className="search-results__button" onClick={onShowMore}>
        Show more
      </button>
    </section>
  );
});

export default SearchResults;
