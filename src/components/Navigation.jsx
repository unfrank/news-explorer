import React, { useContext, useEffect, useState } from "react";
import "./Navigation.css";

import MobileMenuSignIn from "./MobileMenuSignIn";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Link, useLocation } from "react-router-dom";

import logoutIconDark from "../assets/icons/icon-logout-dark.svg";
import logoutIconLight from "../assets/icons/icon-logout-light.svg";
import closeIcon from "../assets/icons/icon-btn-close.svg";
import hamburgerDark from "../assets/icons/icon-hamburger-dark.svg";
import hamburgerLight from "../assets/icons/icon-hamburger-light.svg";

export default function Navigation({ onSignInClick, onLogoutClick }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const location = useLocation();

  const [animate, setAnimate] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSignInOpen, setMobileSignInOpen] = useState(false);

  const isHome = location.pathname === "/";
  const isSaved = location.pathname === "/saved-news";

  useEffect(() => {
    // (existing resize/animation logic here)
  }, [menuOpen]);

  function handleLogoutClick() {
    setMenuOpen(false);
    onLogoutClick();
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 625 && menuOpen) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const rawUsername = currentUser?.username || "";
  const displayName =
    rawUsername.length > 0
      ? rawUsername.charAt(0).toUpperCase() + rawUsername.slice(1)
      : "";

  return (
    <>
      <nav className={`navigation ${animate ? "navigation--animate" : ""}`}>
        <button
          className="navigation__hamburger"
          onClick={() => setMenuOpen(true)}
        >
          <img
            src={isHome ? hamburgerLight : hamburgerDark}
            alt="Menu"
            className="navigation__hamburger-icon"
          />
        </button>

        <div className="navigation__links">
          {isSaved && (
            <Link to="/" className="navigation__link">
              Home
            </Link>
          )}

          {!isSaved && isLoggedIn && (
            <Link to="/saved-news" className="navigation__link">
              Saved Articles
            </Link>
          )}

          {!isLoggedIn ? (
            <button
              className="navigation__button-signin"
              onClick={onSignInClick}
            >
              Sign In
            </button>
          ) : (
            <button
              className="navigation__button-logout"
              onClick={onLogoutClick}
            >
              <span className="navigation__username">{displayName}</span>
              <img
                src={isHome ? logoutIconLight : logoutIconDark}
                alt="Logout"
                className="navigation__logout-icon"
              />
            </button>
          )}
        </div>
      </nav>

      {/* Dropdown: three scenarios based on isHome, isSaved, and isLoggedIn */}
      {menuOpen && isHome && !isLoggedIn && (
        <div className="navigation__dropdown">
          <div className="navigation__dropdown-header">
            <h2 className="navigation__dropdown-logo">NewsExplorer</h2>
            <button
              className="navigation__hamburger--close"
              onClick={() => setMenuOpen(false)}
            >
              <img src={closeIcon} alt="Close Menu" />
            </button>
          </div>

          <hr className="navigation__dropdown-divider" />

          {/* Home title (static text) */}
          <div className="navigation__dropdown-item">Home</div>

          {/* Sign In button */}
          <button
            className="navigation__button navigation__button--dropdown"
            onClick={() => {
              setMenuOpen(false);
              onSignInClick();
            }}
          >
            Sign In
          </button>
        </div>
      )}

      {menuOpen && isHome && isLoggedIn && (
        <div className="navigation__dropdown">
          <div className="navigation__dropdown-header">
            <h2 className="navigation__dropdown-logo">NewsExplorer</h2>
            <button
              className="navigation__hamburger--close"
              onClick={() => setMenuOpen(false)}
            >
              <img src={closeIcon} alt="Close Menu" />
            </button>
          </div>

          <hr className="navigation__dropdown-divider" />

          {/* Home title (static text) */}
          <div className="navigation__dropdown-item">Home</div>

          {/* Link to Saved Articles */}
          <Link
            to="/saved-news"
            className="navigation__dropdown-item navigation__dropdown-link"
            onClick={() => setMenuOpen(false)}
          >
            Saved Articles
          </Link>

          {/* Sign Out button */}
          <button
            className="navigation__button navigation__button--dropdown"
            onClick={() => {
              setMenuOpen(false);
              onLogoutClick();
            }}
          >
            Sign Out
          </button>
        </div>
      )}

      {menuOpen && isSaved && isLoggedIn && (
        <div className="navigation__dropdown">
          <div className="navigation__dropdown-header">
            <h2 className="navigation__dropdown-logo">NewsExplorer</h2>
            <button
              className="navigation__hamburger--close"
              onClick={() => setMenuOpen(false)}
            >
              <img src={closeIcon} alt="Close Menu" />
            </button>
          </div>

          <hr className="navigation__dropdown-divider" />

          {/* Saved Articles title (static text) */}
          <div className="navigation__dropdown-item">Saved Articles</div>

          {/* Link to Home */}
          <Link
            to="/"
            className="navigation__dropdown-item navigation__dropdown-link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {/* Sign Out button */}
          <button
            className="navigation__button navigation__button--dropdown"
            onClick={() => {
              setMenuOpen(false);
              onLogoutClick();
            }}
          >
            Sign Out
          </button>
        </div>
      )}

      <MobileMenuSignIn
        isOpen={mobileSignInOpen}
        onClose={() => setMobileSignInOpen(false)}
      />
    </>
  );
}
