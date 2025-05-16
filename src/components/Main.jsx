import React, { useState, useRef, useEffect } from "react";
import "./Main.css";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import Preloader from "./PreLoader";

function Main() {
  const [hasSearched, setHasSearched] = useState(false);
  const [sampleArticles, setSampleArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // experimental
  const resultsRef = useRef(null);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    setIsLoading(true);
    setHasSearched(false);

    setTimeout(() => {
      const results = [
        {
          title: "Nature makes you better",
          description:
            "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.",
          date: "February 19, 2019",
          source: "NATIONAL GEOGRAPHIC",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&h=200&q=80",
        },
        {
          title: "A Special 'Sit Spot'",
          description:
            "This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find a place that they can return to routinely.",
          date: "November 4, 2020",
          source: "TREEHUGGER",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&h=200&q=80",
        },
        {
          title: "Grand Teton Renews Historic Crest Trail",
          description:
            "The linking together of the Cascade and Death Canyon trails marked the first step in the realization of a plan whereby the hiker will be able to...",
          date: "October 19, 2020",
          source: "NATIONAL PARKS TRAVELER",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&h=200&q=80",
        },
      ];

      setSampleArticles(results);
      setHasSearched(true);
      setIsLoading(false);

      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1200);
  };

  useEffect(() => {
    if (!isLoading && hasSearched && sampleArticles.length > 0) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoading, hasSearched, sampleArticles]);

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
            <SearchForm onSearch={handleSearch} />
            {isLoading && <Preloader />}
          </div>
        </div>
      </section>

      {!isLoading && hasSearched && sampleArticles.length > 0 && (
        <SearchResults
          ref={resultsRef}
          articles={sampleArticles}
          onShowMore={() => console.log("Show more clicked")}
        />
      )}
    </>
  );
}

export default Main;
