import React, { useContext, useEffect, useState } from "react";
import Navigation from "./Navigation";
import "./Header.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";

import closeIcon from "../assets/icons/icon-btn-close.svg";
import hamburgerLight from "../assets/icons/icon-hamburger-light.svg";

function Header({ onSignInClick, setActiveModal, handleLogout }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const [logoAnimate, setLogoAnimate] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // State to control the mobile‐menu dropdown (only shown on Home when not logged in)
  const [menuOpen, setMenuOpen] = useState(false);

  // Trigger the “slide‐in” animation on the logo when the user logs in
  useEffect(() => {
    if (isLoggedIn) {
      setLogoAnimate(true);
      const timeout = setTimeout(() => setLogoAnimate(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn]);

  // If viewport is resized to ≥646px, automatically close the mobile menu
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 646) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Called when any “Sign in” is clicked (desktop or mobile) to open the LoginModal
  function openLoginModal() {
    setActiveModal("login");
    setMenuOpen(false);
  }

  return (
    <header
      className={`header ${isHome ? "header--transparent" : "header--solid"}`}
    >
      <div className="section-inner">
        <div className="header__container">
          {/* ───────────────────────────────────────────────────────────── 
              Logo (left side). Animates when logging in.
          ───────────────────────────────────────────────────────────── */}
          <div
            className={`header__logo ${
              logoAnimate ? "header__logo--animate" : ""
            }`}
          >
            NewsExplorer
          </div>

          {/* ───────────────────────────────────────────────────────────── 
              HAMBURGER / CLOSE ICON (only on Home && not logged in)
              Tapping the “hamburger” toggles the mobile dropdown.
          ───────────────────────────────────────────────────────────── */}
          {isHome && !isLoggedIn && (
            <>
              {menuOpen ? (
                <img
                  src={closeIcon}
                  alt="Close Menu"
                  className="navigation__hamburger"
                  onClick={() => setMenuOpen(false)}
                />
              ) : (
                <img
                  src={hamburgerLight}
                  alt="Menu"
                  className="navigation__hamburger"
                  onClick={() => setMenuOpen(true)}
                />
              )}
            </>
          )}

          {/* ───────────────────────────────────────────────────────────── 
              TOP‐LEVEL NAVIGATION LINKS (desktop/tablet)
          ───────────────────────────────────────────────────────────── */}
          <Navigation
            onSignInClick={openLoginModal}
            onLogoutClick={handleLogout}
          />
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── 
          MOBILE MENU DROPDOWN (slides down when “hamburger” is clicked)
          Only shows on Home AND when not logged in AND when menuOpen===true
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
            onClick={openLoginModal}
          >
            Sign in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
