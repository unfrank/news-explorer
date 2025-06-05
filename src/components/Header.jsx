// File: src/components/Header.jsx

import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Navigation from "./Navigation";
import LoginModal from "./LoginModal";
import MobileMenuSignIn from "./MobileMenuSignIn";

import CurrentUserContext from "../contexts/CurrentUserContext";

import "./Header.css";

import closeIcon from "../assets/icons/icon-btn-close.svg";
import hamburgerLight from "../assets/icons/icon-hamburger-light.svg";

export default function Header({
  isHome,
  isLoggedIn,
  currentUser,
  handleLogout,
  setActiveModal,
}) {
  // Grab handleLogin from context so we can call it after desktop sign-in:
  const { handleLogin } = useContext(CurrentUserContext);

  // Local UI state:
  const [logoAnimate, setLogoAnimate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopLoginOpen, setDesktopLoginOpen] = useState(false);
  const [mobileSignInOpen, setMobileSignInOpen] = useState(false);

  // Animate logo when user logs in:
  useEffect(() => {
    if (isLoggedIn) {
      setLogoAnimate(true);
      const t = setTimeout(() => setLogoAnimate(false), 1500);
      return () => clearTimeout(t);
    }
  }, [isLoggedIn]);

  // Close dropdown / mobile form if the screen becomes ≥ 646px wide
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

  // ────────────────────────────────────────────────────────────────────────────
  // 1) HANDLERS
  // ────────────────────────────────────────────────────────────────────────────

  // Open the desktop “Sign In” modal
  function openLoginModal() {
    setDesktopLoginOpen(true);
    setMenuOpen(false);
  }

  // Close the desktop modal
  function closeLoginModal() {
    setDesktopLoginOpen(false);
  }

  // When desktop login succeeds, call context’s handleLogin() + close modal
  function onDesktopLoginSuccess({ token, user }) {
    handleLogin({ token, user });
    closeLoginModal();
  }

  // Open the mobile slide-up sign-in panel
  function openMobileSignIn() {
    setMobileSignInOpen(true);
    setMenuOpen(false);
  }

  // Close the mobile slide-up panel
  function closeMobileSignIn() {
    setMobileSignInOpen(false);
  }

  // ────────────────────────────────────────────────────────────────────────────
  // 2) RENDER
  // ────────────────────────────────────────────────────────────────────────────
  return (
    <header
      className={`header ${isHome ? "header--transparent" : "header--solid"}`}
    >
      <div className="section-inner">
        <div className="header__container">
          {/* ─────────────── 1) LOGO ────────────────────── */}
          <div
            className={`header__logo ${
              logoAnimate ? "header__logo--animate" : ""
            }`}
          >
            NewsExplorer
          </div>

          {/* ─────────────── 2) ICON SLOT (far right) ────────────────────── */}
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

          {/* ─────────────── 3) DESKTOP NAV LINKS ────────────────────── */}
          <Navigation
            onSignInClick={openLoginModal}
            onLogoutClick={handleLogout}
          />
        </div>
      </div>

      {/* ─────────────── 4) MOBILE DROPDOWN PANEL (below header) ────────────────────── */}
      {menuOpen && isHome && !isLoggedIn && (
        <div className="navigation__dropdown">
          <div className="navigation__dropdown-header">
            <h2 className="header__logo">NewsExplorer</h2>
          </div>
          <hr className="navigation__dropdown-divider" />

          <div className="navigation__dropdown-item">Home</div>

          {/* Clicking this “Sign in” opens the mobile slide-up form */}
          <button
            className="navigation__button navigation__button--dropdown"
            onClick={openMobileSignIn}
          >
            Sign in
          </button>
        </div>
      )}

      {/* ─────────────── 5) DESKTOP LoginModal (overlay) ────────────────────── */}
      {desktopLoginOpen && (
        <LoginModal
          isOpen={desktopLoginOpen}
          onClose={closeLoginModal}
          onAuthSuccess={onDesktopLoginSuccess}
          setActiveModal={setActiveModal}
          buttonText="Sign In"
        />
      )}

      {/* ─────────────── 6) MOBILE slide-up Sign-In panel ────────────────────── */}
      {mobileSignInOpen && (
        <MobileMenuSignIn
          isOpen={mobileSignInOpen}
          onClose={closeMobileSignIn}
        />
      )}
    </header>
  );
}
