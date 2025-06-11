import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Navigation from "./Navigation";
import "./Header.css";

export default function Header({
  isLoggedIn,
  handleLogout,
  setActiveModal,
  activeModal,
}) {
  const [logoAnimate, setLogoAnimate] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (isLoggedIn) {
      setLogoAnimate(true);
      const animateIn = setTimeout(() => {
        setAnimationTriggered(true);
      }, 50);
      const resetLogo = setTimeout(() => {
        setLogoAnimate(false);
      }, 1500);

      return () => {
        clearTimeout(animateIn);
        clearTimeout(resetLogo);
      };
    } else {
      setAnimationTriggered(false);
      setLogoAnimate(false);
    }
  }, [isLoggedIn]);

  return (
    <header
      className={`header ${isHome ? "header--transparent" : "header--solid"}`}
    >
      <div className="layout__container">
        <div className="header__container">
          <div
            className={`header__logo ${
              logoAnimate ? "header__logo--animate" : ""
            }`}
          >
            NewsExplorer
          </div>

          <Navigation
            onSignInClick={() => setActiveModal("login")}
            onSignUpClick={() => setActiveModal("register")}
            onLogoutClick={handleLogout}
            isAnyModalOpen={activeModal !== ""}
            onModalClose={() => setActiveModal("")}
            animationTriggered={animationTriggered}
          />
        </div>
      </div>
    </header>
  );
}
