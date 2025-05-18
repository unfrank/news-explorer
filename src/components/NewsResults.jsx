// import "./NewsResults.css";
// import React from "react";
// import NewsCardList from "./NewsCardList";

// function NewsResults({ articles, visibleCount, onShowMore, onCardClick }) {
//   const isShowMoreVisible = articles.length > visibleCount;

//   return (
//     <section className="news-results">
//       <NewsCardList
//         articles={articles.slice(0, visibleCount)}
//         onCardClick={onCardClick}
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

// test
import React, { useRef, useEffect } from "react";
import "./NewsResults.css";
import NewsCardList from "./NewsCardList";

function NewsResults({ articles, visibleCount, onShowMore, onCardClick }) {
  const prevCountRef = useRef(0);

  useEffect(() => {
    prevCountRef.current = visibleCount;
  }, [visibleCount]);

  const isShowMoreVisible = articles.length > visibleCount;

  return (
    <section className="news-results">
      <NewsCardList
        articles={articles.slice(0, visibleCount)}
        onCardClick={onCardClick}
        prevCount={prevCountRef.current}
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

// test
