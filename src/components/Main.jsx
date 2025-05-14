import React from "react";
import "./Main.css";
import SearchForm from "./SearchForm";

function Main() {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  return (
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
  );
}

export default Main;
