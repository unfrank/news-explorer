// File: src/components/Header.jsx

import React, { useContext, useEffect, useState } from "react";
import Navigation from "./Navigation";
import "./Header.css";

import CurrentUserContext from "../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";

import closeIcon from "../assets/icons/icon-btn-close.svg";
import hamburgerLight from "../assets/icons/icon-hamburger-light.svg";

// These two components must exist in the same folder:
import LoginModal from "./LoginModal";
import MobileMenuSignIn from "./MobileMenuSignIn";

export default function Header({ handleLogout }) {
  const { currentUser, isLoggedIn, handleLogin } =
    useContext(CurrentUserContext);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [logoAnimate, setLogoAnimate] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [desktopLoginOpen, setDesktopLoginOpen] = useState(false);

  const [mobileSignInOpen, setMobileSignInOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setLogoAnimate(true);
      const t = setTimeout(() => setLogoAnimate(false), 1500);
      return () => clearTimeout(t);
    }
  }, [isLoggedIn]);

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
  // 3) Handlers
  // ────────────────────────────────────────────────────────────────────────────

  // Opens the desktop LoginModal
  function openLoginModal() {
    console.log("openLoginModal() called");
    setDesktopLoginOpen(true);
    // Always close the mobile dropdown if it was open:
    setMenuOpen(false);
  }

  // Closes the desktop LoginModal
  function closeLoginModal() {
    console.log("closeLoginModal() called");
    setDesktopLoginOpen(false);
  }

  // Opens the mobile slide‐up sign‐in form
  function openMobileSignIn() {
    console.log("openMobileSignIn() called");
    setMobileSignInOpen(true);
    // Close the dropdown that contained this button
    setMenuOpen(false);
  }

  // Closes the mobile slide‐up sign‐in form
  function closeMobileSignIn() {
    console.log("closeMobileSignIn() called");
    setMobileSignInOpen(false);
  }

  // Called after a successful login (desktop)
  function onDesktopLoginSuccess({ token, user }) {
    console.log("onDesktopLoginSuccess() called with user:", user);
    handleLogin({ token, user });
    closeLoginModal();
  }

  return (
    <header
      className={`header ${isHome ? "header--transparent" : "header--solid"}`}
    >
      <div className="section-inner">
        <div className="header__container">
          {/* ─────────────────────────────────────────────────────────
              1) LOGO (left side). Animates when the user signs in.
          ───────────────────────────────────────────────────────── */}
          <div
            className={`header__logo ${
              logoAnimate ? "header__logo--animate" : ""
            }`}
          >
            NewsExplorer
          </div>

          {/* ─────────────────────────────────────────────────────────
              2) ICON SLOT (always flush right, same container):
                 - If mobileSignInOpen → show “Close Modal” (closes mobile form)
                 - Else if menuOpen       → show “Close Menu” (closes dropdown)
                 - Else if isHome && !isLoggedIn → show “Hamburger” (opens dropdown)
                 - Otherwise (logged in or not on Home) → show nothing
          ───────────────────────────────────────────────────────── */}
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

          {/* ─────────────────────────────────────────────────────────
              3) TOP‐LEVEL NAVIGATION (desktop/tablet):
                 Home / Saved Articles (if logged in) / Sign in or Logout
          ───────────────────────────────────────────────────────── */}
          <Navigation
            onSignInClick={openLoginModal}
            onLogoutClick={handleLogout}
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          4) MOBILE MENU DROPDOWN (dark panel under header)
             Only if: isHome && !isLoggedIn && menuOpen === true
      ───────────────────────────────────────────────────────── */}
      {menuOpen && isHome && !isLoggedIn && (
        <div className="navigation__dropdown">
          <div className="navigation__dropdown-header">
            <h2 className="header__logo">NewsExplorer</h2>
          </div>
          <hr className="navigation__dropdown-divider" />

          <div className="navigation__dropdown-item">Home</div>

          {/* ─ This “Sign in” button inside the dropdown now opens the mobile form ─ */}
          <button
            className="navigation__button navigation__button--dropdown"
            onClick={openMobileSignIn}
          >
            Sign in
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          5) DESKTOP LoginModal (overlay) – shown when desktopLoginOpen === true
      ───────────────────────────────────────────────────────── */}
      {desktopLoginOpen && (
        <>
          <LoginModal
            isOpen={desktopLoginOpen}
            onClose={closeLoginModal}
            onAuthSuccess={onDesktopLoginSuccess}
            buttonText="Sign In"
          />
        </>
      )}

      {/* ─────────────────────────────────────────────────────────
          6) MOBILE slide‐up Sign‐In (white panel) – shown when mobileSignInOpen === true
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
