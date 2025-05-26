import React, { useContext, useEffect, useState } from "react";
import "./Navigation.css";
import logoutIconDark from "../assets/icons/icon-logout-dark.svg";
import logoutIconLight from "../assets/icons/icon-logout-light.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Link, useLocation } from "react-router-dom";

function Navigation({ onSignInClick, onLogoutClick }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const location = useLocation();

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn]);

  console.log("🟢 Navigation re-rendered. CurrentUser:", currentUser);

  return (
    <nav className={`navigation ${animate ? "navigation--animate" : ""}`}>
      <Link
        to="/"
        className={`navigation__link ${
          location.pathname === "/" ? "navigation__link--active" : ""
        }`}
      >
        Home
      </Link>

      {isLoggedIn && (
        <Link
          to="/saved-news"
          className={`navigation__link ${
            location.pathname === "/saved-news"
              ? "navigation__link--active"
              : ""
          }`}
        >
          Saved Articles
        </Link>
      )}

      {!isLoggedIn ? (
        <button className="navigation__button" onClick={onSignInClick}>
          Sign in
        </button>
      ) : (
        <button
          className="navigation__button navigation__button--logout"
          onClick={onLogoutClick}
        >
          <span className="navigation__username">{currentUser?.username}</span>
          <img
            src={logoutIconDark}
            alt="Logout"
            className="navigation__logout-icon"
          />
        </button>
      )}
    </nav>
  );
}

export default Navigation;
