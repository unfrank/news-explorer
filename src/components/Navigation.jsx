import React, { useContext, useEffect, useState } from "react";
import "./Navigation.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Link, useLocation } from "react-router-dom";

import logoutIconDark from "../assets/icons/icon-logout-dark.svg";
import logoutIconLight from "../assets/icons/icon-logout-light.svg";

export default function Navigation({ onSignInClick, onLogoutClick }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const location = useLocation();
  const [animate, setAnimate] = useState(false);

  const isHome = location.pathname === "/";
  const isSaved = location.pathname === "/saved-news";

  // Animate navigation links when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn]);

  return (
    <nav className={`navigation ${animate ? "navigation--animate" : ""}`}>
      <div className="navigation__links">
        <Link
          to="/"
          className={`navigation__link-home ${
            isHome ? "navigation__link--active navigation__link--white" : ""
          }`}
        >
          Home
        </Link>

        {isLoggedIn && (
          <Link
            to="/saved-news"
            className={`navigation__link-saved ${
              isSaved ? "navigation__link--active navigation__link--black" : ""
            }`}
          >
            Saved Articles
          </Link>
        )}

        {!isLoggedIn ? (
          <button
            className="navigation__button"
            onClick={() => {
              console.log("Navigation button clicked"); // ← debug log
              onSignInClick();
            }}
          >
            Sign in
          </button>
        ) : (
          <button
            className={`navigation__button navigation__button--logout ${
              isHome
                ? "navigation__button--logout-white"
                : "navigation__button--logout-black"
            }`}
            onClick={onLogoutClick}
          >
            <span className="navigation__username">
              {currentUser?.username
                ? currentUser.username.charAt(0).toUpperCase() +
                  currentUser.username.slice(1)
                : ""}
            </span>
            <img
              src={isHome ? logoutIconLight : logoutIconDark}
              alt="Logout"
              className="navigation__logout-icon"
            />
          </button>
        )}
      </div>
    </nav>
  );
}
