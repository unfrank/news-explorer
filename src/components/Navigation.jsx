import React, { useContext } from "react";
import "./Navigation.css";
import logoutIcon from "../assets/icons/icon-logout.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Navigation({ onSignInClick, onLogoutClick }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  return (
    <nav className="navigation">
      <a href="/" className="navigation__link">
        Home
      </a>

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
