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
    if (isLoggedIn) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 646) {
        setMenuOpen(false);
        setMobileSignInOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen, mobileSignInOpen]);

  return (
    <>
      <nav className={`navigation ${animate ? "navigation--animate" : ""}`}>
        <div className="navigation__icon-container">
          {isHome && !isLoggedIn && menuOpen && !mobileSignInOpen && (
            <img
              src={closeIcon}
              alt="Close Menu"
              className="navigation__hamburger"
              onClick={() => setMenuOpen(false)}
            />
          )}
          {isHome && !isLoggedIn && mobileSignInOpen && (
            <img
              src={closeIcon}
              alt="Close Modal"
              className="navigation__hamburger"
              onClick={() => setMobileSignInOpen(false)}
            />
          )}

          {isHome && !isLoggedIn && !menuOpen && !mobileSignInOpen && (
            <img
              src={hamburgerLight}
              alt="Menu"
              className="navigation__hamburger"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>

        {menuOpen && isHome && !isLoggedIn && (
          <div className="navigation__dropdown">
            <div className="navigation__dropdown-header">
              <h2 className="header__logo">NewsExplorer</h2>
            </div>

            <hr className="navigation__dropdown-divider" />

            <div className="navigation__dropdown-item">Home</div>

            <button
              className="navigation__button navigation__button--dropdown"
              onClick={() => {
                setMobileSignInOpen(true);
                setMenuOpen(false);
              }}
            >
              Sign in
            </button>
          </div>
        )}

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
                isSaved
                  ? "navigation__link--active navigation__link--black"
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
              className={`navigation__button navigation__button--logout ${
                isHome
                  ? "navigation__button--logout-white"
                  : "navigation__button--logout-black"
              }`}
              onClick={onLogoutClick}
            >
              <span className="navigation__username">
                {typeof currentUser?.username === "string" &&
                currentUser.username.length > 0
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

      <MobileMenuSignIn
        isOpen={mobileSignInOpen}
        onClose={() => setMobileSignInOpen(false)}
      />
    </>
  );
}
