import React, { useState, useRef } from "react";
import "./Main.css";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

function Main() {
  const [hasSearched, setHasSearched] = useState(false);
  const [sampleArticles, setSampleArticles] = useState([]);

  const handleSearch = (query) => {
    console.log("Searching for:", query);

    // TODO: do api
    const results = [
      {
        title: "Nature makes you better",
        description: "Green space improves focus and reduces stress.",
        date: "February 13, 2023",
        source: "National Geographic",
        image: "https://source.unsplash.com/featured/?nature",
      },
      {
        title: "Exploring the Wild",
        description: "Outdoor adventure trends are rising in 2025.",
        date: "March 10, 2025",
        source: "Outdoor World",
        image: "https://source.unsplash.com/featured/?forest",
      },
    ];

    setSampleArticles(results);
    setHasSearched(true);
  };

  return (
    <>
      <section className="main">
        <div className="main__overlay">
          <h1 className="main__title">What’s going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>

      {hasSearched && sampleArticles.length > 0 && (
        <SearchResults
          articles={sampleArticles}
          onShowMore={() => console.log("Show more clicked")}
        />
      )}
    </>
  );
}

export default Main;
