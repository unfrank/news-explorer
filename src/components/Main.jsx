// import "./Main.css";
// import React from "react";
// import SearchForm from "./SearchForm";
// import NewsResults from "./NewsResults";
// import Preloader from "./PreLoader";
// import NothingFound from "./NothingFound";

// function Main({
//   onSearch,
//   articles,
//   isLoading,
//   hasSearched,
//   visibleCount,
//   onShowMore,
//   fetchError,
// }) {
//   return (
//     <>
//       <section className="main">
//         <div className="main__overlay">
//           <h1 className="main__title">What’s going on in the world?</h1>
//           <p className="main__subtitle">
//             Find the latest news on any topic and save them in your personal
//             account.
//           </p>

//           <div className="main__form-wrapper">
//             <SearchForm onSearch={onSearch} />
//             {isLoading && <Preloader />}
//           </div>
//         </div>
//       </section>

//       {!isLoading && hasSearched && fetchError && (
//         <div className="main__search-error">
//           <h3>Something went wrong</h3>
//           <p>Please try again later.</p>
//         </div>
//       )}
//       {!isLoading && hasSearched && !fetchError && articles.length === 0 && (
//         <NothingFound />
//       )}

//       {!isLoading && hasSearched && articles.length > 0 && (
//         <NewsResults
//           articles={articles}
//           visibleCount={visibleCount}
//           onShowMore={onShowMore}
//         />
//       )}
//     </>
//   );
// }

// export default Main;

//test

import React, { useRef, useEffect, useState } from "react";
import "./Main.css";
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
  const [hasShownMore, setHasShownMore] = useState(false);

  const resultsRef = useRef(null);
  useEffect(() => {
    if (
      !isLoading &&
      hasSearched &&
      articles.length > 0 &&
      resultsRef.current
    ) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });

      // Offset the scroll 30px up for aesthetics
      setTimeout(() => {
        window.scrollBy(0, -20);
      }, 500);
    }
  }, [articles, isLoading, hasSearched]);

  useEffect(() => {
    if (!isLoading && hasSearched && hasShownMore && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        window.scrollBy(0, -20);
      }, 500);

      setHasShownMore(false); // reset after scrolling
    }
  }, [hasShownMore, isLoading, hasSearched]);

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
        <div ref={resultsRef}>
          <NewsResults
            articles={articles}
            visibleCount={visibleCount}
            onShowMore={() => {
              setHasShownMore(true); // signal to scroll
              onShowMore(); // still increase the count
            }}
          />
        </div>
      )}
    </>
  );
}

export default Main;
