import React from "react";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <a href="/" className="navigation__link">
        Home
      </a>

      <button className="navigation__button ">Sign in</button>
    </nav>
  );
}

export default Navigation;
