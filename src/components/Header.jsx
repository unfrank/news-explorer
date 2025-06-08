import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Navigation from "./Navigation";
// import LoginModal from "./LoginModal";
import MobileMenuSignIn from "./MobileMenuSignIn";

import CurrentUserContext from "../contexts/CurrentUserContext";

import "./Header.css";

import closeIcon from "../assets/icons/icon-btn-close.svg";

export default function Header({
  isLoggedIn,
  currentUser,
  handleLogout,
  setActiveModal,
  activeModal,
}) {
  const { handleLogin } = useContext(CurrentUserContext);

  const [logoAnimate, setLogoAnimate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopLoginOpen, setDesktopLoginOpen] = useState(false);
  const [mobileSignInOpen, setMobileSignInOpen] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/";
  const isSaved = location.pathname === "/saved-news";

  useEffect(() => {
    if (isLoggedIn) {
      setLogoAnimate(true);
      const t = setTimeout(() => setLogoAnimate(false), 1500);
      return () => clearTimeout(t);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 420) {
        setMenuOpen(false);
        setMobileSignInOpen(false);
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function openLoginModal() {
    setDesktopLoginOpen(true);
    setMenuOpen(false);
  }

  function closeLoginModal() {
    setDesktopLoginOpen(false);
  }

  function onDesktopLoginSuccess({ token, user }) {
    handleLogin({ token, user });
    // closeLoginModal();
  }

  function openMobileSignIn() {
    setMobileSignInOpen(true);
    setMenuOpen(false);
  }

  function closeMobileSignIn() {
    setMobileSignInOpen(false);
  }

  return (
    <header
      className={`header ${isHome ? "header--transparent" : "header--solid"}`}
    >
      <div className="section-inner">
        <div className="header__container">
          <div
            className={`header__logo ${
              logoAnimate ? "header__logo--animate" : ""
            }`}
          >
            NewsExplorer
          </div>

          <Navigation
            onSignInClick={() => {
              setMenuOpen(false);
              setActiveModal("login");
            }}
            onSignUpClick={() => {
              setMenuOpen(false);
              setActiveModal("register");
            }}
            onLogoutClick={handleLogout}
            isAnyModalOpen={activeModal !== ""}
            onModalClose={() => setActiveModal("")}
          />
        </div>
      </div>
    </header>
  );
}
