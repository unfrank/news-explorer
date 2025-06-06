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

export default function Navigation({
  onSignInClick,
  onLogoutClick,
  isLoginOpen, // NEW PROP: true if the Login Modal (ModalWithForm) is currently visible
  onLoginClose, // NEW PROP: function to call when we want to close the Login Modal
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSignInOpen, setMobileSignInOpen] = useState(false);

  const isHome = location.pathname === "/";
  const isSaved = location.pathname === "/saved-news";

  // Whenever the window resizes above 625px, automatically close the dropdown if open.
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

  // Determine whether we should show the header's Close-(X) icon:
  // Show it if either the dropdown menu is open _or_ the Login Modal is open.
  const showHeaderClose = menuOpen || isLoginOpen;

  // Click handler for the header Close-(X) icon:
  // If the dropdown menu is open, we close it. Otherwise, if the Login Modal is open,
  // we call onLoginClose() to dismiss the Login Modal.
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
        {/* ─────────────────────────────────────────────────────────────────────
            ICON WRAPPER (still where the hamburger used to live).
            We will show exactly one of these three buttons at a time:
            • Light-hamburger  (only when on "/" and nothing else open)
            • Dark-hamburger   (only when on "/saved-news" and nothing else open)
            • Close-icon       (when either menuOpen or isLoginOpen is true)
          ───────────────────────────────────────────────────────────────────── */}
        <div className="icon-wrapper">
          {/* 1) Light-hamburger (show only if on “/” AND no dropdown or login is open) */}
          <button
            className={`navigation__hamburger ${
              !isHome || showHeaderClose ? "is-hidden" : ""
            }`}
            onClick={() => {
              // If the Login Modal happens to be open, do nothing special here—
              // the Close-icon would be visible instead, so this button is hidden anyway.
              setMenuOpen(true);
            }}
            aria-label="Open menu"
          >
            <img
              src={hamburgerLight}
              alt="Open menu"
              className="navigation__hamburger-icon"
            />
          </button>

          {/* 2) Dark-hamburger (show only if on "/saved-news" AND no dropdown/login is open) */}
          <button
            className={`navigation__hamburger ${
              !isSaved || showHeaderClose ? "is-hidden" : ""
            }`}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <img
              src={hamburgerDark}
              alt="Open menu"
              className="navigation__hamburger-icon"
            />
          </button>

          {/* 3) Close-icon (show if either the dropdown menu OR the login modal is open) */}
          <button
            className={`navigation__hamburger--close ${
              !showHeaderClose ? "is-hidden" : ""
            }`}
            onClick={handleHeaderClose}
            aria-label="Close"
          >
            <img src={closeIcon} alt="Close" />
          </button>
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

      {/* ─────────────────────────────────────────────────────────────────────
        DROPDOWN MENU: only rendered when menuOpen === true
        We have inserted a Close-icon in the dropdown's header, so the user
        can tap “X” inside the sliding panel itself.
      ───────────────────────────────────────────────────────────────────── */}
      {menuOpen && isHome && !isLoggedIn && (
        <div className="navigation__dropdown">
          <div className="navigation__dropdown-header">
            <h2 className="navigation__dropdown-logo">NewsExplorer</h2>
            {/* ─── NEW: Close-icon inside the dropdown header ─── */}
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
            {/* ─── NEW: Close-icon inside this dropdown’s header ─── */}
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
            {/* ─── NEW: Close-icon inside this dropdown’s header ─── */}
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
