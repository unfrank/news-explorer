// import React, { useRef, useEffect } from "react";
// import "./NewsResults.css";
// import NewsCardList from "./NewsCardList";

// function NewsResults({ articles, visibleCount, onShowMore, onCardClick }) {
//   const prevCountRef = useRef(0);

//   useEffect(() => {
//     prevCountRef.current = visibleCount;
//   }, [visibleCount]);

//   const isShowMoreVisible = articles.length > visibleCount;

//   return (
//     <section className="news-results">
//       <NewsCardList
//         articles={articles.slice(0, visibleCount)}
//         onCardClick={onCardClick}
//         prevCount={prevCountRef.current}
//       />

//       {isShowMoreVisible && (
//         <button className="news-results__button" onClick={onShowMore}>
//           Show more
//         </button>
//       )}
//     </section>
//   );
// }

// export default NewsResults;

//test

// NewsResults.jsx

import "./NewsResults.css";
import React from "react";
import NewsCardList from "./NewsCardList";

function NewsResults({ articles, visibleCount, onShowMore, onCardClick }) {
  const isShowMoreVisible = articles.length > visibleCount;

  // Calculate the first card index of the newly added batch
  const scrollToIndex = visibleCount > 3 ? visibleCount - 3 : 0;

  return (
    <section className="news-results">
      <h2 className="news-results__title">Search results</h2>

      <NewsCardList
        articles={articles.slice(0, visibleCount)}
        onCardClick={onCardClick}
        scrollToIndex={scrollToIndex}
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
