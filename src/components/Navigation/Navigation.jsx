import React, { useContext, useEffect, useState } from "react";
import "./Navigation.css";
import MobileMenuSignIn from "../MobileMenuSignIn/MobileMenuSignIn";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link, useLocation } from "react-router-dom";

import logoutIconDark from "../../assets/icons/icon-logout-dark.svg";
import logoutIconLight from "../../assets/icons/icon-logout-light.svg";
import closeIcon from "../../assets/icons/icon-btn-close.svg";
import hamburgerDark from "../../assets/icons/icon-hamburger-dark.svg";
import hamburgerLight from "../../assets/icons/icon-hamburger-light.svg";

export default function Navigation({
  onSignInClick,
  onLogoutClick,
  isLoginOpen,
  onLoginClose,
  isAnyModalOpen,
  onModalClose,
  animationTriggered,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isSaved = location.pathname === "/saved-news";

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSignInOpen, setMobileSignInOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 625 && menuOpen) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const isMobile = window.innerWidth <= 512;

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
          {isMobile && !isLoginOpen && !menuOpen && (
            <button
              className="navigation__hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <img
                src={isHome ? hamburgerLight : hamburgerDark}
                alt="Open menu"
                className="navigation__hamburger-icon"
              />
            </button>
          )}

          {isMobile && !isLoginOpen && menuOpen && (
            <button
              className="navigation__hamburger--close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <img src={closeIcon} alt="Close menu" />
            </button>
          )}

          {isMobile && isLoginOpen && (
            <button
              className="navigation__modal-close"
              onClick={onLoginClose}
              aria-label="Close modal"
            >
              <img src={closeIcon} alt="Close modal" />
            </button>
          )}
        </div>

        <div
          className={`navigation__links ${
            animationTriggered ? "navigation__links--animate" : ""
          }`}
        >
          <Link
            to="/"
            className={`navigation__link-home ${
              location.pathname === "/" ? "navigation__link--active" : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/saved-news"
                className={`navigation__link-saved ${
                  location.pathname === "/saved-news"
                    ? "navigation__link--active"
                    : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Saved Articles
              </Link>

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
            </>
          )}

          {!isLoggedIn && (
            <button
              className="navigation__button-signin"
              onClick={() => {
                setMenuOpen(false);
                onSignInClick();
              }}
            >
              Sign In
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
