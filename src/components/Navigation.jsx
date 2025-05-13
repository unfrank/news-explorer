import React from "react";
import "./Navigation.css";

function Navigation({ onSignInClick }) {
  return (
    <nav className="navigation">
      <a href="/" className="navigation__link">
        Home
      </a>
      <button className="navigation__button" onClick={onSignInClick}>
        Sign in
      </button>
    </nav>
  );
}

export default Navigation;
