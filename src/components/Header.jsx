import React, { useContext, useEffect, useState } from "react";
import Navigation from "./Navigation";
import "./Header.css";

import CurrentUserContext from "../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";

import closeIcon from "../assets/icons/icon-btn-close.svg";
import hamburgerLight from "../assets/icons/icon-hamburger-light.svg";

// Desktop “LoginModal” and mobile slide‐up “MobileMenuSignIn”
import LoginModal from "./LoginModal";
import MobileMenuSignIn from "./MobileMenuSignIn";

export default function Header({ handleLogout }) {
  const { currentUser, isLoggedIn, handleLogin } =
    useContext(CurrentUserContext);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Logo animation when logging in
  const [logoAnimate, setLogoAnimate] = useState(false);

  // Mobile dropdown state
  const [menuOpen, setMenuOpen] = useState(false);

  // Desktop LoginModal state
  const [desktopLoginOpen, setDesktopLoginOpen] = useState(false);

  // Mobile sign‐in slide‐up form state
  const [mobileSignInOpen, setMobileSignInOpen] = useState(false);

  // Trigger logo animation when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      setLogoAnimate(true);
      const t = setTimeout(() => setLogoAnimate(false), 1500);
      return () => clearTimeout(t);
    }
  }, [isLoggedIn]);

  // Automatically close dropdown or mobile form on viewport ≥ 646px
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 646) {
        setMenuOpen(false);
        setMobileSignInOpen(false);
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Open desktop LoginModal
  function openLoginModal() {
    setDesktopLoginOpen(true);
    setMenuOpen(false);
  }

  // Close desktop LoginModal
  function closeLoginModal() {
    setDesktopLoginOpen(false);
  }

  // Open mobile slide-up sign-in
  function openMobileSignIn() {
    setMobileSignInOpen(true);
    setMenuOpen(false);
  }

  // Close mobile slide-up sign-in
  function closeMobileSignIn() {
    setMobileSignInOpen(false);
  }

  return (
    <header
      className={`header ${isHome ? "header--transparent" : "header--solid"}`}
    >
      <div className="section-inner">
        <div className="header__container">
          {/* ─────────────────────────────────────────────────────── 
              1) LOGO (always on the left)
          ─────────────────────────────────────────────────────── */}
          <div
            className={`header__logo ${
              logoAnimate ? "header__logo--animate" : ""
            }`}
          >
            NewsExplorer
          </div>

          {/* ─────────────────────────────────────────────────────── 
              2) CONDITIONAL ICON (always in the same right‐slot):
                 a) If mobileSignInOpen → show “Close Modal”
                 b) Else if menuOpen       → show “Close Dropdown”
                 c) Else if isHome && !isLoggedIn → show “Hamburger”
                 d) Otherwise (logged in or not on home) → show nothing here
          ─────────────────────────────────────────────────────── */}
          <div className="header__icon-slot">
            {mobileSignInOpen ? (
              <img
                src={closeIcon}
                alt="Close Modal"
                className="navigation__hamburger"
                onClick={closeMobileSignIn}
              />
            ) : menuOpen ? (
              <img
                src={closeIcon}
                alt="Close Menu"
                className="navigation__hamburger"
                onClick={() => setMenuOpen(false)}
              />
            ) : isHome && !isLoggedIn ? (
              <img
                src={hamburgerLight}
                alt="Menu"
                className="navigation__hamburger"
                onClick={() => setMenuOpen(true)}
              />
            ) : null}
          </div>

          {/* ─────────────────────────────────────────────────────── 
              3) TOP‐LEVEL NAVIGATION LINKS (desktop/tablet)
                 (Home / Saved Articles / Sign in or Logout)
          ─────────────────────────────────────────────────────── */}
          <Navigation
            onSignInClick={openLoginModal}
            onLogoutClick={handleLogout}
          />
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────── 
          4) MOBILE MENU DROPDOWN (dark panel under header)
             Only if: isHome && !isLoggedIn && menuOpen===true
      ───────────────────────────────────────────────────────── */}
      {menuOpen && isHome && !isLoggedIn && (
        <div className="navigation__dropdown">
          <div className="navigation__dropdown-header">
            <h2 className="header__logo">NewsExplorer</h2>
          </div>
          <hr className="navigation__dropdown-divider" />

          <div className="navigation__dropdown-item">Home</div>

          {/* ─ The SIGN IN inside the dropdown now calls openMobileSignIn() ─ */}
          <button
            className="navigation__button navigation__button--dropdown"
            onClick={openMobileSignIn}
          >
            Sign in
          </button>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── 
          5) DESKTOP LoginModal (overlay) – shown when desktopLoginOpen===true
      ───────────────────────────────────────────────────────── */}
      {desktopLoginOpen && (
        <LoginModal
          onClose={closeLoginModal}
          onLoginSuccess={({ token, user }) => {
            handleLogin({ token, user });
            closeLoginModal();
          }}
        />
      )}

      {/* ───────────────────────────────────────────────────────── 
          6) MOBILE slide‐up Sign‐In (white panel) – shown when mobileSignInOpen===true
      ───────────────────────────────────────────────────────── */}
      {mobileSignInOpen && (
        <MobileMenuSignIn
          isOpen={mobileSignInOpen}
          onClose={closeMobileSignIn}
        />
      )}
    </header>
  );
}
