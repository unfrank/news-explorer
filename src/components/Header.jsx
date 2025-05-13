import React from "react";
import Navigation from "./Navigation";
import "./Header.css";

function Header({ onSignInClick }) {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">NewsExplorer</div>
        <Navigation onSignInClick={onSignInClick} />
      </div>
    </header>
  );
}

export default Header;
