import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a keyword");
      return;
    }
    setError("");
    onSearch(query.trim());
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          className="search-form__input"
          type="text"
          placeholder="Enter topic"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button className="search-form__button" type="submit">
          Search
        </button>
      </div>
      {error && <p className="search-form__error">{error}</p>}
    </form>
  );
}

export default SearchForm;
