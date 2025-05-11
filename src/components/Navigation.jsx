import React from "react";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <a href="/" className="navigation__link">
        Home
      </a>
      <a href="/saved-news" className="navigation__link">
        Saved Articles
      </a>
      <button className="navigation__auth">Sign in</button>
    </nav>
  );
}

export default Navigation;
