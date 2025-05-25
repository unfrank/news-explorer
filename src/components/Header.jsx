import React, { useContext, useEffect, useState } from "react";
import Navigation from "./Navigation";
import "./Header.css";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Header({ onSignInClick, setActiveModal, handleLogout }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const [logoAnimate, setLogoAnimate] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setLogoAnimate(true);
      const timeout = setTimeout(() => setLogoAnimate(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn]);

  return (
    <header className="header">
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
