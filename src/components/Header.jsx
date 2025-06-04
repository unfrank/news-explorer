import React, { useContext, useEffect, useState } from "react";
import Navigation from "./Navigation";
import "./Header.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";
import hamburgerDark from "../assets/icons/icon-hamburger-dark.svg";
import hamburgerLight from "../assets/icons/icon-hamburger-light.svg";

function Header({ onSignInClick, setActiveModal, handleLogout }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const [logoAnimate, setLogoAnimate] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    if (isLoggedIn) {
      setLogoAnimate(true);
      const timeout = setTimeout(() => setLogoAnimate(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn]);

  return (
    <header
      className={`header ${isHome ? "header--transparent" : "header--solid"}`}
    >
      <div className="section-inner">
        <div className="header__container">
          <div
            className={`header__logo ${
              logoAnimate ? "header__logo--animate" : ""
            }`}
          >
            NewsExplorer
          </div>

          <Navigation
            isLoggedIn={isLoggedIn}
            userEmail={currentUser?.email}
            onSignInClick={() => setActiveModal("login")}
            onLogoutClick={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;

// !! HAMBURGER!!
