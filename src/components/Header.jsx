import React from "react";
import Navigation from "./Navigation";
import "./Header.css";

function Header() {
  return (
    // <header className="header">
    //   <div className="header__container">
    //     <div className="header__logo">NewsExplorer</div>
    //     <Navigation />
    //   </div>
    // </header>
    <header className="header">
      <div className="header__container">
        <div className="header__logo">NewsExplorer</div>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
