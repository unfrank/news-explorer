import React from "react";
import SearchCard from "./SearchCard";

function SearchResults({ articles, visibleCount, onShowMore }) {
  const isShowMoreVisible = articles.length > visibleCount;

  return (
    <section className="results">
      {articles.slice(0, visibleCount).map((article, index) => (
        <SearchCard key={index} article={article} />
      ))}
      {isShowMoreVisible && (
        <button className="results__button" onClick={onShowMore}>
          Show more
        </button>
      )}
    </section>
  );
}

export default SearchResults;

//redo
// function SearchResults({ articles, visibleCount, onShowMore }) {
//   const shownArticles = articles.slice(0, visibleCount);
//   const isShowMoreVisible = visibleCount < articles.length;

//   return (
//     <section className="results">
//       {shownArticles.map((article, index) => (
//         <SearchCard key={index} article={article} />
//       ))}
//       {isShowMoreVisible && (
//         <button className="results__button" onClick={onShowMore}>
//           Show more
//         </button>
//       )}
//     </section>
//   );
// }
// export default SearchResults;
