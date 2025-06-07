// Navigation.jsx
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

import useMediaQuery from "../hooks/useMediaQuery";

export default function Navigation({
  onSignInClick,
  onLogoutClick,
  isLoginOpen,
  onLoginClose,
  isAnyModalOpen,
  onModalClose,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isSaved = location.pathname === "/saved-news";

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSignInOpen, setMobileSignInOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 500px)");

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

  function handleLogoutClick() {
    setMenuOpen(false);
    onLogoutClick();
  }

  function handleHeaderClose() {
    if (menuOpen) {
      setMenuOpen(false);
    } else if (isLoginOpen) {
      onLoginClose();
    }
  }

  return (
    <>
      <nav className="navigation">
        <div className="icon-wrapper">
          {!isAnyModalOpen && isHome && (
            <button
              className="navigation__hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <img
                src={hamburgerLight}
                alt="Open menu"
                className="navigation__hamburger-icon"
              />
            </button>
          )}

          {!isAnyModalOpen && isSaved && (
            <button
              className="navigation__hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <img
                src={hamburgerDark}
                alt="Open menu"
                className="navigation__hamburger-icon"
              />
            </button>
          )}

          {!isAnyModalOpen && menuOpen && (
            <button
              className="navigation__hamburger--close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <img src={closeIcon} alt="Close menu" />
            </button>
          )}

          {isAnyModalOpen && isMobile && (
            <button
              className="navigation__modal-close"
              onClick={onModalClose}
              aria-label="Close modal"
            >
              <img src={closeIcon} alt="Close modal" />
            </button>
          )}
        </div>

        <div className="navigation__links">
          {isSaved && (
            <Link
              to="/"
              className="navigation__link"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          )}

          {!isSaved && isLoggedIn && (
            <Link
              to="/saved-news"
              className="navigation__link"
              onClick={() => setMenuOpen(false)}
            >
              Saved Articles
            </Link>
          )}

          {!isLoggedIn ? (
            <button
              className="navigation__button-signin"
              onClick={() => {
                setMenuOpen(false);
                onSignInClick();
              }}
            >
              Sign In
            </button>
          ) : (
            <button
              className="navigation__button-logout"
              onClick={handleLogoutClick}
            >
              <span
                className={`navigation__username ${
                  isHome
                    ? "navigation__username--light"
                    : "navigation__username--dark"
                }`}
              >
                {displayName}
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

      {/* DROPDOWN MENUS (mobile) */}
      {menuOpen && isHome && !isLoggedIn && (
        <div className="navigation__dropdown">
          <div className="navigation__dropdown-header">
            <h2 className="navigation__dropdown-logo">NewsExplorer</h2>
            <button
              className="navigation__dropdown-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <img src={closeIcon} alt="Close menu" />
            </button>
          </div>
          <hr className="navigation__dropdown-divider" />
          <div className="navigation__dropdown-item">Home</div>
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
              className="navigation__dropdown-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <img src={closeIcon} alt="Close menu" />
            </button>
          </div>
          <hr className="navigation__dropdown-divider" />
          <div className="navigation__dropdown-item">Home</div>
          <Link
            to="/saved-news"
            className="navigation__dropdown-item navigation__dropdown-link"
            onClick={() => setMenuOpen(false)}
          >
            Saved Articles
          </Link>
          <button
            className="navigation__button navigation__button--dropdown"
            onClick={handleLogoutClick}
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
              className="navigation__dropdown-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <img src={closeIcon} alt="Close menu" />
            </button>
          </div>
          <hr className="navigation__dropdown-divider" />
          <div className="navigation__dropdown-item">Saved Articles</div>
          <Link
            to="/"
            className="navigation__dropdown-item navigation__dropdown-link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <button
            className="navigation__button navigation__button--dropdown"
            onClick={handleLogoutClick}
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
