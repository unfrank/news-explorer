import React from "react";
import "./Preloader.css";

function Preloader() {
  return (
    <section className="preloader">
      <div className="preloader__spinner circle-preloader"></div>
      {/* <p className="preloader__text">Searching for news...</p> */}
    </section>
  );
}

export default Preloader;
