// File: src/components/Header.jsx

import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import MobileMenuSignIn from "./MobileMenuSignIn";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Link, useLocation } from "react-router-dom";

import closeIcon from "../assets/icons/icon-btn-close.svg";
import hamburgerLight from "../assets/icons/icon-hamburger-light.svg";
import logoutIconDark from "../assets/icons/icon-logout-dark.svg";
import logoutIconLight from "../assets/icons/icon-logout-light.svg";

export default function Header({ handleLogout }) {
  const { currentUser, isLoggedIn, handleLogin } =
    useContext(CurrentUserContext);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isSaved = location.pathname === "/saved-news";

  // Animate logo & nav when login state changes
  const [logoAnimate, setLogoAnimate] = useState(false);
  const [animateNav, setAnimateNav] = useState(false);

  // Mobile menu / mobile sign-in state
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSignInOpen, setMobileSignInOpen] = useState(false);

  // Trigger animations when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      setLogoAnimate(true);
      setAnimateNav(true);
      const timeoutLogo = setTimeout(() => setLogoAnimate(false), 1500);
      const timeoutNav = setTimeout(() => setAnimateNav(false), 1500);
      return () => {
        clearTimeout(timeoutLogo);
        clearTimeout(timeoutNav);
      };
    }
  }, [isLoggedIn]);

  // Close mobile menus on window resize ≥ 646px
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 646) {
        setMenuOpen(false);
        setMobileSignInOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clicking the desktop “Sign in” button simply opens the mobile form
  function handleSignInClick() {
    setMobileSignInOpen(true);
  }
  function handleMobileSignInClose() {
    setMobileSignInOpen(false);
  }

  return (
    <header
      className={`header ${isHome ? "header--transparent" : "header--solid"}`}
    >
      <div className="section-inner">
        <div className="header__container">
          {/* ───────────────────────────────────────────────────────────── 
              Logo on the left (with an animation when logging in)
          ───────────────────────────────────────────────────────────── */}
          <div
            className={`header__logo ${
              logoAnimate ? "header__logo--animate" : ""
            }`}
          >
            NewsExplorer
          </div>

          {/* ───────────────────────────────────────────────────────────── 
              HAMBURGER / CLOSE ICON (mobile only when on Home & not logged in)
          ───────────────────────────────────────────────────────────── */}
          {isHome && !isLoggedIn && (
            <>
              {menuOpen && !mobileSignInOpen && (
                <img
                  src={closeIcon}
                  alt="Close Menu"
                  className="navigation__hamburger"
                  onClick={() => setMenuOpen(false)}
                />
              )}
              {!menuOpen && !mobileSignInOpen && (
                <img
                  src={hamburgerLight}
                  alt="Menu"
                  className="navigation__hamburger"
                  onClick={() => setMenuOpen(true)}
                />
              )}
              {mobileSignInOpen && (
                <img
                  src={closeIcon}
                  alt="Close Modal"
                  className="navigation__hamburger"
                  onClick={handleMobileSignInClose}
                />
              )}
            </>
          )}

          {/* ───────────────────────────────────────────────────────────── 
              NAVIGATION LINKS (desktop & tablet)
          ───────────────────────────────────────────────────────────── */}
          <nav
            className={`navigation ${animateNav ? "navigation--animate" : ""}`}
          >
            <div className="navigation__links">
              <Link
                to="/"
                className={`navigation__link-home ${
                  isHome
                    ? "navigation__link--active navigation__link--white"
                    : ""
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
                <button
                  className="navigation__button"
                  onClick={handleSignInClick}
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
                  onClick={handleLogout}
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
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── 
          MOBILE MENU DROPDOWN (only when “hamburger” is clicked on Home)
      ───────────────────────────────────────────────────────────── */}
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

      {/* ───────────────────────────────────────────────────────────── 
          MOBILE SIGN-IN MODAL (slides up from below header)
      ───────────────────────────────────────────────────────────── */}
      <MobileMenuSignIn
        isOpen={mobileSignInOpen}
        onClose={handleMobileSignInClose}
      />
    </header>
  );
}
