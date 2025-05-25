import React, { useContext, useEffect, useState } from "react";
import "./Navigation.css";
import logoutIcon from "../assets/icons/icon-logout.svg";
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
          <span className="navigation__username">{currentUser?.email}</span>
          <img
            src={logoutIcon}
            alt="Logout"
            className="navigation__logout-icon"
          />
        </button>
      )}
    </nav>
  );
}

export default Navigation;
