import React from "react";
import "./Main.css";

function Main() {
  return (
    <section className="main">
      <div className="main__overlay">
        <h1 className="main__title">What’s going on in the world?</h1>
        <p className="main__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <form className="main__form">
          <input
            className="main__input"
            type="text"
            placeholder="Enter topic"
            required
          />
          <button className="main__button">Search</button>
        </form>
      </div>
    </section>
  );
}

export default Main;
